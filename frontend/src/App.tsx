import {useEffect, useState} from 'react';
import './App.css';
import {AddSampleHistory, GetHistory} from "../wailsjs/go/app/App";
import {ProxyHistoryItem} from "./types/ProxyHistoryItem";
import {EventsOn} from "../wailsjs/runtime";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [historyItems, setHistoryItems] = useState<ProxyHistoryItem[]>([])

    // Fetch data on component load
    useEffect(() => {
        GetHistory().then((h: any) => {
            setHistoryItems(h)
        })
    }, [])

    EventsOn("proxy_new-response", (data: any) => {
        console.log("new proxy response!")
        console.log(data)
        GetHistory().then((h: any) => {
            setHistoryItems(h)
        })
    })


    const handleNew = (e: any) => {
        AddSampleHistory().then(() => {
            console.log("added sample history")
            return GetHistory()
        }).then((h: any) => {
            setHistoryItems(h)
        })
    }

    return (
        <div id="App">
            <Container fluid={true} style={{height: "50vh"}} className={"overflow-y-scroll"}>
                {/*<Button onClick={handleNew}>New Sample Request</Button>*/}
                {/*<br/>*/}
                <Row>
                    <Col>
                        <Table striped={true} className={"sticky-header"}>
                            <thead>
                            <tr style={{lineHeight: '12px'}}>
                                <th>ID</th>
                                <th>Host</th>
                                <th>Method</th>
                                <th>URL</th>
                            </tr>
                            </thead>
                            <tbody>
                            {historyItems.map((h) => (
                                <tr style={{lineHeight: '12px'}}>
                                    <td>{h.id}</td>
                                    <th>{h.req.host}</th>
                                    <td>{h.req.method}</td>
                                    <td>{h.req.url}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{height: "50vh"}}>
                I'm in the lower container
            </Container>
        </div>
    )
}

export default App
