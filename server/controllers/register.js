const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const registerControl = (req, res) => {
  const { email, username, password } = req.body;

  if (email.trim() === "" || username.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "All fields are required" });
  } else if (password.length <= 5) {
    return res
      .status(400)
      .json({ message: "Password must contain at least 6 characters" });
  }

  User.findOne(
    { $or: [{ username: username }, { email: email }] },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Oops, something went wrong" });
      }

      if (doc) {
        return res
          .status(409)
          .json({ message: "Username or Email already registered" });
      }

      const hash = bcrypt.hashSync(password, 10);
      const newUser = new User({
        email,
        username,
        password: hash,
      });

      newUser.save((err, doc) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Oops, something went wrong, please try again." });
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
    }
  );
};

module.exports = { registerControl };
