const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connection');
const User = require('../models/user');
const connectionRequestRouter = express.Router();


connectionRequestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message:"Invalid status type: "+status
      })
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("user not found!");
    }

    const existingConnetionRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    })
    if (existingConnetionRequest) {
      return res.status(400).send({
        message: "Connetion Request Already Exists..."
      })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await connectionRequest.save();

    res.json({
      message: "Connection Request Sent Successfully!",
      data,
    })

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

module.exports = connectionRequestRouter;