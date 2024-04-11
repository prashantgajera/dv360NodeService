const { logger } = require("../../logging/logger");
class MongoConnector {
    static async connect() {
        try {
            return Promise.resolve("connected");
        } catch (dbError) {
            console.trace();
            logger.error(
                `unable to connect with mongo - ${dbError.message} : ${dbError.stack}`,
            );
            process.exit(2);
        }
    }

    static getClient() {
        return;
    }

    static getModel() {
        return;
    }
}

module.exports = MongoConnector;