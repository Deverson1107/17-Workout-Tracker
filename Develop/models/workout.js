const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
      },
    type: {
        type: String,
        trim: true,
        required: "Enter the type of workout"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter a name for workout"
    },
    duration: {
        type: Number,
        required: "Enter the duration"
    },
    weight: {
        type: Number,
        required: "Enter the weight"
    },
    reps: {
        type: Number,
        required: "Enter the reps"
    },
    sets: {
        type: Number,
        required: "Enter the sets"
    },
});

const Transaction = mongoose.model("Workout", workoutSchema);

module.exports = Transaction;