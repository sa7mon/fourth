
export type ProxyHistoryItem = {
    id: number
    req: Request
}

export type Request = {
    method: string
    url: string
    proto: string
    content_length: number
    host: string
}