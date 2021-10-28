const createLogger = require('./logger');

module.exports = {

    onSuccess: async ({ constants, packageJson, netlifyConfig }) => {
        const env = netlifyConfig.build.environment;
        const payload = {
            env: env.ENVIRONMENT,
            appName: packageJson.name,
            siteId: constants.SITE_ID
        };

        const logger = createLogger(env.LOGGER_TYPE, env.DATADOG_API_KEY, payload);
        logger.info('Deploy successful');
        await logger.send();
    },

    onError: async ({ constants, packageJson, netlifyConfig }) => {
        const env = netlifyConfig.build.environment;
        const payload = {
            env: env.ENVIRONMENT,
            appName: packageJson.name,
            siteId: constants.SITE_ID
        };

        const logger = createLogger(env.LOGGER_TYPE, env.DATADOG_API_KEY, payload);
        logger.info('Deploy error');
        await logger.send();
    }
};
