const MysqlConnector = require("../dbaccessor/connector/mysqlConnector");
const { logger } = require("../logging/logger");
const constants = require("../utils/constants");

const modelName = constants.MODEL.TRN_STONE;
class FetchStoneByIdService {
    constructor() { }

    async fetchStoneById(clientId, stoneId) {
        let stone = {};

        const mysqlQueryResponse = await MysqlConnector.findOne(
            modelName,
            {
                where: { stoneId: stoneId, clientId }
            });

        if (mysqlQueryResponse
            && mysqlQueryResponse.dataValues) {
            stone = mysqlQueryResponse.dataValues;
        }

        return stone;
    }
}

module.exports = new FetchStoneByIdService();