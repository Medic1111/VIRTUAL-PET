const { User } = require('../models/models');

const healthControl = async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      if (user.pet.health_level >= 100)
        return res.json({ message: "Kiwi has had all his shots!!!" });
      let update = (user.pet.health_level += 10);
      user.pet.health_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: 'Yay.. i feel better now!' });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Oops, something went wrong, try again.' })
    );
};

module.exports = { healthControl };
