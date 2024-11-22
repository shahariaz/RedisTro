import app from './app'
import config from './config/config'

const server = app.listen(config.PORT)
;(() => {
    try {
        // eslint-disable-next-line no-console
        console.info(`APPLICATION_STARTES`, {
            meta: {
                PORT: config.PORT,
                ENV: config.ENV,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`APPLICATION_STARTES_FAILED`, {
            meta: err
        })
        server.close((error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error(`APPLICATION_ERROR`, { meta: error })
            }
            process.exit(1)
        })
    }
})()
