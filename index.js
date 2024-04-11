const constants = require("./src/utils/constants");

const application = constants.APPLICATION
const env = constants.DEFAULT_ENV

// adding environment variables to process
require("dotenv").config(
    {
        path: `${__dirname}/config/${application}/${env}/application.env`
    });

const App = require("./src/application/app");
const { initDatabases } = require("./src/dbaccessor");
const { logger } = require("./src/logging/logger");

const startApplication = async () => {
    try {
        logger.info("initializing application");
        await initDatabases();
        const app = new App();
        app.start();
    } catch (appError) {
        const { message: error, stack } = appError;
        const message = `unable to init application : ${error}\n${stack}`;
        console.error(message);
        logger.error(message);
        process.exit(2);
    }
};

startApplication().then(() => logger.info("........Application Started Successfully......"));