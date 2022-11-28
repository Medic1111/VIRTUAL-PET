const { User } = require('../models/models');

const playControl = async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      if (user.pet.happy_level >= 100)
      return res.json({ message: "Kiwi has played enough!!" });
      let update = (user.pet.happy_level += 10);
      user.pet.last_played = new Date().toISOString();
      user.pet.happy_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: 'Yea come and play with me!' });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Oops, something went wrong, try again.' })
    );
};

module.exports = { playControl };
