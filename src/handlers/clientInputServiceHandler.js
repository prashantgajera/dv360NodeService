const { AppConfig } = require("../application");
const ClientInputSvc = AppConfig.getServiceCommunicator("clientInputService");

const { logger } = require("../logging/logger");
const { ApiResponseCode } = require("../utils/apiResponseCode");
const InvalidParameterError = require("../exception/invalidParameterError");

class ClientInputServiceHandler {

    /**
     * 
     * @param {*} clientId 
     * @returns 
     */
    static async getMarketplaceClientIdByClientId(clientId) {
        const marketplaceMappings =
            await ClientInputSvc.getMarketplaceDataWithCache(clientId);

        if (marketplaceMappings && marketplaceMappings.marketplaceClientId) {
            return marketplaceMappings.marketplaceClientId;
        } else {
            logger.error(`Couldn't find marketplaceClientId for ${clientId}`);
            throw new InvalidParameterError(
                `MarketplaceClientId not found for client ${clientId}`,
                ApiResponseCode.CIS_FETCH_ENTITY_ERROR,
            );
        }

    }
}

module.exports = ClientInputServiceHandler;