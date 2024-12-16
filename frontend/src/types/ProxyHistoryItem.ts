export type ProxyHistoryItem = {
    id: number
    req: Request
    res?: Response
}

export interface Request {
    url: string
    method: string
    path: string
    query: string
    proto: string
    host: string

    format(): string
}

export function formatRequest(r: Request): string {
    let formatted = `${r.method} ${r.path}${r.query} ${r.proto}`
    formatted += `\nHost: ${r.host}`
    return formatted
}

export type Response = {
    status: number
    size: number
}