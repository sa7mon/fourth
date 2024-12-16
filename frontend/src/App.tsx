import {useEffect, useState} from 'react';
import './App.css';
import {AddSampleHistory, GetHistory} from "../wailsjs/go/app/App";
import {ProxyHistoryItem} from "./types/ProxyHistoryItem";
import {EventsOn} from "../wailsjs/runtime";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'
import './styles/table.scss'

type HistoryRowParams = {
    h: ProxyHistoryItem
    id: number
    onClick: any
    selectedRow: number | undefined
}

function HistoryRow({h, id, onClick, selectedRow}: HistoryRowParams) {
    const bgClass = (selectedRow === id ? "selected" : "")

    return (
        <tr style={{lineHeight: '12px'}} className={bgClass} data-row-id={id}
            onClick={onClick}>
            <td>{h.id}</td>
            <td>{h.req.host}</td>
            <td>{h.req.method}</td>
            <td>{h.req.path}</td>
            <td>{h.req.query}</td>
            <td>{h.res?.status}</td>
            <td>{h.res?.size}</td>
        </tr>
    )
}

function App() {
    const [historyItems, setHistoryItems] = useState<ProxyHistoryItem[]>([])
    const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined)

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

    const handleRowClick = (e: React.MouseEvent<HTMLElement>) => {
        let rowIdAttr = e.currentTarget.attributes.getNamedItem('data-row-id')
        if (!rowIdAttr) {
            console.error('[handleRowClick] data-row-id attribute was null')
            return
        }
        console.log("setting selected row to ", Number(rowIdAttr.value))
        setSelectedRow(Number(rowIdAttr.value))
    }

    return (
        <div id="App">
            <Container fluid={true} style={{height: "50vh"}} className={"overflow-y-scroll"}>
                <Row>
                    <Col>
                        <Table striped={true} className={"sticky-header"}>
                            <thead>
                            <tr style={{lineHeight: '12px'}}>
                                <th>ID</th>
                                <th>Host</th>
                                <th>Method</th>
                                <th>Path</th>
                                <th>Query</th>
                                <th>Status</th>
                                <th>Size</th>
                            </tr>
                            </thead>
                            <tbody>
                            {historyItems.map((h, i) => (
                                <HistoryRow h={h} id={i} onClick={handleRowClick} selectedRow={selectedRow}/>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{height: "50vh"}}>
                <Row className="bg-body-tertiary h-100 border-top border-secondary-subtle">
                    <Col xs={6} className="border-end border-secondary-subtle">Request</Col>
                    <Col xs={6}>Response</Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
