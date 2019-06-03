const Validaor = require("validator");

const registerValidator = data => {
  if(data.name) var name = data.name.trim(); else {var name=""}
  if(data.email) var email = data.email.trim(); else {var email=""}
  if(data.password) var password = data.password.trim(); else {var password=""}
  if(data.password2) var password2 = data.password2; else {var password2=""}
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
