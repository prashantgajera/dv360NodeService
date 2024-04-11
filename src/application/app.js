/* eslint-disable global-require */
const express = require("express");
const { logger } = require("../logging/logger");


const initializeMiddleware = require("../middleware/initializeMiddleware");

class App {
    constructor() {
        const app = express();

        // Initializing all the middlewares
        new initializeMiddleware(app).init();
        this.app = app;
    }

    start() {
        // start server
        const { NODE_SVC_PORT } = process.env;
        const port = Number(NODE_SVC_PORT);
        this.app.listen(port);
        logger.info(`application started on port : ${port}`);
    }
}

module.exports = App;