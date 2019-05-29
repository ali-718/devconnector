const Validator = require("validator");

const experienceValidator = data => {
  if (data.title) var title = data.title.trim();
  else {
    var title = "";
  }
  if (data.company) var company = data.company.trim();
  else {
    var company = "";
  }
  if (data.from) var from = data.from.trim();
  else {
    var from = "";
  }

  var errors = {};

  if (Validator.isEmpty(title)) {
    errors.title = "title is empty";
  }

  if (Validator.isEmpty(company)) {
    errors.company = "company is empty";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "from field is empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length == 0 ? false : true
  };
};

module.exports = experienceValidator;
