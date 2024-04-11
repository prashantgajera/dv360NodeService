const MysqlConnector = require("../dbaccessor/connector/mysqlConnector");
const { logger } = require("../logging/logger");
const constants = require("../utils/constants");


const modelName = constants.MODEL.MST_C_USER;

class LoginService {
    constructor() { }

    async login(userName, password) {
        let response = {};
        try {
            const mysqlResponse = await MysqlConnector.findOne(
                modelName,
                {
                    where:
                        { cUserName: userName, cPassword: password }
                });
            if (mysqlResponse
                && mysqlResponse.dataValues
                && mysqlResponse.dataValues.isActive
            ) {
                response = mysqlResponse.dataValues;
                delete response.cPassword;
            }
            logger.debug(`login response ${JSON.stringify(response)}`);
        } catch (err) {
            logger.error(
                `Error in login service for user ${userName} error :${err}`
            );
        }
        return response;
    }
}

module.exports = new LoginService();