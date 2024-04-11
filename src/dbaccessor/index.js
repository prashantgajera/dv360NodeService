const { logger } = require("../logging/logger");
const MongoConnector = require("./connector/mongoConnector");
const MysqlConnector = require("./connector/mysqlConnector");

/* Register all the databases want to init at startup */
const registerDatabases = {
    MYSQL: MysqlConnector.connect(),
    MONGO: MongoConnector.connect()
}

const initDatabases = async () => {
    const databaseInitResults = await Promise.all(
        Object.values(registerDatabases)
    );

    databaseInitResults.forEach((result, index) => {
        const db = Object.keys(registerDatabases)[index];
        logger.info(`------[${db}] database connected-------`);
    });
}

module.exports = { initDatabases }