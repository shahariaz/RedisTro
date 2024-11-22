export type THttpResponse = {
    success: boolean
    statuscode: number
    request: {
        ip?: string | null
        method?: string
        url: string
    }
    message: string
    data: unknown
}
export type THttpError = {
    success: boolean
    statuscode: number
    request: {
        ip?: string | null
        method?: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}
