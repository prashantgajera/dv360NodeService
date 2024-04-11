const uploadStoneMediaService = require("../services/uploadStoneMediaService");
const { HttpStatusCode } = require("../utils/httpStatusCode");
const { PrepareResponse } = require("../utils/prepareAPIResponse");

class UploadStoneMediaController {
    constructor() { }

    async uploadStoneMedia(
        requestBody,
        files
    ) {
        let preparedResponse = null;

        const { clientId, stoneId } = requestBody;
        const uploadResponse  =
            await uploadStoneMediaService.uploadStoneMedia(clientId, stoneId, files);

        uploadResponse['clientId'] = clientId;
        uploadResponse['stoneId'] = stoneId;

        preparedResponse =
            PrepareResponse(
                "response",
                null,
                uploadResponse
            );

        if (!uploadResponse || uploadResponse.message) {
            preparedResponse.success = false;
            preparedResponse.statusCode = HttpStatusCode.NOT_FOUND;
        }
        return preparedResponse;
    }
}

module.exports = new UploadStoneMediaController();
