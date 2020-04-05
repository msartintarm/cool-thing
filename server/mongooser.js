const mongoose = require("mongoose");

const config = require("./env/config");

/**
 * A wrapper around Mongoose APIs which delegates to them 
 *  whilst encapsulating config info
 */

function handleMongoInitSuccess() {
    console.log("MongoDB successfully connected");
}

function handleMongoInitError(err) {
    console.log(err);
}

function connectToMongoDb (successFn, failureFn) {
// Connect to MongoDB
mongoose.set("bufferCommands", false);
mongoose
  .connect(
    config.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(successFn)
  .catch(failureFn);
}

module.exports = { connectToMongoDb };
