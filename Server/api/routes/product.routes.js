const { Router } = require("express");
const router = Router();
const Product = require("../models/product");
const mongoose = require("mongoose");
const checkUser = require("../middleware/checkUser");
const { upload } = require("../middleware/s3UploadClient");
const Cart = require("../models/cart");

router.post("/add", checkUser, upload.single("image"), async (req, res) => {
  const { name, price } = req.body;
  if (!req.user.isAdmin) {
    return res.status(400).json({
      message: "You are not an admin",
    });
  }

  const image = req.file.location;
  if (!name || !price || !image) {
    return res.status(400).json({
      message: "Parameter(s) Missing! Requires Name, Price, Image",
    });
  }

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    image,
  });

  await product
    .save()
    .then((pro) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.get("/all", async (req, res) => {
  await Product.find({}, { reviews: 0, __v: 0 })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.get("/:id", async (req, res) => {
  await Product.find({ _id: req.params.id })
    .populate("reviews.author", "name email")
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.post("/addRev", checkUser, async (req, res) => {
  const { stars, text, id } = req.body;
  const { userId } = req.user;
  Product.findOne({ _id: id })
    .then((pro) => {
      if (!pro) {
        return res.status(400).json({ message: "Product not found" });
      }
      Product.findOne({ _id: id, "reviews.author": userId })
        .then((product) => {
          if (product) {
            Product.updateOne(
              { _id: id, "reviews.author": userId },
              {
                $set: {
                  "reviews.$.stars": stars,
                  "reviews.$.text": text,
                },
              }
            )
              .then((result) => {
                res.status(200).json({});
              })
              .catch((e) => {
                res.status(400).json({
                  error: e.toString(),
                });
              });
          } else {
            Product.updateOne(
              { _id: id },
              {
                $push: {
                  reviews: [
                    {
                      stars: stars,
                      text: text,
                      author: userId,
                    },
                  ],
                },
              }
            )
              .then((result) => {
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
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.post("/delRev", checkUser, (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;
  Product.findOne({ _id: productId, "reviews.author": userId })
    .then((product) => {
      if (product) {
        Product.updateOne(
          { _id: productId },
          {
            $pull: {
              reviews: { author: userId },
            },
          }
        )
          .then((result) => {
            res.status(200).json({});
          })
          .catch((e) => {
            res.status(400).json({
              error: e.toString(),
            });
          });
      } else {
        res.status(400).json({
          error: "Not Found!",
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.post("/addToCart", checkUser, async (req, res) => {
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

module.exports = router;
