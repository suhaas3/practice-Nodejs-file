const express = require('express');//import the expree module
const { adminAuth, userAuth } = require('../UtilsModule/auth');
const { connectDb } = require('./config/database');

const app = express();//create an express application instance

const PORT = 3333;//define the port for the project

app.get("/users", (req, res) => {
  res.send("User data fetched");
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
