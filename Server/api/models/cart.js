const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usedId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
