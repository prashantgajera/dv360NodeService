const winston = require("winston");
require("winston-daily-rotate-file");

const { createLogger, format, transports } = winston;
const { combine, timestamp: logTimestamp, printf } = format;


const getLogger = () => {
    if (!this.logger) {
        this.logger = initLogger();
    }
    return this.logger;
}

const initLogger = (
    application = process.env.APPLICATION,
    level = process.env.LOG_LEVEL || "debug",
    logDirectory = process.env.LOG_DIRECTORY || __dirname + "/logs",
    environment = process.env.NODE_ENV || "production"
) => {
    const logFormat = printf(({ level, message, timestamp }) => {
        if (typeof message === "object") {
            return `${timestamp} [${level}] ${JSON.stringify(message)}`;
        }

        return `${timestamp} [${level}] ${message}`;
    });

    const logTransports = [
        new transports.DailyRotateFile({
            level,
            dirname: logDirectory,
            filename: `${application}.%DATE%.log`,
            datePattern: "YYYY-MM-DD",
        }),
    ];

    if (environment !== "prod") {
        logTransports.push(
            new winston.transports.Console({
                level,
                colorize: true,
            }),
        );
    }
    const logger = createLogger({
        format: combine(logTimestamp(), logFormat),
        transports: logTransports,
    });

    return logger;
}

module.exports = { initLogger };
module.exports.logger = getLogger();