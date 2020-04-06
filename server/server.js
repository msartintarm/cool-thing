const bodyParser = require("body-parser");
const express = require("express");

const config = require("./env/config");

const mongooser = require("./mongooser");

const app = express();

function handleMongoInitSuccess() {
    console.log("MongoDB successfully connected");
}

function handleMongoInitError(err) {
    //    console.error(err);
    console.error("Mongo init failed :(");
}

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.listen(config.PORT, () =>
    console.log(`Server up and running on port ${config.PORT}!`));

// Mongo Init
mongooser.connectToMongoDb(
    handleMongoInitSuccess, handleMongoInitError);
