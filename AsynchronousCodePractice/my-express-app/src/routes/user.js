const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connection');
const User = require('../models/user');
const userRouter = express.Router();

  const allow_user_details = "firstName lastName age gender skills about photoUrl";

//Get all the pending connection request for the loggedIn user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {

  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", allow_user_details);
    // .populate("fromUserId", ["firstName", "lastName"])

    res.json({
      message: "Data fetched successfully...",
      data: connectionRequests
    })
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
  try {

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" }
      ]
    }).populate("fromUserId", allow_user_details)


    const data = connectionRequests.map(row => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId
      }
      return row.fromUserId
    }) 

    res.json({data})

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

userRouter.get('/user/feed', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    //Find all connection requests (sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {fromUserId: loggedInUser._id}, 
        {toUserId: loggedInUser._id}
      ]
    }).select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

      const hideUserFromFeed = new Set();
      connectionRequests.forEach((req) => {
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
      })

      const users = await User.find({
        $and: [
          {_id: {$nin: Array.from(hideUserFromFeed)}},
          {_id: {$ne: loggedInUser._id}}
        ]
      }).select(allow_user_details)
        .skip(skip)
        .limit(limit);


    res.send(users);

  } catch (err) {
    res.status(400).send("ERROR :"+err.message);
  }
})



module.exports = userRouter;