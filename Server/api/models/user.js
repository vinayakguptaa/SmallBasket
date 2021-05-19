const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  isAdmin: { type: Boolean, default: false },
  email: { type: String },
  password: { type: String },
  address: { type: String },
});

module.exports = mongoose.model("User", userSchema);
