const express = require("express");
const bodyParser = require("body-parser");
const mongooser = require("./mongooser");

const app = express();

function handleMongoInitSuccess() {
    console.log("MongoDB successfully connected");
}

function handleMongoInitError(err) {
    console.log(err);
}

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Mongo Init
mongooser.connectToMongoDb(
    handleMongoInitSuccess, handleMongoInitError);

const port = 4000;
app.listen(port, () =>
	   console.log(`Server up and running on port ${port} !`));

