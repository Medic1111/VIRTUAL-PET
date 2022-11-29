const { User } = require("../models/models");

const dropControl = async (req, res) => {
  let { username, stat } = req.body;
  let dropBy = (Math.floor(Math.random() * 2) + 1) % 2 ? 10 : 20;
  await User.findOne({ username: username })
    .then((user) => {
      user.pet.happy_level -= dropBy * Number(stat);
      user.pet.smart_level -= dropBy * Number(stat);
      user.pet.full_level -= dropBy * Number(stat);
      user.pet.health_level -= 10 * Number(stat);
      user.save();
      return res.status(200).json(user.pet);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong, try again." })
    );
};

module.exports = { dropControl };
