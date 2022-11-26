const { User } = require("../models/models");

const levelControl = async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.level += 1);
      user.pet.level = update;
      user.save();
      res.json({ message: "Level Up" });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong. Please try again." })
    );
};

module.exports = { levelControl };
