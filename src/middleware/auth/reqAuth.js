const { logger } = require("../../logging/logger");
const { ApiResponseCode } = require("../../utils/apiResponseCode");
const { HttpStatusCode } = require("../../utils/httpStatusCode");
const JWTAuth = require("./jwtAuth");

const reqAuthMiddleware = async (req, res, next) => {
    logger.info("Authenticating request...");
    let authenticated = false;
    let userId = 0;
    if (req.headers && req.headers['x-access-token']) {
        const token = req.headers['x-access-token'];
        if (token) {
            const decoded = await JWTAuth.verifyToken(token);
            if (decoded && decoded.userId) {
                logger.info(`Authenticated successfully with userId ${decoded.userId}`)
                authenticated = true;
                next()
            };
        }

    }
    if (!authenticated) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            statusCode: ApiResponseCode.UNAUTHORIZED,
            success: false
        });
    }

}

module.exports = reqAuthMiddleware;