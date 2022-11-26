const { User } = require("../models/models");

const dropControl = async (req, res) => {
  let { username, stat } = req.body;

  await User.findOne({ username: username })
    .then((user) => {
      user.pet.happy_level -= 10 * Number(stat);
      user.pet.smart_level -= 10 * Number(stat);
      user.pet.full_level -= 10 * Number(stat);
      user.pet.health_level -= 10 * Number(stat);
      user.save();
      return res.json({
        message: `Stat Dropped by 10 * ${stat}`,
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong, try again." })
    );
};

module.exports = { dropControl };
