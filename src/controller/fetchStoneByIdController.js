const fetchStoneByIdService = require("../services/fetchStoneByIdService");
const { PrepareResponse } = require("../utils/prepareAPIResponse");

class FetchStoneByIdController {
    constructor() { }

    async fetchStoneById({
        clientId,
        stoneId
    }) {

        const stone =
            await fetchStoneByIdService.fetchStoneById(clientId, stoneId);

        const preparedResponse =
            PrepareResponse(
                "response",
                null,
                stone
            );

        return preparedResponse;
    }

}


module.exports = new FetchStoneByIdController();