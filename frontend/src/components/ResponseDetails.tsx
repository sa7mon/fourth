import {formatResponse, Response} from "../types/ProxyHistoryItem";
import {Highlighted} from "./Highlighted";

type ResponseDetailsParams = {
    response: Response
}

export function ResponseDetails({response}: ResponseDetailsParams) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <strong className="mb-1 d-block">Response</strong>
                <span>{response.size} bytes</span>
            </div>
            {/*<pre className="text-start overflow-y-auto" style={{maxHeight: "50vh"}}>*/}
            {/*<code>{formatResponse(response)}</code>*/}
            <Highlighted data={formatResponse(response)}/>
            {/*</pre>*/}
        </>
    )
}
