const router = require("express").Router();
const { loginControl } = require("../controllers/login");

const loginRoute = router.post("/api/v1/login", loginControl);

module.exports = loginRoute;
