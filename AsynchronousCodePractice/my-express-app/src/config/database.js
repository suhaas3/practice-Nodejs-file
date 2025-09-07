const mongoose = require('mongoose');

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Nodejs3:qwertyuiop-123@namastenodejs.v5z2unj.mongodb.net/devTinder"
  )
}


module.exports = {
  connectDb
}
