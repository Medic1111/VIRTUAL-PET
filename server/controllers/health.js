const { User } = require("../models/models");

const healthControl = async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.health_level += 10);
      user.pet.health_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: "Kiwi was taken to the vet" });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong, try again." })
    );
};

module.exports = { healthControl };
