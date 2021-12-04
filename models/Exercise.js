const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  _id: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: Date,
  },
},{
    versionKey: false
});

module.exports = mongoose.model("Exercise", ExerciseSchema);