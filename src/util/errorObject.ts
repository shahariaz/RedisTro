import { Request } from 'express'
import { THttpError } from '../types/types'
import responseMessage from '../constant/responseMessage'
import config from '../config/config'
import { EAplicationEnvironment } from '../constant/application'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, errorStatusCode: number = 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        statuscode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.ERROR : responseMessage.ERROR,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }
    //log
    // eslint-disable-next-line no-console
    console.error(`CONTROLLER_ERROR`, {
        meta: errorObj
    })
    //production Env check
    if (config.ENV === EAplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }
    return errorObj
}
