const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/keys");
const loginHandler = require("../validation/login");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function (next) {
  user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function (email, password) {
  var body = {
    email,
    password
  };

  const {
    errors,
    isValid
  } = loginHandler(body);

  if (isValid) {
    return Promise.reject(errors);
  }

  var User = this;

  return User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return Promise.reject({
        errors
      });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          errors.password = "incorrect password";
          reject({
            errors
          });
        }
      });
    });
  });
};

userSchema.statics.findByToken = function (token) {
  var user = this;
  var decode;

  try {
    decode = jwt.verify(token, secret.secret);
  } catch (e) {
    return Promise.reject(e);
  }

  return user.findOne({
    email: decode.email
  });
};

User = mongoose.model("users", userSchema);

module.exports = User;