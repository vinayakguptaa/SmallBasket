const mongoose = require("mongoose");
// const User = require("./user");

const reviewSchema = mongoose.Schema({
  stars: { type: Number, default: 0 },
  text: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  reviews: { type: [reviewSchema], default: [] },
});

module.exports = mongoose.model("Product", productSchema);
