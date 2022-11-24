const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

//  MONGO CONNECTION
const db_connection = require("./config/dbconn.config");
db_connection();

// ROUTES
const validate = require("./routes/validate");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const refetchRoute = require("./routes/refetch");
const { User } = require("./models/models");

// PERSONAL MIDDLEWARES
app.use("/", validate);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", refetchRoute);

// DEV ROUTE

// LEVEL UP
app.patch("/api/v1/pet/level", async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.level += 1);
      user.pet.level = update;
      user.save();
      res.json({ message: "Level Up" });
    })
    .catch((err) => console.log(err));
});

// FEED
app.patch("/api/v1/pet/feed", async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.full_level += 10);
      user.pet.last_fed = new Date().toISOString();
      user.pet.full_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: "Kiwi was fed" });
    })
    .catch((err) => console.log(err));
});

// PLAY
app.patch("/api/v1/pet/play", async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.happy_level += 10);
      user.pet.last_played = new Date().toISOString();
      user.pet.happy_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: "Kiwi played" });
    })
    .catch((err) => console.log(err));
});

// STUDY
app.patch("/api/v1/pet/study", async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.smart_level += 10);
      user.pet.last_study = new Date().toISOString();
      user.pet.smart_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: "Kiwi studied" });
    })
    .catch((err) => console.log(err));
});

// UNIVERSAL ROUTE

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Export APP

module.exports = app;
