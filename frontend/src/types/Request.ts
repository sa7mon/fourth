export interface Request {
    url: string
    method: string
    path: string
    query: string
    proto: string
    host: string
    headers: Map<string, string>
}