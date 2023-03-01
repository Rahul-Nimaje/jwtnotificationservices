  const config = require("../config/authenticationconfig");
  const db = require("../models");
  const nodemailer = require("../config/nodemailer");
  const User = db.user;


  var jwt = require("jsonwebtoken");
  var bcrypt = require("bcryptjs");

  exports.signup = (req, res) => {
    console.log("req.............", req.body)
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message:
          "User was registered successfully! Please check your email",
      });

      nodemailer.sendConfirmationEmail(
        user.username,
        user.email,
      );

    });
  };
  exports.verifyUser = (req, res, next) => {
    console.log("req.params", req.query.email)
    let data = (req.query.email).toString();

    User.findOne({
      email: data,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        user.isVerified = true;
        user.save((err, data) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (data) {
            console.log("data", data)
            res.send(data);
            return;
          }
        });
      })
      .catch((e) => console.log("error", e));
  };
  exports.signin = (req, res) => {
    console.log("userlogin", req.body)
    User.findOne({
      email: req.body.email,
      isVerified: true
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400
        });

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      });
  };
