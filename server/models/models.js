const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require, unique: true },
  username: { type: String, require, unique: true },
  password: { type: String, require },
  pet: {
    pet_name: { type: String, default: "Kiwi" },
    level: { type: Number, default: 0 },
    full_level: { type: Number, default: 50 },
    happy_level: { type: Number, default: 50 },
    health_level: { type: Number, default: 50 },
    smart_level: { type: Number, default: 50 },
    last_cared: { type: String, default: new Date().toISOString() },
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
