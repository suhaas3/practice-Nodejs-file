const express = require('express');//import the expree module

const {adminAuth} = require('../UtilsModule/auth');

const app = express();//create an express application instance

const PORT = 3333;//define the port for the project

app.get('/admin',adminAuth);

app.get('/admin/getAllData',(req, res, next) => {
  //Logic for checking if the request is autherized
    res.send('GET All the data')
})


app.get('/admin/deleteUser',(req, res) => {
  //Logic for checking if the request is autherized
    res.send('Deleted a user');
})

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
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access it at http://localhost:${PORT}`)
})