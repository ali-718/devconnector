const Validaor = require("validator");

const registerValidator = data => {
  var name = data.name.trim();
  var email = data.email.trim();
  var password = data.password.trim();
  var password2 = data.confirmPassword.trim();
  var errors = {};

  if (!Validaor.isLength(name, { min: 3, max: 30 })) {
    errors.name = "Your name must be between 3 and 30 characters";
  }

  if (Validaor.isEmpty(name)) {
    errors.name = "Name is empty";
  }

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

  if (!Validaor.equals(password, password2)) {
    errors.password2 = "Password not matched";
  }

  if (!Validaor.isLength(password2, { min: 6, max: 30 })) {
    errors.password2 =
      "Your Confirm password must be between 6 and 30 characters";
  }

  if (Validaor.isEmpty(password2)) {
    errors.password2 = "Confirm Password is empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length == 0 ? false : true
  };
};

module.exports = registerValidator;
