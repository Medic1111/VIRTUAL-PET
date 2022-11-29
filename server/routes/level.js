const router = require("express").Router();
const { levelControl } = require("../controllers/level");

const levelRoute = router.patch("/api/v1/pet/level", levelControl);

module.exports = levelRoute;
