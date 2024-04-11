const uploadStoneMediaController = require("../../../controller/uploadStoneMediaController");
const ServiceError = require("../../../exception/serviceError");
const { logger } = require("../../../logging/logger");
const reqAuthMiddleware = require("../../../middleware/auth/reqAuth");
const { upload } = require("../../../thirdparty/multer");
const { HttpStatusCode } = require("../../../utils/httpStatusCode");

const router = require("express").Router();

const uploadStoneMedia = async (request, response, next) => {
    logger.info("handling request for uploadStoneMedia");

    try {

        const { body: requestData, files } = request;

        const { isValid, errorResponse } = validateData(requestData);

        logger.info(JSON.stringify(requestData));
        if (!isValid) {
            response.status(HttpStatusCode.INVALID_REQUEST).json(errorResponse)
        } else {
            const apiResponse =
                await uploadStoneMediaController.uploadStoneMedia(requestData, files);

            response.status(HttpStatusCode.OK).json(apiResponse);
        }

    } catch (error) {
        logger.error(`unable to process uploadStoneMedia - ${error.message} ${error.stack}`);
        next(new ServiceError(error));
    }
};

const validateData = (requestData) => {
    const {
        clientId = null,
        stoneId = null,
    } = requestData;

    let errorResponse = {
        statusCode: HttpStatusCode.INVALID_REQUEST
    }
    let error = "invalid params : ";
    let isValid = true;

    if (!clientId) {
        isValid = false;
        error = error + " clientid is required,"
    }

    if (!stoneId) {
        isValid = false;
        error = error + " stoneId is required,"
    }

    errorResponse["message"] = error
    return { isValid, errorResponse };
};

router.post(
    "/",
  reqAuthMiddleware,
    upload.fields(
        [
            { name: 'video', maxCount: 1 },
            { name: 'photo', maxCount: 5 }
        ]),
    uploadStoneMedia
);

module.exports = router;

