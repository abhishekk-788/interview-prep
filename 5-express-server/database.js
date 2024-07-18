const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/myDatabase";

const connectToMongoDB = async () => {
  try {
      await mongoose.connect(mongoURI);
      console.log("Successfully connected to MongoDB");
      
      return mongoose.connection.db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// (async() => {
//     await connectToMongoDB(url);
// })();

module.exports = { connectToMongoDB };

