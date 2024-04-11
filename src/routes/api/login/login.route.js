const loginController = require("../../../controller/loginController");
const ServiceError = require("../../../exception/serviceError");
const { logger } = require("../../../logging/logger");
const jwtAuth = require("../../../middleware/auth/jwtAuth");
const reqAuthMiddleware = require("../../../middleware/auth/reqAuth");
const { HttpStatusCode } = require("../../../utils/httpStatusCode");

const router = require("express").Router();

const login = async (request, response, next) => {
    logger.info("handling request for login");

    const requestData = request.body;
    const { isValid, errorResponse } = validateData(requestData);
    try {
        logger.info(JSON.stringify(requestData));
        if (!isValid) {
            response.status(HttpStatusCode.INVALID_REQUEST).json(errorResponse)
        } else {
            const apiResponse =
                await loginController.login(requestData);
            if (apiResponse.success) {
                const token =
                    await generateUserToken(apiResponse.userId, apiResponse.userName);
                apiResponse['accessToken'] = token;
                response.status(HttpStatusCode.OK).json(apiResponse);
            } else {
                response.status(HttpStatusCode.NOT_FOUND).json(apiResponse);
            }
        }


    } catch (error) {
        logger.error(`unable to process login - ${error.message} ${error.stack}`);
        next(new ServiceError(error));
    }
};

const validateData = (requestData) => {
    const {
        userName = null,
        password = null,
    } = requestData;

    let errorResponse = {
        statusCode: HttpStatusCode.INVALID_REQUEST
    }
    let error = "invalid params : ";
    let isValid = true;

    if (!userName) {
        isValid = false;
        error = error + " userName is required,"
    }

    if (!password) {
        isValid = false;
        error = error + " password is required,"
    }

    errorResponse["message"] = error
    return { isValid, errorResponse };
};

const generateUserToken = async (userId, userName) => {
    const token = await jwtAuth.signToken({ userId, userName });
    return token ? token : null;
}

router.post(
    "/",
    login
);

module.exports = router;

