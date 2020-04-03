const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

/**
 * A wrapper around Mongoose APIs which delegates to them 
 *  whilst encapsulating config info
 */

// DB Config
const mongoUri = "mongodb://gameAdmin:gameAdminPass@127.0.0.1:27017/game?authSource=admin";

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
    mongoUri,
      { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(successFn)
  .catch(failureFn);
}

module.exports = { connectToMongoDb };
