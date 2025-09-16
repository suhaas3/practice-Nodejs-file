const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },
  lastName: {
    type: String,
    min: 3,
    max: 30
  },
  emailId: {
    type: String,
    lowercase: true, // Always convert `test` to lowercase
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!!!");
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })) {
        throw new Error("Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.");
      }
    },
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender not matched!");
      }
    }
  },
  about: {
    type: String,
    default: "this is default description of the user",
  },
  photoUrl: {
    type: String,
    default: "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid url");
      }
    }
  },
  skills: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length >= 3 && val.length <= 10;
      },
      message: "Skills must be between 3 and 10 items.",
    }
  }
})

userSchema.index({firstName: 1});
userSchema.index({lastName: 1});

userSchema.methods.getJwt = async function () {
  const user = this;

  const token = await jwt.sign({ _id: this._id }, 'Dev@Tinder$790', { expiresIn: '7d' });

  return token;

}

userSchema.methods.validatePassword = async function (password) {

  const user = this;

  const isPasswordValid = await bcrypt.compare(password, this.password);

  return isPasswordValid;
}

// const userModel = mongoose.model("User",userSchema);

module.exports = mongoose.model("User", userSchema);