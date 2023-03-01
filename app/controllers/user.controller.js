const db = require("../models");
const User = db.user;
exports.userData = (req, res) => {
  User.find().then((user) => {
    console.log("datausers........", user)
    res.status(200).send(user);
  })


};

