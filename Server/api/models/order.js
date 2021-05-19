const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    usedId: { type: String },
    address: { type: String },
  },
  items: {
    type: [
      {
        _id: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
  status: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
