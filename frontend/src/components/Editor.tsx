import React from 'react';

import CodeMirror from '@uiw/react-codemirror';
import {Request} from "../types/Request"; // also exports EditorView
import {Response} from "../types/Response"; // also exports EditorView
import {http} from '@codemirror/legacy-modes/mode/http'
import {StreamLanguage} from '@codemirror/language'
import {tokyoNightStorm} from "@uiw/codemirror-theme-tokyo-night-storm";

export interface EditorParams {
    editable: boolean
    request?: Request
    response?: Response
}

function requestToString(request: Request): string {
    const startLine = `${request.method} ${request.path}${request.query} ${request.proto}\n`
    let headerText = `Host: ${request.host}\n`
    for (const [key, value] of Object.entries(request.headers)) {
        headerText += `${key}: ${value}\n`
    }
    return `${startLine}${headerText}`
}

function responseToString(response?: Response): string {
    if (!response || response.status === 0) {
        return ""
    }
    console.log("[responseToString]", response)
    const startLine = `${response.proto} ${response.status}\n`
    let headerText = `Content-Length: ${response.size}\n`
    for (const [key, value] of Object.entries(response.headers)) {
        headerText += `${key}: ${value}\n`
    }
    const body = `\n${response.body}\n`
    return `${startLine}${headerText}${body}`
}

export const Editor = ({request, response, editable}: EditorParams) => {
    if ((request === null || request === undefined) && (response === null || response === undefined)) {
        console.log("request and response both null")
        return null
    }
    let code = ""
    if (request) {
        code = requestToString(request)
    } else {
        code = responseToString(response)
    }

    const [value, setValue] = React.useState(code)
    // @ts-ignore
    const onChange = React.useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    // @ts-ignore
    return <div style={{maxHeight: "100vh"}} className="p-2 text-start overflow-y-auto col">
        <div className="text-start">
            {request ? (
                <div className="d-flex justify-content-between">
                    <strong>Request</strong>
                    <button className="btn btn-outline-success btn-sm">Send</button>
                </div>
            ) : (
                <div className="d-flex justify-content-between pb-2">
                    <strong>Response</strong>
                </div>
            )}
            <CodeMirror
                editable={editable}
                className="pt-1"
                value={value}
                extensions={[StreamLanguage.define(http)]}
                onChange={onChange}
                theme={tokyoNightStorm}/>
        </div>
    </div>
};
