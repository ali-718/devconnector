const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// @route /api/users/
// @desc testing routes
// @status Public route
router.get("/test", (req, res) => {
  res.json({
    message: "user route is working"
  });
});

// @route /api/users/register
// @desc Register route
// @status Public route
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.json({
        error: "Email already exist"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const userSchema = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      userSchema
        .save()
        .then(user => res.json(user))
        .catch(err => res.json(err, "error occoured"));
    }
  });
});

// @route /api/users/login
// @desc Login th User / returning JWT
// @status Public route
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //   User.findOne({
  //     email
  //   }).then(user => {
  //     if (!user) {
  //       return res.status(404).json({
  //         error: "user not found"
  //       });
  //     }

  //     bcrypt.compare(password, user.password).then(pass => {
  //       if (pass) {
  //         res.json({
  //           msg: "succesfully login"
  //         });
  //       } else {
  //         res.status(400).json({
  //           err: "password is incorrect"
  //         });
  //       }
  //     });
  //   });

  User.findByCredentials(email, password)
    .then(user => {
      if (!user) {
        res.status(400).json({ err: "user not found" });
      }
      res.json({ user, msg: "successfully login" });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
