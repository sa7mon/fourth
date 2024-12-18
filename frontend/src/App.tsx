import {useEffect, useState} from 'react';
import './App.css';
import {GetHistory} from "../wailsjs/go/app/App";
import {ProxyHistoryItem} from "./types/ProxyHistoryItem";
import {EventsOn} from "../wailsjs/runtime";
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'
import './styles/table.scss'
import {HistoryTable} from "./components/HistoryTable";
import {RequestDetails} from "./components/RequestDetails";
import {ResponseDetails} from "./components/ResponseDetails";


function App() {
    const [historyItems, setHistoryItems] = useState<ProxyHistoryItem[]>([])
    const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined)

    // Fetch data on component load
    useEffect(() => {
        GetHistory().then((h: any) => {
            setHistoryItems(h)
        })
    }, [])

    useEffect(() => {

    }, [selectedRow]);

    EventsOn("proxy_new-response", (data: any) => {
        console.log("new proxy response!")
        console.log(data)
        GetHistory().then((h: any) => {
            setHistoryItems(h)
        })
    })

    return (
        <div id="App">
            <Container fluid={true} style={{height: "100vh"}}>
                <Row>
                    <Col xs={1} className="border-end border-secondary-subtle">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Active</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <Row style={{height: "50vh"}} className="overflow-y-scroll">
                            <Col>
                                <HistoryTable data={historyItems} setSelectedRow={setSelectedRow}
                                              selectedRow={selectedRow}/>
                            </Col>
                        </Row>
                        <Row className="bg-body-tertiary h-100 border-top border-secondary-subtle"
                             style={{height: "50vh"}}>
                            <Col xs={6} className="border-end border-secondary-subtle">
                                {selectedRow && (
                                    <RequestDetails
                                        request={historyItems[selectedRow].req}/>
                                )}
                            </Col>
                            <Col xs={6} style={{maxHeight: "50vh"}} className="p-2 text-start">
                                {selectedRow && (
                                    <ResponseDetails response={historyItems[selectedRow].res}/>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
