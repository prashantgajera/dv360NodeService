const MysqlConnector = require("../dbaccessor/connector/mysqlConnector");
const { logger } = require("../logging/logger");
const constants = require("../utils/constants");

const modelName = constants.MODEL.TRN_STONE;
class FetchStoneDetailsService {
    constructor() { }

    async fetchStoneDetails(sqlQuery, sqlFindQuery) {
        const stones = [];
        let totalCount = 0;

        try {
            const mysqlQueryPromise = MysqlConnector.query(
                sqlQuery,
                {
                    model: MysqlConnector.getModel(modelName),
                    mapToModel: true
                });


            const mysqlCountPromise = MysqlConnector.query(
                sqlFindQuery,
                {
                    model: MysqlConnector.getModel(modelName),
                    mapToModel: true
                });

            const result =
                await Promise.all([mysqlQueryPromise, mysqlCountPromise]);
            const mysqlQueryResponse = result[0];
            const mysqlCountResponse = result[1];

            if (mysqlQueryResponse
                && Array.isArray(mysqlQueryResponse)
                && mysqlQueryResponse.length > 0
            ) {
                mysqlQueryResponse.forEach((stone) => {
                    logger.info(`fetched result ${JSON.stringify(stone.dataValues)}`)
                    stones.push(stone.dataValues);
                })

            }

            if (mysqlCountResponse
                && Array.isArray(mysqlCountResponse)
                && mysqlCountResponse.length > 0
                && mysqlCountResponse[0].dataValues
                && mysqlCountResponse[0].dataValues.count)
            {
                totalCount = mysqlCountResponse[0].dataValues.count;
            }

        } catch (err) {
            logger.error(`Error while fetching stone details ${err}`)
        }
        return { stones, totalCount };
    }
}

module.exports = new FetchStoneDetailsService();