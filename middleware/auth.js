const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Access denied. no token" });
  }
  try {
    const secretekey = process.env.JWT_KEY || "2008";

    const verified = jwt.verify(token, secretekey);
    req.user = verified;
    console.log(req.user)
    console.log(verified);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token", err });
  }
}

module.exports = auth;
