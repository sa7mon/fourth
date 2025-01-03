import React, {useRef, useEffect} from 'react';

import {EditorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {defaultKeymap} from '@codemirror/commands';
import {basicSetup} from "codemirror" // also exports EditorView

export const Editor = () => {
    const editor = useRef();

    useEffect(() => {
        const startState = EditorState.create({
            doc: 'Hello World',
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
                <button className="btn btn-outline-primary btn-sm">Send</button>
            </div>
            <div className="text-start" ref={editor}></div>
        </div>
    </div>
};
