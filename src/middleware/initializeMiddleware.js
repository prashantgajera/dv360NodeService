const express = require("express");

const ApiResponseCode = require("../utils/apiResponseCode");
const { logger } = require("../logging/logger");
const { reqLoggerMiddleware } = require("./logger/reqLoggerMiddleware");
const cors = require('cors')

/* Custom Middlewares */


class InitializeMiddleware {
    constructor(app) {
        this.expressApp = app;
    }

    init() {
        InitializeMiddleware.addRequestHandlers(this.expressApp);

        //Add Custom middlewares
        this.expressApp.use(reqLoggerMiddleware);

        InitializeMiddleware.addRoutes(this.expressApp);
        // InitializeMiddleware.addErrorHandlers(this.expressApp);


    }

    static addRequestHandlers(app) {
        // remove unwanted headers
        app.set("etag", false);
        app.disable("x-powered-by");

        // enable cors
        app.use(cors())

        // Normal express config defaults
        app.use(express.json({ limit: '100mb' }));
        app.use(express.urlencoded({ extended: true }));

    }

    static addRoutes(app) {
        // add endpoints
        app.use(require("../routes"));

        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            logger.error(`invalid request received from ${req.originalUrl}`);
            next({
                message: "given endpoint has not setup yet.",
                code: ApiResponseCode.NOT_FOUND,
            });
        });
    }

    static addErrorHandlers(app) {
        // error handlers
    }
}

module.exports = InitializeMiddleware;