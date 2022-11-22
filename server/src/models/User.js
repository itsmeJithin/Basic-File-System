const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true
  },
  avatarUrl: {
    type: String
  }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);