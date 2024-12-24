import Prism from "prismjs";
// import '../styles/prism.css'
// import '../styles/prism-one-light.css'
import '../styles/okaidia.css'
import {useEffect} from "react";

/**
 * HighlightedParams should closely reflect RFC2616
 * https://www.rfc-editor.org/rfc/rfc2616#section-4
 */
export type HighlightedParams = {
    startLine: string
    headers: string
    body: string
}

export const Highlighted = ({startLine, headers, body}: HighlightedParams) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [startLine, headers, body]);

    return (
        <pre className="text-start line-numbers pt-2">
            <code className="">{`${startLine}${headers}`}</code>
            <code className="language-html">{`${body}`}</code>
        </pre>
    )
}