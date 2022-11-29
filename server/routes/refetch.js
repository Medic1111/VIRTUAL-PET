const router = require("express").Router();
const { refetchControl } = require("../controllers/refetch");

const refetchRoute = router.get("/api/v1/:user/validate", refetchControl);

module.exports = refetchRoute;
