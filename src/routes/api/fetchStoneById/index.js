const router = require("express").Router();

router.use("/", require("./fetchStoneById.route"));

module.exports = router;