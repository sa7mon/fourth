import Prism from "prismjs";
// import '../styles/prism.css'
import '../styles/prism-one-light.css'
import {useEffect} from "react";

export const Highlighted = (data: any) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [data]);

    return (
        <pre className="text-start">
            <code className="language-html">{data.data}</code>
        </pre>
    )
}