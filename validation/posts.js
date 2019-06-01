const Validaor = require("validator");

const postValidator = data => {
  var text = data.text.trim();
  var errors = {};

  
  if (!Validaor.isLength(text, { min: 6, max: 30 })) {
      errors.text = "Your text must be between 6 and 30 characters";
    }
    
  if (Validaor.isEmpty(text)) {
      errors.text = "text is empty";
    }

    return {
    errors,
    isValid: Object.keys(errors).length == 0 ? false : true
  };
};

module.exports = postValidator;
