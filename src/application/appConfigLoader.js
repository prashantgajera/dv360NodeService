const fs = require("fs");

const { NODE_ENV, CONFIG_FILE, APPLICATION, NODE_SVC_PORT } = process.env;

const readFile = (filePath) =>
    JSON.parse(fs.readFileSync(filePath, { encoding: "utf8", flag: "r" }));

class AppConfigLoader {
    constructor() {
        this.env = NODE_ENV;
        this.appConfig = readFile(`${CONFIG_FILE}/${NODE_ENV}/application.json`);
        this.port = NODE_SVC_PORT;
        this.APPLICATION = APPLICATION;
    }

    getConfigValue(configKey, isFilePath = false) {
        if (this.appConfig && this.appConfig[configKey]) {
            if (isFilePath) {
                return readFile(this.appConfig[configKey]);
            }
            return this.appConfig[configKey];
        }
        return null;
    }

    getApplication() {
        return this.APPLICATION;
    }

    getMysqlConfig() {
        return this.getConfigValue("databaseConfig", true);
    }

    getJwtSecret() {
        return this.getConfigValue('jwt_secret');
    }

    getAESSecret() {
        return this.getConfigValue('aes_secret');
    }

    getAwsCreds() {
        const s3AccessKey = this.getConfigValue('aws_access_key');
        const s3SecretKey = this.getConfigValue('aws_secret_key');
        return { s3AccessKey, s3SecretKey };
    }
}

module.exports = AppConfigLoader;
