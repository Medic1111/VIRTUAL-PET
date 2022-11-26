const { User } = require("../models/models");

const studyControl = async (req, res) => {
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
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong. Please try again." })
    );
};

module.exports = { studyControl };
