import {formatRequest, Request} from '../types/ProxyHistoryItem'

type RequestDetailsParams = {
    request: Request
}

export function RequestDetails({request}: RequestDetailsParams) {
    return (
        <div className={"p-2 text-start"}>
            <strong className="mb-3 d-block">Request</strong>
            <pre className="text-start">
                <code>{formatRequest(request)}</code>
            </pre>
        </div>
    )
}
