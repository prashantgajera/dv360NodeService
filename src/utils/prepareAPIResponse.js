const { ApiResponseCode } = require("./apiResponseCode");

module.exports.PrepareResponse = (responseKey = "response", responseBody, additionalParams = {}) => {

    let createResponse = {
        ...additionalParams,
        [responseKey]: responseBody ? responseBody : {},
        statusCode: ApiResponseCode.OK,
        success: true
    }

    if (!responseBody && responseKey == "response") {
        delete createResponse.response
    }

    if (createResponse.null) {
        createResponse = {
            ...createResponse,
            ...responseBody
        }
        delete createResponse.null;
    }

    return createResponse;


};