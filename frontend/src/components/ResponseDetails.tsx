import {formatResponse, Response} from "../types/ProxyHistoryItem";

type ResponseDetailsParams = {
    response: Response
}

export function ResponseDetails({response}: ResponseDetailsParams) {
    return (
        <div className={"p-2 text-start"}>
            <strong className="mb-3 d-block">Response</strong>
            <pre className="text-start">
                <code>{formatResponse(response)}</code>
            </pre>
        </div>
    )
}
