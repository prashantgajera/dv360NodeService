const { AppConfig } = require("../application");
const MarketingCampaignServiceV2 = AppConfig.getServiceCommunicator("marketingCampaignServiceV2");

const { logger } = require("../logging/logger");
const { ApiResponseCode } = require("../utils/apiResponseCode");
const InvalidParameterError = require("../exception/invalidParameterError");

class MarketingCampaignServiceHandler {

    static async fetchMarketingCampaignData(
        clientId,
        marketingCampaignId = null,
        selectors = null
    ) {
        try {

            const filters = [
                {
                    "column": "clientId",
                    "operator": "EQUAL_TO",
                    "value": clientId
                }
            ];

            if (marketingCampaignId) {
                filters.push({
                    "column": "id", "operator": "EQUAL_TO",
                    "value": marketingCampaignId
                });
            }

            const marketingCampaignResponse =
                await MarketingCampaignServiceV2
                    .fetchMarketingCampaign(
                        clientId,
                        selectors,
                        filters,
                        null,
                        null
                    );

            logger.debug(`marketing Campaign Data: ` + JSON.stringify(marketingCampaignResponse));
            return marketingCampaignResponse;

        } catch (err) {
            logger.error(`Couldn't find marketplaceCampaignData for ${marketingCampaignId}`);
            throw new InvalidParameterError(
                `marketplaceCampaignData not found for campaign ${climarketingCampaignIdentId}`,
                ApiResponseCode.CIS_FETCH_ENTITY_ERROR,
            );
        }
    }

}

module.exports = MarketingCampaignServiceHandler;