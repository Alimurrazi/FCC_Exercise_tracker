const express = require("express");
const router = express.Router({ mergeParams: true });
const Exercise = require("../models/Exercise");
const User = require("../models/User");

const getFilter = (userId, firstDate, lastDate) => {
  let filter = { userId: userId };
  let dateFilter = {};
  if (firstDate) {
    dateFilter.$gte = firstDate;
  }
  if (lastDate) {
    dateFilter.$lte = lastDate;
  }
  if (Object.keys(dateFilter).length !== 0) {
    filter.date = dateFilter;
  }
  return filter;
};

router.get("/", async (req, res) => {
  try {
    const userId = req.params._id;
    const firstDate = req.query.from;
    const lastDate = req.query.to;
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const user = await User.findOne({ _id: userId });

    if (user) {
      const filter = getFilter(userId, firstDate, lastDate);
      const exercises = await Exercise.find(filter).limit(limit);
      const formatedExercises = exercises.map((exercise) => {
        const data = {};
        (data.description = exercise.description),
          (data.duration = exercise.duration),
          (data.date = exercise.date.toDateString());
        return data;
      });

      if (exercises) {
        const response = {
          username: user.username,
          count: exercises.length,
          _id: userId,
          log: formatedExercises,
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

module.exports = router;
