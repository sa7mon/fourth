import {HttpMessageDetailsParams} from "../components/HttpMessageDetails";

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

export type Response = {
    body: string
    headers: Map<string, string>
    proto: string
    size: number
    status: number
}