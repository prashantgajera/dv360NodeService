const cryptoJS = require("crypto-js");
const { AppConfig } = require("../../../application");
const fetchStoneByIdController = require("../../../controller/fetchStoneByIdController");
const ServiceError = require("../../../exception/serviceError");
const { logger } = require("../../../logging/logger");
const reqAuthMiddleware = require("../../../middleware/auth/reqAuth");
const { HttpStatusCode } = require("../../../utils/httpStatusCode");


const router = require("express").Router();

const fetchStoneById = async (request, response, next) => {
    logger.info("handling request for fetchStoneById");

    const { data: requestData } = request.query;

    try {
        const parsedRequestData = decryptData(requestData);

        const { isValid, errorResponse } = validateData(parsedRequestData);
        
        logger.info(JSON.stringify(parsedRequestData));

        if (!isValid) {
            response.status(HttpStatusCode.INVALID_REQUEST).json(errorResponse)
        } else {
            const apiResponse =
                await fetchStoneByIdController.fetchStoneById(parsedRequestData);

            response.status(HttpStatusCode.OK).json(apiResponse);
        }

    } catch (error) {
        logger.error(`unable to process fetchStoneById - ${error.message} ${error.stack}`);
        next(new ServiceError(error));
    }
};

const validateData = (requestData) => {
    const {
        stoneId = null,
        clientId = null
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
    if (!stoneId) {
        isValid = false;
        error = error + " stoneId is required,"
    }

    errorResponse["message"] = error
    return { isValid, errorResponse };
};

const decryptData = (data) => { 
    let response = {};
    try {
        const dataToDecode = decodeURIComponent(data);
        const secretKey = AppConfig.getAESSecret();

        const dataBytes = cryptoJS.AES.decrypt(dataToDecode, secretKey);
        response = JSON.parse(dataBytes.toString(cryptoJS.enc.Utf8));

        logger.info(`fetchStoneById data: ${dataToDecode} decryptedData : ${JSON.stringify(response)}`);

    } catch (err) {
        logger.error('Error while decrypting key ' + err.stack);
    }

    return response;
}

router.get(
    "/",
    // reqAuthMiddleware,
    fetchStoneById
);

module.exports = router;
