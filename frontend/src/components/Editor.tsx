import React, {useRef, useEffect} from 'react';

import {EditorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {defaultKeymap} from '@codemirror/commands';
import {basicSetup} from "codemirror"
import {Request} from "../types/ProxyHistoryItem"; // also exports EditorView

export interface EditorParams {
    code: Request
}

function toString(request: Request): string {
    const startLine = `${request.method} ${request.path}${request.query} ${request.proto}\n`
    let headerText = `Host: ${request.host}\n`
    for (const [key, value] of Object.entries(request.headers)) {
        headerText += `${key}: ${value}\n`
    }
    return `${startLine}${headerText}`
}

export const Editor = ({code}: EditorParams) => {
    const editor = useRef();

    useEffect(() => {
        const startState = EditorState.create({
            doc: toString(code),
            extensions: [keymap.of(defaultKeymap), basicSetup],
        });

        const view = new EditorView({state: startState, parent: editor.current});

        return () => {
            view.destroy();
        };
    }, []);

    // @ts-ignore
    return <div style={{maxHeight: "50vh"}} className="p-2 text-start overflow-y-auto col">
        <div className="text-start">
            <div className="d-flex justify-content-between">
                <strong>Request</strong>
                <button className="btn btn-outline-success btn-sm">Send</button>
            </div>
            <div className="text-start" ref={editor}></div>
        </div>
    </div>
};
