import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'
import config from '../config/config'
import { EAplicationEnvironment } from '../constant/application'
import logger from './logger'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null) => {
    const response: THttpResponse = {
        success: true,
        statuscode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }
    //log

    logger.info(`CONTROLLER_RESPONSE`, {
        meta: response
    })
    if (config.ENV === EAplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }
    res.status(responseStatusCode).json(response)
}
