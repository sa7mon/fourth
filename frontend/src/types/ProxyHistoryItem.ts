export type ProxyHistoryItem = {
    id: number
    req: Request
    res: Response
}

export interface Request {
    url: string
    method: string
    path: string
    query: string
    proto: string
    host: string
    headers: Map<string, string>

    format(): string
}

export function formatRequest(r: Request): string {
    let formatted = `${r.method} ${r.path}${r.query} ${r.proto}`
    formatted += `\nHost: ${r.host}\n`

    for (const [key, value] of Object.entries(r.headers)) {
        formatted += `${key}: ${value}\n`
    }
    return formatted
}

export type Response = {
    proto: string
    status: number
    size: number
}

export function formatResponse(r: Response): string {
    return `${r.proto} ${r.status}`
}