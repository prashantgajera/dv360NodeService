const router = require("express").Router();

router.use("/", require("./fetchStoneDetails.route"));

module.exports = router;