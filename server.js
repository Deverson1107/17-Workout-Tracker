const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Workout = require("./models/workout");
const app = express();
const path = require("path");

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
  family: 4
};
mongoose.connect(MONGODB_URI, options);

//basic GET routes
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/stats.html"));
});

//list for all workout items
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//workout items by their id
app.get("/:id", (req, res) => {
  let query = req.params.id;
  Workout.find({
    request: query
  })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//workout items by their range
app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//POST route for creating new workout items
app.post("/api/workouts", (req, res) => {
  const day = new Date().setDate(new Date().getDate() - 10);
  const name = req.body.name;
  const totalDuration = req.body.duration;
  const weight = req.body.weight;
  const reps = req.body.reps;
  const sets = req.body.sets;
  const distance = req.body.distance;

  const newWorkout = new Workout({
    day,
    name,
    totalDuration,
    weight,
    reps,
    sets,
    distance
  });

  console.log("new workout", newWorkout);
  newWorkout
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//PUT route for updating existing workouts
app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log("Hello", params);

  Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }).then(
    workouts => {
      console.log("NEW TEST", workouts);
      res.json(workouts);
    }
  );
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
