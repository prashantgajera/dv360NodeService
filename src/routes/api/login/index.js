const router = require("express").Router();

router.use("/", require("./login.route"));

module.exports = router;