import React, {useRef, useEffect} from 'react';

import CodeMirror from '@uiw/react-codemirror';
import {Request} from "../types/ProxyHistoryItem"; // also exports EditorView
import {http} from '@codemirror/legacy-modes/mode/http'
import {StreamLanguage} from '@codemirror/language'
import {tokyoNightStorm} from "@uiw/codemirror-theme-tokyo-night-storm";

export interface EditorParams {
    code: Request
    editable: boolean
}

function toString(request: Request): string {
    const startLine = `${request.method} ${request.path}${request.query} ${request.proto}\n`
    let headerText = `Host: ${request.host}\n`
    for (const [key, value] of Object.entries(request.headers)) {
        headerText += `${key}: ${value}\n`
    }
    return `${startLine}${headerText}`
}

export const Editor = ({code, editable}: EditorParams) => {
    const [value, setValue] = React.useState(toString(code))
    // @ts-ignore
    const onChange = React.useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    // @ts-ignore
    return <div style={{maxHeight: "100vh"}} className="p-2 text-start overflow-y-auto col">
        <div className="text-start">
            <div className="d-flex justify-content-between">
                <strong>Request</strong>
                <button className="btn btn-outline-success btn-sm">Send</button>
            </div>
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
