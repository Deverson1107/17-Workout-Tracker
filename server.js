const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

//connection code for heroku deployment.
var MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost/workout";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  family: 4
};
mongoose.connect(MONGODB_URI, options);

// const db = require("./models/index");
const app = express();
// const seeder = require("./seeders/seed");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
