const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();

//
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

// TEST ROUTE

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "Hey guys, Gabbie here from back end" });
});

//
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
