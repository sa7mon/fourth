import {formatResponse, Response} from "../types/ProxyHistoryItem";

type ResponseDetailsParams = {
    response: Response
}

export function ResponseDetails({response}: ResponseDetailsParams) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <strong className="mb-3 d-block">Response</strong>
                <span>{response.size} bytes</span>
            </div>
            <pre className="text-start overflow-y-auto" style={{maxHeight: "50vh"}}>
                <code>{formatResponse(response)}</code>
            </pre>
        </>
    )
}
