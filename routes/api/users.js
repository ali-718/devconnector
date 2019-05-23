const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys');
const authenticate = require('../../middleware/authenticate');

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

  User.findByCredentials(email, password)
    .then(user => {
      if (!user) {
        res.status(400).json({
          err: "user not found"
        });
      }
      // res.json({ user, msg: "successfully login" });
      // res.json(user)
      const payload = {
        _id: user._id,
        email: user.email,
        avatar: user.avatar
      }

      jwt.sign(payload, secret.secret, {
        expiresIn: 3600
      }, (err, token) => {
        if (err) {
          res.status(400).json({
            err: "error occoured"
          })
        } else {
          res.header("x-auth", token).json({
            user,
            token
          })
        }
      })
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route /api/users/current
// @desc return current user
// @status private route
// router.get('/current', passport.authenticate("jwt", {
//   session: false
// }), (req, res) => {
//   res.json(req.user)
// })
router.post('/current', authenticate, (req, res) => {

  var user = req.user;

  res.json(user);
})

module.exports = router;