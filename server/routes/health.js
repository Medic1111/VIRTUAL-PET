const router = require("express").Router();
const { healthControl } = require("../controllers/health");

const healthRoute = router.patch("/api/v1/pet/vet", healthControl);

module.exports = healthRoute;
