const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const checkUser = require("../middleware/checkUser");
const Cart = require("../models/cart");

router.post("/add", checkUser, async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;
  Cart.find({ userId })
    .then((cart) => {
      if (cart.length === 0) {
        const cart = new Cart({
          _id: new mongoose.Types.ObjectId(),
          userId: userId,
          items: [{ product: productId, quantity: 1 }],
        });
        cart
          .save()
          .then((c) => {
            res.status(200).json({});
          })
          .catch((e) => {
            res.status(400).json({
              error: e.toString(),
            });
          });
      } else {
        Cart.findOne({ userId, "items.product": productId })
          .then((product) => {
            if (product) {
              Cart.updateOne(
                { userId, "items.product": productId },
                { $inc: { "items.$.quantity": 1 } }
              )
                .then((c) => {
                  res.status(200).json({});
                })
                .catch((e) => {
                  res.status(400).json({
                    error: e.toString(),
                  });
                });
            } else {
              Cart.updateOne(
                { userId },
                { $push: { items: [{ product: productId, quantity: 1 }] } }
              )
                .then((c) => {
                  res.status(200).json({});
                })
                .catch((e) => {
                  res.status(400).json({
                    error: e.toString(),
                  });
                });
            }
          })
          .catch((e) => {
            res.status(400).json({
              error: e.toString(),
            });
          });
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
  Cart.find({ userId })
    .populate("items.product", "name image price")
    .then((cart) => {
      if (cart.length === 0) {
        res.status(400).json({ message: "Cart is empty!" });
      } else {
        if (cart[0].items.length === 0) {
          res.status(400).json({ message: "Cart is empty!" });
        } else {
          res.status(200).json(cart[0]);
        }
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

module.exports = router;
