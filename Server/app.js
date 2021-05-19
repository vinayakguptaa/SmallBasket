const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./api/routes/user.routes");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token, On-behalf-of, x-sg-elas-acl"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());
app.use("/user", userRoutes);

app.use((req, res, next) => {
  console.log(req.url);
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

const PORT = process.env.PORT;

//Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
