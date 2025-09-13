const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require('../utils/validation');
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

module.exports = profileRouter;