const { logger } = require("../../logging/logger");

module.exports.reqLoggerMiddleware = (request, response, next) => {
    logger.info(`request URL : ${request.method} ${request.protocol}://${request.headers.host}${request.url}`);
    logger.debug(`request body: ${JSON.stringify(request.body)}`);
    logger.debug(`request query: ${JSON.stringify(request.query)}`);
    next();
};
