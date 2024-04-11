const router = require("express").Router();


const handlerPingRequest = (request, response) => response.json({ ping: "pong" });

router.get("/", handlerPingRequest);

module.exports = router;
