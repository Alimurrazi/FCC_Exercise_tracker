const express = require("express");
const router = express.Router({mergeParams: true});
const { v4: uuidv4 } = require("uuid");
const Exercise = require("../models/Exercise");
const User= require("../models/User");

router.post("/", async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findOne({_id: userId});

    if (user) {
      const date = req.body.date ? new Date(req.body.date) : new Date();
      const exercise = {
        userId: userId,
        _id: uuidv4(),
        description: req.body.description,
        duration: req.body.duration,
        date: date,
      };
      const exerciseResponse = await Exercise.create(exercise);

      if (exerciseResponse) {
        const response = {
          username: user.username,
          description: exercise.description,
          duration: Number(exercise.duration),
          date: exercise.date.toDateString(),
          _id: userId,
        };
        res.send(response);
      } else {
        res.status(500).send("exercise creation failed");
      }
    } else {
      res.status(500).send("no user found with this userId");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get("/", async (req, res) => {
  try {
    const userId = req.params._id;
    const exercises = await Exercise.find({userId: userId});
    res.send(exercises);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
