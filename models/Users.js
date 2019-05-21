const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
  createxAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function(next) {
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

userSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({
    email
  }).then(user => {
    if (!user) {
      // return res.status(404).json({
      //     error: "user not found"
      // })
      return Promise.reject({ err: "user not found" });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject({ err: "incorrect password" });
        }
      });
    });
  });
};

User = mongoose.model("users", userSchema);

module.exports = User;
