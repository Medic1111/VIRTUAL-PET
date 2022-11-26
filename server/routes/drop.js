const router = require("express").Router();
const { dropControl } = require("../controllers/drop");

const dropRoute = router.patch("/api/v1/pet/drop", dropControl);

module.exports = dropRoute;
