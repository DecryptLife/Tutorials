require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET);
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403); // token exists but unable to authenticate
      }

      req.user = user;

      next();
    });
  } else {
    return res.sendStatus(401); // token doesn't exist in header
  }
};

module.exports = {
  authenticateJWT,
};
