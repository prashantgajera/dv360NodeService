const router = require("express").Router();

router.use("/ping", require("./ping"));
router.use("/fetchStoneDetails", require("./fetchStoneDetails"))
router.use("/login", require("./login"))
router.use("/uploadStoneMedia", require("./uploadStoneMedia"))
router.use("/fetchStoneById", require("./fetchStoneById"))

module.exports = router;
