const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const path = require("path");
const cors = require("cors");
//DOT ENV
require("dotenv/config");

// Database connection
mongoose.connect(
  "mongodb+srv://tagalog233:manualdragon3@node-express-lb96i.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected to MongoDB database.");
  }
);

const app = express();
let currentDate = "";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//LOGS
app.use((req, res, next) => {
  console.log("Request Happen! ");

  next();
});

app.use(
  cors({
    origin: ["https://traqrsystem.herokuapp.com/", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "PATCH", "CREATE", "DELETE"],
    credentials: true
  })
);

//authentications
app.use("/api/auth", require(path.join(__dirname, "./authen")));

//officer
app.use("/api/officer", require(path.join(__dirname, "./officer")));

//officer
app.use("/api/owner", require(path.join(__dirname, "./owner")));

console.log("EXPRESS API RUNNING");

module.exports = app;
