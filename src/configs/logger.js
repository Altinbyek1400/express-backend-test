const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf, align } = winston.format;

const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
    align(),
    printf(({ level, message, timestamp }) => {
        if (typeof message === 'object') {
            message = JSON.stringify(message, null, 2); // Format objects as JSON
        }
        return `${timestamp} ${level.toUpperCase()}: ${message}`;
    }),
);

const createLogger = (serviceName, logFilePrefix) => {
    return winston.createLogger({
        level: 'debug',
        format: logFormat,
        defaultMeta: { service: serviceName },
        transports: [
            new winston.transports.Console(),
            new DailyRotateFile({
                filename: `/logs/${logFilePrefix}.%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxSize: '100M',
                maxFiles: '14d',
            }),
        ],
    });
};

// Create loggers
const logger = createLogger('redis-practice', 'logs');
const cronLogger = createLogger('redis-practice', 'cron');

module.exports = { logger, cronLogger };
