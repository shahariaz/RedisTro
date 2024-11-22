import util from 'util'
import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import config from '../config/config'

import path from 'path'
import * as sourceMapSupport from 'source-map-support'
import { EAplicationEnvironment } from '../constant/application'
// Linking Trace Support

sourceMapSupport.install()
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} as Record<string, unknown> } = info
    const customLevel = level.toUpperCase()

    const customTimestamp = timestamp

    const customMessage = message
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${'META'} ${customMeta}\n`
    return customLog
})
const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EAplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}
const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const logMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }
    const logData = {
        level: level.toUpperCase(),

        message,

        timestamp,
        meta: logMeta
    }
    return JSON.stringify(logData, null, 4)
})
const FileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}
export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...FileTransport(), ...consoleTransport()]
})
