import {formatRequest, Request} from '../types/ProxyHistoryItem'

type RequestDetailsParams = {
    request: Request
}

export function RequestDetails({request}: RequestDetailsParams) {
    return (
        <pre className="text-start">
            <code>{formatRequest(request)}</code>
        </pre>
    )
}
