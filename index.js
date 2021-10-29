const createLogger = require('./logger');

module.exports = {

    onEnd: async ({ constants, packageJson }) => {
        const payload = {
            env: process.env.ENVIRONMENT,
            appName: packageJson.name,
            siteId: constants.SITE_ID
        };

        const logger = createLogger(process.env.LOGGER_TYPE, process.env.DATADOG_API_KEY, payload);
        logger.info('Deploy error');
        await logger.send();
    }
};
