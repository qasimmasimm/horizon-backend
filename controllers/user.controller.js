const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class Usercontroller {
  async Registration(req, res) {
    try {
      let { firstname, lastname, username, email, password, phone } = req.body;

      firstname = firstname?.trim();
      lastname = lastname?.trim();
      email = email?.trim().toLowerCase();
      phone = phone?.trim();

      if (
        !firstname ||
        !lastname ||
        !email ||
        !username ||
        !password ||
        !phone
      ) {
        return res.status(400).json({ message: "all fields are required" });
      }

      if (firstname.length < 2 || firstname.length > 50) {
        return res.status(400).json({ message: "Invalid first name" });
      }

      if (lastname.length < 2 || lastname.length > 50) {
        return res.status(400).json({ message: "Invalid last name" });
      }
      if (password.length < 8) {
        return res.status(400).json({ message: "At Least 8 characters" });
      }
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "invalid email format " });
      }

      const existinguser = await User.findOne({ email });

      if (existinguser) {
        return res.status(400).json({ message: "user already exists" });
      }

      const hashedpassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedpassword,
        role: "user",
        phone,
        username,
        image: req?.file?.path || "http://localhost:8080/upload/defaultavatar.jfif",
      });

      await newUser.save();

      let userdata = {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        username: newUser.username,
        phone: newUser.phone,
        role: newUser.role,
        image: newUser.image,
      };

      return res.status(201).json({ user: userdata });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async Login(req, res) {
    try {
      let { email, password } = req.body;

      email = email?.trim().toLowerCase();

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must contain at least 6 characters",
        });
      }

      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const userdata = {
        _id: user._id,
        firstname: user.firstname,
        lastname:user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        username:user.username,
        phone:user.phone
      };

      const payload = {
        _id: user._id,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
      };

      const secretekey = process.env.JWT_KEY;

      const token = jwt.sign(payload, secretekey, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "Login successful",
        user: userdata,
        token,
      });
    } catch (err) {
      console.error("Login error:", err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async GetById(req, res) {
    try {
      const id = req.user._id;
      const found = await User.findById(id);
      
      if (!found) {
        return res.status(400).json({ message: "User not found" });
      }
      let foundeduser = {
        id: found?.id,
        firstname: found?.firstname,
        lastname: found?.lastname,
        email: found?.email,
        username: found.username,
        phone: found.phone,
        image: found?.image,
        role: found.role,
      };

      return res.status(200).json(foundeduser);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }

  async GetAll(req, res) {
    try {
      const users = await User.find().select("-password");

      return res.status(200).json(users);
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async Update(req, res) {
  try {
    const id = req.user._id;
    const { firstname, lastname, username, phone } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        username,
        phone,
        ...(req.file && { image: req.file.path }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userdata = {
      _id: req?.user?._id,
      firstname: updated.firstname,
      lastname: updated.lastname,
      username: updated.username,
      image: updated.image,
      phone: updated.phone,
      email: updated.email,
      role: updated.role,
    };

    return res.status(200).json(userdata);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
  async UpdateRole(req, res) {
    try {
      const { id } = req.params;
      const { role}  = req.body;

      const allowedRoles = ["user", "agent", "admin"];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      const updated = await User.findByIdAndUpdate(
        id,
        { role },
        {
          new: true,
          runValidators: true,
        },
      ).select("-password");

      if (!updated) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Role updated successfully",
        user: updated,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new Usercontroller();
