const Validator = require("validator");

const profileValidator = data => {
  if (data.handle) var handle = data.handle.trim();
  else {
    var handle = "";
  }
  if (data.company) var company = data.company.trim();
  else {
    var company = "";
  }
  if (data.status) var status = data.status.trim();
  else {
    var status = "";
  }
  if (data.bio) var bio = data.bio.trim();
  else {
    var bio = "";
  }
  if (data.skills) var skills = data.skills;
  else {
    var skills = "";
  }
  if (data.website) var website = data.website.trim();
  else {
    var website = "";
  }
  if (data.youtube) var youtube = data.youtube;
  else {
    var youtube = "";
  }
  if (data.facebook) var facebook = data.facebook;
  else {
    var facebook = "";
  }
  if (data.instagram) var instagram = data.instagram;
  else {
    var instagram = "";
  }
  if (data.linkedin) var linkedin = data.linkedin;
  else {
    var linkedin = "";
  }
  if (data.github) var github = data.github;
  else {
    var github = "";
  }

  var errors = {};

  if (!Validator.isLength(handle, { min: 5, max: 40 })) {
    errors.handle = "handle must be between 5 and 40 characters";
  }

  if (Validator.isEmpty(handle)) {
    errors.handle = "Handle is empty";
  }

  if (Validator.isEmpty(skills)) {
    errors.skills = "skills field is empty";
  }

  if (Validator.isEmpty(status)) {
    errors.status = "Status field is empty";
  }

  if (!Validator.isLength(bio, { min: 10, max: 200 })) {
    errors.bio = "Bio must be between 10 and 200 characters";
  }

  if (Validator.isEmpty(bio)) {
    errors.bio = "Bio field is empty";
  }

  if (!Validator.isEmpty(website)) {
    if (!Validator.isURL(website)) {
      errors.url = "webiste format is incorrect";
    }
  }

  if (!Validator.isEmpty(youtube)) {
    if (!Validator.isURL(youtube)) {
      errors.youtube = "youtube format is incorrect";
    }
  }

  if (!Validator.isEmpty(facebook)) {
    if (!Validator.isURL(facebook)) {
      errors.facebook = "facebook format is incorrect";
    }
  }

  if (!Validator.isEmpty(github)) {
    if (!Validator.isURL(github)) {
      errors.github = "github format is incorrect";
    }
  }

  if (!Validator.isEmpty(linkedin)) {
    if (!Validator.isURL(linkedin)) {
      errors.linkedin = "linkedin format is incorrect";
    }
  }

  if (!Validator.isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = "Instagram format is incorrect";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length == 0 ? false : true
  };
};

module.exports = profileValidator;
