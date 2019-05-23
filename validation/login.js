const Validaor = require("validator");

const loginValidator = data => {
  var email = data.email.trim();
  var password = data.password.trim();
  var errors = {};

  if (!Validaor.isEmail(email)) {
    errors.email = "Invalid Email format";
  }

  if (Validaor.isEmpty(email)) {
    errors.email = "Email is empty";
  }

  if (!Validaor.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Your password must be between 6 and 30 characters";
  }

  if (Validaor.isEmpty(password)) {
    errors.password = "Password is empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length == 0 ? false : true
  };
};

module.exports = loginValidator;
