const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Basic model framework for every workout.
// const WorkoutSchema = new Schema({
//   day: Date,
//   exercises: [
//     {
//       formtype: String,
//       name: String,
//       totalDuration: Number,
//       weight: Number,
//       reps: Number,
//       sets: Number,
//       distance: Number
//     }
//   ]
// });

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
