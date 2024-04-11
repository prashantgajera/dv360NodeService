const { AppConfig } = require("../application");
const EventManagerService = AppConfig.getServiceCommunicator("eventManagerServiceV2");

const { logger } = require("../logging/logger");
const constants = require("../utils/constants");

class EventManagerServiceHandler {

    static async sendEvent(eventDetails, eventConfig) {
        const { eventType, eventName } = eventConfig;
        const currentTimestamp = Date.now();
        let clientId = null;

        if (eventDetails && eventDetails.clientId) {
            clientId = parseInt(eventDetails.clientId, 10);
        }

        const request = {
            source: "APP",
            application: constants.APPLICATION,
            events: [
                {
                    saveInDb: false,
                    eventType,
                    eventName,
                    clientId,
                    eventTimestamp: currentTimestamp,
                    expirationDate: Date.now() + constants.ONE_DAY_MILLISECONDS,
                    eventDetails: JSON.stringify(eventDetails),
                },
            ],
        };

        logger.info(`sending event: ${JSON.stringify(request)}`);

        return EventManagerService.postEvents(request);
    }

}

module.exports = EventManagerServiceHandler;