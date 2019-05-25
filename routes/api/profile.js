const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/authenticate");
const mongoose = require("mongoose");
const profileValidator = require("../../validation/profile");

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
// @desc  create or update user profile
// @status Private route
router.post("/", authenticate, (req, res) => {
  const { errors, isValid } = profileValidator(req.body);

  if (isValid) {
    return res.status(400).json(errors);
  }

  var user = req.user;
  var profileFields = {};

  profileFields.user = user._id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  //Skills spliting
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }
  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.github) profileFields.social.github = req.body.github;

  Profile.findOne({ user: user._id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        //Updating
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true, useFindAndModify: false }
        )
          .populate("user", ["name", "avatar"])
          .then(profile => res.json(profile))
          .catch(e => res.status(400).json(e));
      } else {
        //Saving

        //if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .populate("user", ["name", "avatar"])
          .then(handle => {
            if (handle) {
              errors.handle = "That handle already exists";
              return res.status(400).json(errors);
            }

            var profileSchema = new Profile(profileFields);

            profileSchema
              .save()
              .then(profile => {
                res.json(profile);
              })
              .catch(e => res.status(400).json(e));
          });
      }
    });
});

module.exports = router;
