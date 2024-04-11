const { Op } = require("sequelize");
const fetchStoneDetailsService = require("../services/fetchStoneDetailsService");
const constants = require("../utils/constants");
const { PrepareResponse } = require("../utils/prepareAPIResponse");

class FetchStoneDetailsController {
    constructor() { }

    async fetchStoneDetails({
        clientId,
        limit = constants.FETCH_DEFAULT_LIMIT,
        offset = constants.OFFSET,
        startDate = null,
        endDate = null,
    }) {

        let sqlQuery =
            `SELECT __SELECTORS__ FROM trn_stone WHERE __CONDITIONS__ ` +
            `ORDER BY created LIMIT ${limit} OFFSET ${offset}`;

        let sqlFindQuery =
            `SELECT count(stone_id) as count FROM trn_stone where __CONDITIONS__`;
        
        const selectors = '`stone_id`,`stone_code`, `size`,`shape`,`color`,' +
            '`clarity`,`certificate_no`,`video_link`,`created`';

        const conditions = [];
        conditions.push('`client_id` =' + clientId);

        if (startDate && endDate) {
            conditions.push('DATE(`created`)>=' + `'${startDate}'`);
            conditions.push('DATE(`created`)<=' + `'${endDate}'`);
        }

        sqlQuery = sqlQuery
            .replace('__SELECTORS__', selectors)
            .replace('__CONDITIONS__', conditions.join(' AND '));

        sqlFindQuery = sqlFindQuery
            .replace('__CONDITIONS__', conditions.join(' AND '));
        
        const { stones, totalCount } =
            await fetchStoneDetailsService.fetchStoneDetails(sqlQuery, sqlFindQuery);

        const preparedResponse =
            PrepareResponse(
                "stones",
                stones,
                {
                    totalCount,
                    clientId
                }
            );

        return preparedResponse;
    }

}


module.exports = new FetchStoneDetailsController();