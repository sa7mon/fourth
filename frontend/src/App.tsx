import {useEffect, useState} from 'react';
import './App.css';
import {AddSampleHistory, GetHistory} from "../wailsjs/go/main/App";
import {ProxyHistoryItem} from "./types/ProxyHistoryItem";

function App() {
    const [historyItems, setHistoryItems] = useState<ProxyHistoryItem[]>([])

    useEffect(() => {
        GetHistory().then((h) => {
            console.log(h)
            setHistoryItems(h)
        })
    }, [])

    const handleNew = (e: any) => {
        AddSampleHistory().then(() => {
            console.log("added sample history")
            return GetHistory()
        }).then((h) => {
            console.log(h)
            setHistoryItems(h)
        })
    }

    return (
        <div id="App">
            <button onClick={handleNew}>New Sample Request</button>
            <br/>
            <strong>History Items</strong>
            <table style={{borderStyle: 'solid 1px black', borderTop: 'black solid 1px'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Method</th>
                    <th>URL</th>
                </tr>
                </thead>
                <tbody>
                    {historyItems.map((h) => (
                        <tr>
                            <td>{h.id}</td>
                            <td>{h.req.method}</td>
                            <td>{h.req.url}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default App
