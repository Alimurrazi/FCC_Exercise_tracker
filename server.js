const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/users/:_id/exercises', require('./routes/exerciseRoute'));
app.use('/api/users/:_id/logs', require('./routes/logRoute'));


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
