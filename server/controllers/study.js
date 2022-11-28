const { User } = require('../models/models');

const studyControl = async (req, res) => {
  let { username } = req.body;
  await User.findOne({ username: username })
    .then((user) => {
      if (user.pet.smart_level >= 100)
        return res.json({ message: "Kiwi can't process anymore!!!" });
      let update = (user.pet.smart_level += 10);
      user.pet.last_study = new Date().toISOString();
      user.pet.smart_level = update;
      user.pet.last_cared = new Date().toISOString();
      user.save();
      res.json({ message: 'I learned something new!' });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Oops, something went wrong. Please try again.' })
    );
};

module.exports = { studyControl };
