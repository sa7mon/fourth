import {Highlighted} from "./Highlighted";
import {Request, Response} from '../types/ProxyHistoryItem'

export type HttpMessageDetailsParams = {
    request?: Request
    response?: Response
}

export const HttpMessageDetails = ({request, response}: HttpMessageDetailsParams) => {
    if (!request && !response) {
        console.error("[HttpMessageDetails] either request or response is required")
    }
    if (request) {
        const startLine = `${request.method} ${request.path}${request.query} ${request.proto}\n`
        let headerText = `Host: ${request.host}\n`
        for (const [key, value] of Object.entries(request.headers)) {
            headerText += `${key}: ${value}\n`
        }
        return (
            <div className={"p-2 text-start"}>
                <strong className="mb-1 d-block">Request</strong>
                <Highlighted startLine={startLine} headers={headerText} body={""}/>
            </div>
        )
    }
    if (response) {
        const startLine = `${response.proto} ${response.status}\n`
        let headerText = `Content-Length: ${response.size}\n`
        for (const [key, value] of Object.entries(response.headers)) {
            headerText += `${key}: ${value}\n`
        }
        const body = `\n${response.body}\n`
        return (
            <>
                <div className="d-flex justify-content-between">
                    <strong className="d-block">Response</strong>
                    <span>{response.size} bytes</span>
                </div>
                <Highlighted startLine={startLine} headers={headerText} body={body}/>
            </>
        )
    }
    return <></>
}