const mongoose = require('mongoose');
require('dotenv').config();

const db = "mongodb+srv://"+process.env.MONGODB_USER+":"+process.env.MONGODB_PASSWORD+"@cluster0-v8orz.mongodb.net/test?retryWrites=true";
console.log(db);
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true});

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDB;