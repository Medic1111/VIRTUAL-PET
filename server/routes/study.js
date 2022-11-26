const express = require("express");
const router = express.Router();
const { studyControl } = require("../controllers/study");

const studyRoute = router.patch("/api/v1/pet/study", studyControl);

module.exports = studyRoute;
