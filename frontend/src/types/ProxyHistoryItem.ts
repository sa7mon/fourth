export type ProxyHistoryItem = {
    id: number
    req: Request
    res?: Response
}

export type Request = {
    method: string
    url: string
    proto: string
    content_length: number
    host: string
    path: string
    query: string
}

export type Response = {
    status: number
    size: number
}