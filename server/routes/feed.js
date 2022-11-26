const router = require("express").Router();
const { feedControl } = require("../controllers/feed");

const feedRoute = router.patch("/api/v1/pet/feed", feedControl);

module.exports = feedRoute;
