const { userAuth } = require('./middlewares/auth');
const express = require('express');//import the expree module
const { connectDb } = require('./config/database');
const User = require('./models/user');
const app = express();//create an express application instance
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const connectionRequestRouter = require('./routes/connectionRequestRouter');
const userRouter = require('./routes/user');

const PORT = 3333;//define the port for the project

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', connectionRequestRouter);
app.use('/', userRouter)

//GET user by emailId
app.get('/getUser', async (req, res) => {
  const emailId = req.body;
  try {
    const findUser = await User.find(emailId).exec();
    res.send("user find successfully!");
    console.log(findUser);
  } catch (err) {
    res.status(400).send("Something went wrong:", err.message);
  }
})

//Fetch all users in database
app.get('/fetchUsers', async (req, res) => {
  try {
    const getUsers = await User.find({}).exec();
    res.send("users all are fetched!");
    console.log(getUsers)
  } catch (err) {
    res.status(400).send("Something went wrong:", err.message);
  }
})

//delete the user by id
app.delete('/deleteUser', async (req, res) => {
  const deletedId = req.body.deletedId;
  try {
    // const deleteUser = await User.findByIdAndDelete(deletedId);
    const deleteUser = await User.findByIdAndDelete({ _id: deletedId });
    res.send("user deleted successfully!");
    console.log(deleteUser)
  } catch (err) {
    res.status(400).send("Something went wrong:", err.message);
  }
})


app.post("/sendConnectionRequest", userAuth, async (req,res,next) => {
  const {user} = req;
  res.send(user.firstName + "  send connection request...");
})
//GET all users in database
app.get("/feedUser", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers)
  } catch (err) {
    res.status(400).send("Not users in database:" + err.message);
  }
})

//delete the user that is FindByIdAndDelete
app.delete('/user', async (req, res) => {
  const userId = req.body;
  try {
    const deleteUser = await User.findOneAndDelete(userId);
    res.send("user Deleted:" + deleteUser);
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
})


app.patch('/updateUser', async (req, res) => {
  const data = req.body;
  const { userId } = req.body;
  // const { emailId } = req.body;
  // console.log(data, 'user id');

  try {
    const ALLOWED_UPDATES = ["userId", "about", "age", "gender", "skills", "lastName"]

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    )

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    //update user by ID
    // const updateUser = await User.findByIdAndUpdate(userId, data, {
    //   returnDocument: 'after'
    // })
    // res.send(updateUser)

    //update user by email
    const updateUserByEmail = await User.findByIdAndUpdate(userId, data, {
      returnDocument: 'after',
      runValidators: true
    });
    res.send(updateUserByEmail)

  } catch (err) {
    res.status(400).send("something went wrong :" + err.message)
  }
})


/*
//normal route (this works fine)
app.get('/', (req, res) => {
    res.status(500).send("something wrong");
})

//route with Error (simulating an error)
app.post('/error', (err, req, res, next) => {
  const err1 = new Error("Something went wrong in /error route!");
  next(err1);
})

//Error handling middleware (must have 4 params)
app.use('/error/handle',(err, req, res, next) => {
  console.error(err.stack); //log error details
  res.status(500).json({
    success:false,
    message: err.message || "Internal server Error"
  })
})
  */

/*
app.get('/admin', adminAuth);

app.get('/admin/getAllData', (req, res, next) => {
  //Logic for checking if the request is autherized
  try {
    // throw new Error('unexpected error!');
    res.send('GET All the data')
  } catch (e) {
    res.status(500).send("Some Error contact support team");
  }
})


app.get('/admin/deleteUser', (req, res) => {
  //Logic for checking if the request is autherized
  res.send('Deleted a user');
})

app.get('/user/login', userAuth, (req, res) => {
  res.send("user logged in succesfully");
})

app.get('/user/data', userAuth, (req, res) => {
  res.send("All Data sent");
})
  */
/*
//GET users => middleware chain => request handler

app.get('/',(req, res, next) => {
  // res.send('This is default Route!');
  next();
})

app.get('/users',
  (req,res, next) => {
  console.log('1st route log!');
  // res.send("1st route handler!");
  next();
},

(req,res, next) => {
  console.log('2nd route log!');
  // res.send("2nd route handler!");
    next();
},

(req, res, next) => {
  console.log("3rd route log!");
  res.send("3rd route handler!");
  // next();
}
)
*/

// //define a basic route for the URL
// app.get("/hello",(req,res) => {
//   res.send("hello,node js!");
// })

// app.get("/",(req,res) => {
//   res.send("this is the initial data...");
// })

// app.get("/test",(req,res) => {
//   res.send("test the data is entry point to node js")
// })

//start the server and listen for incoming requests

connectDb()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Access it at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.log("Connection Error:", err.message);
  })
