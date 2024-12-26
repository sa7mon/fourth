import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import "./EditorView.scss"
import {GetEditorItems} from "../../wailsjs/go/app/App";
import {useEffect, useState} from "react";
import {ProxyHistoryItem} from "../types/ProxyHistoryItem";

// function GetEditorItems() {
//     return ["1", "2", "3"]
// }

function EditorView() {
    const [items, setItems] = useState<ProxyHistoryItem[]>([])

    useEffect(() => {
        GetEditorItems().then(data => setItems(data))
    }, [])

    return (
        <Row style={{height: "100vh"}}>
            <Col style={{maxWidth: "15rem"}} className="bg-body-secondary">
                <ListGroup className="text-start pt-2 list-group-hover">
                    {items && items.map(item => (
                        <ListGroupItem>{item.id}</ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
    )
}

export default EditorView