const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  _id: {
    type: String,
  },
},{
    versionKey: false
});

module.exports = mongoose.model("User", UserSchema);
