
module.exports = function createLogger(loggerType, loggerApiKey, payload) {

    const { createLogger, transports } = require('winston');
    const { datadogWinston } = require('datadog-winston');

    const EVENT_SOURCE = 'netlify'
    const EVENT_NAME = 'Netlify Build Notification';
    const LOGGER_MS_TIMEOUT = 500;
    const LOGGER_TYPES = {
        DATA_DOG: 'datadog',
        CONSOLE: 'console',
    };
    const loggerPayload = getPayLoad();

    const transport = [];
    if (loggerType === LOGGER_TYPES.DATA_DOG) {
        transport.push(new datadogWinston(getDataDogConfig()));
    } else {
        transport.push(new transports.Console());
    }

    const logger = createLogger({
        level: 'info',
        exitOnError: false,
        transports: transport,
    });

    function getPayLoad() {
        if (loggerType === LOGGER_TYPES.DATA_DOG) {
            return {};
        }

        return getDefaultPayload();
    }

    function getDefaultPayload() {
        return {
            env: payload.env,
            appName: payload.appName
        }
    }

    function getDataDogConfig() {
        return {
            apiKey: `${loggerApiKey}`,
            ddsource: EVENT_SOURCE,
            service: payload.appName,
            evt: {
                name: EVENT_NAME
            },
            ddtags: `env:${payload.env}`
        };
    }

    function send() {
        const timeout = setTimeout(() => {
            logger.end();
        }, LOGGER_MS_TIMEOUT);

        const completePromise = new Promise((resolve) => {
            logger.on('finish', (...args) => {
                clearTimeout(timeout);
                resolve();
            });
        });

        return completePromise;
    }

    return {
        info: (...args) => {
            loggerPayload.message = args;
            logger.info(loggerPayload);
        },
        warn: (...args) => {
            loggerPayload.message = args;
            logger.warn(loggerPayload);
        },
        send: () => send(),
    };
};
