const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/authenticate");
const mongoose = require("mongoose");

//Loading Models
const Profile = require("../../models/Profile");
const User = require("../../models/Users");

// @route /api/profile/test
// @desc testing routes
// @status Public route
router.get("/test", (req, res) => {
  res.json({
    message: "profile route is working"
  });
});

// @route /api/profile
// @desc  get current user profile
// @status Private route
router.get("/", authenticate, (req, res) => {
  var user = req.user;
  var errors = {};

  Profile.findOne({
    user: user.id
  })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "user profile not found";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(e => res.status(400).json(e));
});

module.exports = router;
