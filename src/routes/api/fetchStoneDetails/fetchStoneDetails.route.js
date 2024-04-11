const fetchStoneDetailsController = require("../../../controller/fetchStoneDetailsController");
const ServiceError = require("../../../exception/serviceError");
const { logger } = require("../../../logging/logger");
const reqAuthMiddleware = require("../../../middleware/auth/reqAuth");
const constants = require("../../../utils/constants");
const { HttpStatusCode } = require("../../../utils/httpStatusCode");

const router = require("express").Router();

const fetchStoneDetails = async (request, response, next) => {
    logger.info("handling request for fetchStoneDetails");

    const { jsonQuery: requestData } = request.query;
    const parsedRequestData = JSON.parse(requestData);

    const { isValid, errorResponse } = validateData(parsedRequestData);

    try {
        logger.info(JSON.stringify(parsedRequestData));
        if (!isValid) {
            response.status(HttpStatusCode.INVALID_REQUEST).json(errorResponse)
        } else {
            const apiResponse =
                await fetchStoneDetailsController.fetchStoneDetails(parsedRequestData);

            response.status(HttpStatusCode.OK).json(apiResponse);
        }

    } catch (error) {
        logger.error(`unable to process fetchStoneDetails - ${error.message} ${error.stack}`);
        next(new ServiceError(error));
    }
};

const validateData = (requestData) => {
    const {
        clientId = null,
        limit = constants.FETCH_DEFAULT_LIMIT,
        offset = constants.OFFSET,
        startDate = null,
        endDate = null,
    } = requestData;

    let errorResponse = {
        statusCode: HttpStatusCode.INVALID_REQUEST
    }
    let error = "invalid params : ";
    let isValid = true;

    if (!clientId) {
        isValid = false;
        error = error + " clientId is required,"
    }

    if (offset < 0) {
        isValid = false;
        error = error + " offset is not valid,"
    }

    if (startDate) {
        if (!endDate) {
            isValid = false;
            error = error + " endDate is required when startDate sent,"
        }
    }

    if (endDate) {
        if (!startDate) {
            isValid = false;
            error = error + " startDate is required when endDate is sent,"
        }
    }

    const maxLimit = constants.MAX_LIMIT;
    if (limit > maxLimit) {
        isValid = false;
        error = error + " maximum " + maxLimit + " limit is allowed."
    }

    errorResponse["message"] = error
    return { isValid, errorResponse };
};

router.get(
    "/",
    reqAuthMiddleware,
    fetchStoneDetails
);

module.exports = router;
