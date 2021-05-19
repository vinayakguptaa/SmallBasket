const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address) {
    return res.status(400).json({
      message: "Parameter(s) Missing! Requires Name, Email, Password, Address",
    });
  }

  await User.find({ email })
    .then(async (user) => {
      if (user.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
      await bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hash,
            address,
          });

          await user
            .save()
            .then((user) => {
              res.status(200).json({
                success: true,
              });
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
    })
    .catch((e) => {
      res.status(400).json({
        error: e.toString(),
      });
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Parameter(s) Missing! Requires Email, Password",
    });
  }

  await User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      await bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              {
                userId: user._id,
                isAdmin: user.isAdmin,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30d",
              }
            );
            return res.status(200).json({
              token,
            });
          }
          return res.status(401).json({
            message: "Invalid password",
          });
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
