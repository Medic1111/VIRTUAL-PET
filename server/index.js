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
const levelRoute = require("./routes/level");
const feedRoute = require("./routes/feed");
const playRoute = require("./routes/play");
const studyRoute = require("./routes/study");
const dropRoute = require("./routes/drop");
const healthRoute = require("./routes/health");

// PERSONAL MIDDLEWARES
app.use("/", validate);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", refetchRoute);
app.use("/", levelRoute);
app.use("/", feedRoute);
app.use("/", playRoute);
app.use("/", studyRoute);
app.use("/", dropRoute);
app.use("/", healthRoute);

// DEV ROUTE

// UNIVERSAL ROUTE

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Export APP

module.exports = app;
