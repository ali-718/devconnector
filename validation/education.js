const Validator = require("validator");

const educationValidator = data => {
  if (data.degree) var degree = data.degree.trim();
  else {
    var degree = "";
  }
  if (data.institute) var institute = data.institute.trim();
  else {
    var institute = "";
  }
  if (data.fieldofstudy ) var fieldofstudy  = data.fieldofstudy .trim();
  else {
    var fieldofstudy  = "";
  }
  if (data.from) var from = data.from.trim();
  else {
    var from = "";
  }

  var errors = {};

  if (Validator.isEmpty(degree)) {
    errors.degree = "degree is empty";
  }

  if (Validator.isEmpty(fieldofstudy )) {
    errors.fieldofstudy  = "fieldofstudy  is empty";
  }

  if (Validator.isEmpty(institute)) {
    errors.institute = "institute is empty";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "from field is empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length == 0 ? false : true
  };
};

module.exports = educationValidator;
