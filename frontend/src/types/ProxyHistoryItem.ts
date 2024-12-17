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
    body: string
    headers: Map<string, string>
    proto: string
    size: number
    status: number
}

export function formatResponse(r: Response): string {
    let formatted = `${r.proto} ${r.status}\n`
    console.log(r.headers)
    for (const [key, value] of Object.entries(r.headers)) {
        formatted += `${key}: ${value}\n`
    }
    formatted += `Content-Length: ${r.size}\n\n`
    formatted += `${r.body}\n`
    return formatted
}