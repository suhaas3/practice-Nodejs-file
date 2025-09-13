const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateSignUpData } = require('../utils/validation');;
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);
    //creating a new instance of the user model
    const { firstName, lastName, emailId, password, age, gender, skills, photoUrl } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
      photoUrl
    });
    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Email!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {

      const token = await user.getJwt();

      res.cookie("token", token, { expires: new Date(Date.now() + 3600000 * 7) });
      res.send("login successfull!");
    } else {
      throw new Error("password incorrect");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

authRouter.post('/logout', async (req, res) => {
  res.cookie('token', '', { expires: new Date(0), path: '/' }); // Set expires to a past date (e.g., epoch)
  res.send('Cookie expired successfully');
})

module.exports = authRouter;
