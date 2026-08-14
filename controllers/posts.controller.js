const Posts = require("../models/posts.modal");

class Postscotroller {
  async Create(req, res) {
    try {
      const {
        title,
        description,
        price,
        bedrooms,
        bathrooms,
        area,
        address,
        city,
        state,
        country,
        areaunit,
        list,
        status,
        proptype,
        currency,
      } = req.body;

      if (
        !title ||
        !description ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !area ||
        !address ||
        !city ||
        !state ||
        !country ||
        !areaunit ||
        !list ||
        !status ||
        !proptype ||
        !currency
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      const userId = req.user?._id || req.user?.id;
      if (!userId) {
        return res.status(400).json({ message: "UserId is required" });
      }
      const images = req.files?.map((file) => file.path) || [];

      if (images.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one image is required" });
      }

      if (images.length > 10) {
        return res
          .status(400)
          .json({ message: "You can upload a maximum of 10 images" });
      }

      const newPost = new Posts({
        title,
        description,
        price,
        bedrooms,
        bathrooms,
        area,
        address,
        city,
        state,
        country,
        images,
        userId,
        areaunit,
        list,
        status,
        proptype,
        currency,
      });

      await newPost.save();

      await newPost.populate([
        { path: "userId", select: "-password" },
        { path: "areaunit" },
        { path: "list" },
        { path: "status" },
        { path: "proptype" },
        { path: "currency" },
      ]);

      return res.status(201).json({
        message: "Post Created Successfully",
        content: newPost,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

 async GetAll(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;

    const skip = (page - 1) * limit;

    const getposts = await Posts.find()
      .populate("currency")
      .populate("proptype")
      .populate("status")
      .populate("areaunit")
      .populate("userId")
      .populate("list")
      .skip(skip)
      .limit(limit);

    const totalPosts = await Posts.countDocuments();

    return res.status(200).json({
      posts: getposts,
      hasMore: skip + getposts.length < totalPosts,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
  async GetById(req, res) {
    try {
      const { id } = req.params;
      const found = await Posts.findById(id).populate([
        {
          path: "userId",
          select: "-password",
        },
        { path: "areaunit" },
        { path: "list" },
        { path: "status" },
        { path: "proptype" },
        { path: "currency" },
      ]);
      if (!found) {
        return res.status(400).json({ message: "failed to get post" });
      }
      return res.status(200).json(found);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }

  async Update(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user?._id || req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (!id) {
        return res.status(400).json({
          message: "Post ID is required",
        });
      }

      const {
        title,
        description,
        price,
        bedrooms,
        bathrooms,
        area,
        address,
        city,
        state,
        country,
        areaunit,
        list,
        status,
        proptype,
        currency,
      } = req.body;

      if (
        !title ||
        !description ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !area ||
        !address ||
        !city ||
        !state ||
        !country ||
        !areaunit ||
        !list ||
        !status ||
        !proptype ||
        !currency
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const updateData = {
        title,
        description,
        price,
        bedrooms,
        bathrooms,
        area,
        address,
        city,
        state,
        country,
        areaunit,
        list,
        status,
        proptype,
        currency,
      };

      const updatedPost = await Posts.findOneAndUpdate(
        {
          _id: id,
          userId: userId,
        },
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedPost) {
        return res.status(404).json({
          message: "Post not found or unauthorized to update",
        });
      }

      await updatedPost.populate([
        {
          path: "userId",
          select: "-password",
        },
        { path: "areaunit" },
        { path: "list" },
        { path: "status" },
        { path: "proptype" },
        { path: "currency" },
      ]);

      return res.status(200).json({
        message: "Post updated successfully",
        content: updatedPost,
      });
    } catch (err) {
      console.log("Update Error:", err);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async Delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req?.user?._id || req?.user?.id;
      if (!id) {
        return res.status(400).json({ message: "postId is required" });
      }
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const deleted = await Posts.findOneAndDelete({
        _id: id,
        userId: userId,
      });
      if (!deleted) {
        return res.status(400).json({ message: "failed to delete post" });
      }
      return res.status(200).json(deleted);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new Postscotroller();
