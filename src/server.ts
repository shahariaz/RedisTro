import app from './app'
import config from './config/config'
import logger from './util/logger'
const server = app.listen(config.PORT)
;(() => {
    try {
        logger.info(`APPLICATION_STARTES`, {
            meta: {
                PORT: config.PORT,
                ENV: config.ENV,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`APPLICATION_STARTES_FAILED`, {
            meta: err
        })
        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION_ERROR`, { meta: error })
            }
            process.exit(1)
        })
    }
})()
