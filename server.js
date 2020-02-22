const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

var url = "mongodb://root:kaiju0790@ds359847.mlab.com:59847/heroku_t1k0847c";
require("dotenv");

const PORT = process.env.PORT || 3000;

// const db = require("./models/index");
const app = express();
// const seeder = require("./seeders/seed");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//connection code for heroku deployment.
var MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost/workout";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  family: 4
};
MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("Unable to connect to the mongoDB server. Error:", err);
  } else {
    console.log("Connection established to", url);
  }
});

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
