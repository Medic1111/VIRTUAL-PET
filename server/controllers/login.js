const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const loginControl = (req, res) => {
  const { email, username, password } = req.body;
  if (username.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "All fields are required" });
  } else if (password.length <= 5) {
    return res
      .status(400)
      .json({ message: "Password must contain at least 6 characters" });
  }

  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Oops, something went wrong, try again." });
    }

    if (!doc) {
      return res.status(404).json({ message: "Username not registered" });
    }

    bcrypt.compare(password, doc.password, (err, match) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Oops, something went wrong with your request" });
      }
      if (!match) {
        return res.status(403).json({ message: "Incorrect password" });
      }

      let token = jwt.sign({ username }, `${process.env.TOKEN_SECRET}`, {
        expiresIn: "600s",
      });

      res.status(201).json({
        username: doc.username,
        token,
        pet: doc.pet,
      });
    });
  });
};

module.exports = { loginControl };
