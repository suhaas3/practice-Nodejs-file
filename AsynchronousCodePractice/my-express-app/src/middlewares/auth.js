const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!");
    }

    const decodedMessage = await jwt.verify(token, 'Dev@Tinder$790');

    // const { _id } = decodedMessage;

    const user = await User.findById(decodedMessage._id);

    if (!user) {
      throw new Error("User Not Found!");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
}

module.exports = {
  userAuth
}