const createLogger = require('./logger');

module.exports = {

    onEnd: async ({ constants, packageJson, error }) => {
        const payload = {
            env: process.env.ENVIRONMENT,
            appName: packageJson.name,
            siteId: constants.SITE_ID
        };

        const logger = createLogger(process.env.LOGGER_TYPE, process.env.DATADOG_API_KEY, payload);
        if (error) {
            logger.info(`Deploy error: ${error.shortMessage}`);
        } else {
            logger.info(`Deploy success`);
        }
        await logger.send();
    }
};
