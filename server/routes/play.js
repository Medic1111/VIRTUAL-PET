const router = require("express").Router();
const { playControl } = require("../controllers/play");

const playRoute = router.patch("/api/v1/pet/play", playControl);

module.exports = playRoute;
