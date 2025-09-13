const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData, validateEditPassword } = require('../utils/validation');
const bcrypt = require('bcrypt');
const profileRouter = express.Router();


profileRouter.get('/profile', userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
})

//update the user by id
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {

    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully!`,
      data: loggedInUser
    })
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message} `);
  }
})

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
  try {
    if (!validateEditPassword(req)) {
      throw new Error("Inavlid credentials!");
    }
    const loggedInUser = req.user;
    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    loggedInUser.password = passwordHash;

    // Save changes
    await loggedInUser.save();


    res.send("password updated...")
  } catch (err) {
    res.status(400).send(`ERROR: ` + err.message);
  }
})

module.exports = profileRouter;