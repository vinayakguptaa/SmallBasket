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
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          user: cart.userId,
          items: cart.items,
          status: "Order Successful",
        });
        order.save().then(() => {
          cart.remove();
          res.status(200).json({});
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
          let total = 0;
          for (let i = 0; i < cart[0].items.length; i++) {
            total += cart[0].items[i].product.price * cart[0].items[i].quantity;
          }
          res.status(200).json({ items: cart[0].items, userId, total });
        }
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.delete("/:productId", checkUser, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.user;
  Cart.find({ userId })
    .then((cart) => {
      if (cart.length === 0) {
        return res.status(400).json({ message: "Not Found!" });
      } else {
        if (cart[0].items.length === 1) {
          Cart.updateOne(
            { userId },
            { $pull: { items: { product: productId } } }
          ).then((r) => {
            cart[0].remove();
            return res.status(200).json({});
          });
        } else {
          Cart.updateOne(
            { userId },
            { $pull: { items: { product: productId } } }
          ).then((r) => {
            return res.status(200).json({});
          });
        }
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.patch("/:productId", checkUser, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const { userId } = req.user;
  Cart.find({ userId })
    .then((cart) => {
      if (cart.length === 0) {
        return res.status(400).json({ message: "Not Found!" });
      } else {
        Cart.updateOne(
          { userId, "items.product": productId },
          { $set: { "items.$.quantity": quantity } }
        ).then((r) => {
          console.log(r);
          return res.status(200).json({});
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

module.exports = router;
