const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const checkUser = require("../middleware/checkUser");
const Cart = require("../models/cart");
const Order = require("../models/order");

router.post("/", checkUser, async (req, res) => {
  const { userId } = req.user;
  Cart.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        res.status(400).json({ message: "Cart not found!" });
      } else {
        for (i = 0; i < cart.items.length; i++) {
          const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            user: cart.userId,
            product: cart.items[i].product,
            quantity: cart.items[i].quantity,
            status: 0,
          });
          order.save();
        }
        cart.remove();
        res.status(200).json({});
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.get("/", checkUser, async (req, res) => {
  const { userId } = req.user;
  Order.find({ user: userId })
    .populate("product", "name image")
    .then((orders) => {
      if (orders.length === 0) {
        res.status(400).json({ message: "No orders!" });
      } else {
        res.status(200).json(orders);
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.get("/pending", checkUser, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(400).json({
      message: "You are not an admin",
    });
  }
  Order.find({ status: { $in: [0, 1] } })
    .populate("product", "name image")
    .populate("user", "name email address")
    .then((orders) => {
      if (orders.length === 0) {
        res.status(400).json({ message: "No orders!" });
      } else {
        res.status(200).json(orders);
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.patch("/status/:id", checkUser, async (req, res) => {
  Order.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).json({});
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

module.exports = router;
