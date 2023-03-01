const jwt = require("jsonwebtoken");
const config = require("../config/authenticationconfig.js");
const db = require("../models");
const User = db.user;


verifyToken = (req, res, next) => {
  console.log("Verifying token", req.headers)
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken,

};
module.exports = authJwt;
