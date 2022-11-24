const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const refetchControl = (req, res) => {
  let username = req.params.user;
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "No token found" });
  } else {
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, async (err, verified) => {
      if (err)
        return res.status(401).json({ message: "Invalid/Expired Token" });
      let fetchedUser = await User.findOne({ username: username });

      return res.status(200).json(fetchedUser);
    });
  }
};

module.exports = { refetchControl };
