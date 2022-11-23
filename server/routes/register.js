const express = require("express");
const router = express.Router();
const { registerControl } = require("../controllers/register");

const registerRoute = router.post("/api/v1/register", registerControl);

module.exports = registerRoute;
