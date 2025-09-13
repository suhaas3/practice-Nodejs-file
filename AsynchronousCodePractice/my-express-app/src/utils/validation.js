const validator = require('validator');

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password!");
  }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "photoUrl", "gender", "age", "about", "skills"]

  const isEditAllowed = Object.keys(req.body).every((k) =>
    allowedEditFields.includes(k)
  )

  return isEditAllowed;
}

const validateEditPassword = (req) => {
  const allowedEditFields = ["password"];

  const isEditPassword = Object.keys(req.body).every((k) =>
    allowedEditFields.includes(k)
  )

  return isEditPassword;
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditPassword
};