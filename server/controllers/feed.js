const { User } = require('../models/models');

const feedControl = async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      let update = (user.pet.full_level += 10);
      user.pet.last_fed = new Date().toISOString();
      user.pet.full_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: 'Yummy, i like that!' });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Oops, something went wrong, try again.' })
    );
};

module.exports = { feedControl };
