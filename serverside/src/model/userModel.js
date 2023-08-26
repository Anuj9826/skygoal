const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);