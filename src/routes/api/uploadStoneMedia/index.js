const router = require("express").Router();

router.use("/", require("./uploadStoneMedia.route"));

module.exports = router;