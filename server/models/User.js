const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpires: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ["guest", "user", "seller", "admin"],
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
