const express = require('express');//import the expree module

const app = express();//create an express application instance

const PORT = 3333;//define the port for the project

//define a basic route for the URL
app.get("/hello",(req,res) => {
  res.send("hello,node js!");
})

app.get("/",(req,res) => {
  res.send("this is the initial data...");
})

app.get("/test",(req,res) => {
  res.send("test the data is entry point to node js")
})

//start the server and listen for incoming requests
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access it at http://localhost:${PORT}`)
})