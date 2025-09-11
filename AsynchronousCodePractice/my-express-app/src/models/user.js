const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },
  lastName: {
    type: String,
    min:3,
    max:30
  },
  emailId: {
    type: String,
    lowercase: true, // Always convert `test` to lowercase
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
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

// const userModel = mongoose.model("User",userSchema);

module.exports = mongoose.model("User", userSchema);