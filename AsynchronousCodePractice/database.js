const mongoose = require("mongoose");

// MongoDB Compass connection string (local default)
// const URI = "mongodb+srv://Nodejs3:qwertyuiop-123@namastenodejs.v5z2unj.mongodb.net/UserLoginDetails/";

const URI = "mongodb+srv://Nodejs3:qwertyuiop-123@namastenodejs.v5z2unj.mongodb.net/UserLoginDetails";


// Replace "mydb" with your database name

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// 🔹 Define Schema
const userSchema = new mongoose.Schema({
  name: String,
  reg_no: String,
  branch: String
});

// 🔹 Create Model
const User = mongoose.model("User", userSchema);

async function crudOperations() {

  try {
    const user = new User({
      name: "Sai_suhaas___03",
      reg_no: "23091a32f2",
      branch: "cse-ds"
    });

    // await user.save(); // Save to MongoDB

    // console.log("✅ User inserted successfully:", user);

    //finding the item
    const find_item = await User.findOne({ reg_no: "23091a32f3" }).select("name reg_no branch -_id").lean();
    console.log("user is:",find_item);

    //update the item
     const update_item = await User.updateOne(
      { reg_no: "23091a32f4" },       // condition to match
      { $set: { name: "Sujith Updated", branch: "AI-DS" } } // new values
    );
    console.log("updated item:",update_item);

    //delete the item in database
      const result = await User.deleteOne({ reg_no: "23091a32f2" }); // match condition
    console.log("🗑️ Delete Result:", result);

    //  const users = await User.find(); // fetch all users
     const users = await User.find().select("name reg_no branch -_id").lean();
    console.log("📌 Users in DB:");
    console.log(users); // show data in console


    mongoose.connection.close(); // Close after insert

  } catch (err) {
    console.error("❌ Error inserting data:", err)
  }
}

crudOperations();

