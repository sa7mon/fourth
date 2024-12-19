import {formatRequest, Request} from '../types/ProxyHistoryItem'
import {Highlighted} from "./Highlighted";

type RequestDetailsParams = {
    request: Request
}

export function RequestDetails({request}: RequestDetailsParams) {
    return (
        <div className={"p-2 text-start"}>
            <strong className="mb-1 d-block">Request</strong>
            <Highlighted data={formatRequest(request)}/>
        </div>
    )
}
