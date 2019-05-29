const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/authenticate");
const mongoose = require("mongoose");
const profileValidator = require("../../validation/profile");
const experienceValidator = require('../../validation/experience');
const educationValidator = require('../../validation/education');

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

// @route /api/profile/user/all
// @desc  Get user profile by handle
// @status Public route
router.get('/user/all',(req,res) => {
  var errors = {};

  Profile.find().populate("user",["name","avatar","email"]).then(user => {
    if(!user){
      errors.noprofile = `There are no users`
      return res.status(404).json(errors)  
    }

    res.json(user);
  }).catch((e) => {
      return res.status(404).json(e)  
  })
})



// @route /api/profile/handle/:handle
// @desc  Get user profile by handle
// @status Public route
router.get('/handle/:handle',(req,res) => {
  var handle = req.params.handle;
  var errors = {};

  Profile.findOne({handle}).populate("user",["name","avatar"]).then(handle => {
    if(!handle){
      errors.noprofile = "user does not exist having this handle"
      return res.status(400).json(errors)
    }

    res.json(handle);
  })
})

// @route /api/profile/user/:user_id
// @desc  Get user profile by handle
// @status Public route
router.get('/user/:user_id',(req,res) => {
  var userId = req.params.user_id;
  var errors = {};

  Profile.findOne({user:userId}).populate("user",["name","avatar"]).then(user => {
    if(!user){
      errors.noprofile = `user does not exist having id ${userId}`
      return res.status(404).json(errors)  
    }

    res.json(user);
  }).catch(() => {
    errors.noprofile = `user does not exist having id ${userId}`
      return res.status(404).json(errors)  
  })
})

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

// @route /api/experience
// @desc  Add experience
// @status Private route
router.post('/experience',authenticate,(req,res) => {

  const {errors,isValid} = experienceValidator(req.body);

  if(isValid){
    return res.status(400).json(errors)
  }

  Profile.findOne({user:req.user._id}).then(profile => {

    var title = req.body.title ? req.body.title.trim() : ""
    var company = req.body.company ? req.body.company.trim() : "";
    var location = req.body.location ? req.body.location.trim() : "";
    var from = req.body.from ? req.body.from.trim() : ""
    var to = req.body.to ? req.body.to.trim() : "";
    var current = req.body.current ? req.body.current.trim() : "";
    var description = req.body.description ? req.body.description.trim() : "";

    const Experience = {
      title:title,
      company:company,
      location:location,
      from:from,
      to:to,
      current:current,
      description:description
    }

      profile.experience.unshift(Experience);
      profile.save().then(profile => {res.json(profile)}).catch(e => res.json(e)) 
    
  })
})

// @route /api/experience/:id
// @desc  edit experience
// @status Private route
router.post('/experience/:id',authenticate,(req,res) => {

  var objectID = req.params.id;

  const {errors,isValid} = experienceValidator(req.body);

  if(isValid){
    return res.status(400).json(errors)
  }

  Profile.findOne({user:req.user._id}).then(profile => {

    var title = req.body.title ? req.body.title.trim() : ""
    var company = req.body.company ? req.body.company.trim() : "";
    var location = req.body.location ? req.body.location.trim() : "";
    var from = req.body.from ? req.body.from.trim() : ""
    var to = req.body.to ? req.body.to.trim() : "";
    var current = req.body.current ? req.body.current.trim() : "";
    var description = req.body.description ? req.body.description.trim() : "";

      profile.experience.map(item => {
        if(item.id == objectID){
          item.title = title;
          item.company = company;
          item.location = location;
          item.from = from;
          item.to = to;
          item.current = current;
          item.description = description;
         profile.save().then(profile => res.json(profile))
        }
      })

  })
})

// @route /api/experience/:id
// @desc  delete experience
// @status Private route
router.delete('/experience/:id',authenticate,(req,res) => {

  var objectID = req.params.id;

  Profile.findOne({user:req.user._id}).then(profile => {
    
    //get experience id
    var removeIndex = profile.experience.map(item => item.id).indexOf(objectID);
    if(removeIndex == -1) removeIndex = null;
    if(removeIndex != null){
    profile.experience.splice(removeIndex,1);
    }

    profile.save().then(profile => res.json(profile))
  })
})


// @route /api/education
// @desc  Add education
// @status Private route
router.post('/education',authenticate,(req,res) => {

  const {errors,isValid} = educationValidator(req.body);

  if(isValid){
    return res.status(400).json(errors)
  }

  Profile.findOne({user:req.user._id}).then(profile => {

    const Education = {
      degree:req.body.degree,
      institute:req.body.institute,
      fieldofstudy:req.body.fieldofstudy,
      from:req.body.from,
      to:req.body.to,
      current:req.body.current,
      description:req.body.description
    }

    if(profile.education.length == 0){
      profile.education.unshift(Education);

      profile.save().then(profile => {res.json(profile)}).catch(e => res.json(e))
      
    }
    else{
      Profile.findOneAndUpdate(
        {user:req.user._id},
        {$set:{
          education:Education
        }
      },
        {new:true,useFindAndModify:false}).then(profile => {
        res.json(profile)
      }).catch(e => res.status(400).json(e))

    }
  })
})

module.exports = router;
