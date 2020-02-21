const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Basic model framework for every workout.
const WorkoutSchema = new Schema({
  day: Date,
  exercises: [
    {
      formtype: String,
      name: String,
      totalDuration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
