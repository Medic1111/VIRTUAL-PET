const router = require("express").Router();
const { validateControl } = require("../controllers/validate");

const validateRoute = router.get("/api/v1/validate", validateControl);

module.exports = validateRoute;
