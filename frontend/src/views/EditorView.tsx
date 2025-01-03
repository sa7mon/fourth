import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import "./EditorView.scss"
import {GetEditorItems, GetHistory, GetHistoryItem, NewEditorItem} from "../../wailsjs/go/app/App";
import {useEffect, useState} from "react";
import {ProxyHistoryItem} from "../types/ProxyHistoryItem";
import {HttpMessageDetails} from "../components/HttpMessageDetails";
import {Editor} from "../components/Editor";

function EditorView() {
    const [items, setItems] = useState<ProxyHistoryItem[]>([])
    const [activeItem, setActiveItem] = useState<ProxyHistoryItem | undefined>(undefined)
    const [activeItemId, setActiveItemId] = useState<number | undefined>(undefined)

    useEffect(() => {
        GetEditorItems().then(data => setItems(data))
    }, [])

    const handleClick = (id: number) => {
        setActiveItemId(id)
        setActiveItem(items.find((item) => item.id === id))
    }

    return (
        <Row style={{height: "100vh"}}>
            <Col style={{maxWidth: "11rem"}} className="bg-body-secondary">
                <ListGroup className="text-start pt-2 list-group-hover">
                    {items && items.map(item => (
                        <ListGroupItem onClick={() => handleClick(item.id)}
                                       className={(item.id == activeItemId ? "active" : "")}>{item.id}</ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
            <Col className="border-end border-secondary-subtle">
                {activeItem && (
                    // <HttpMessageDetails request={activeItem.req} id={activeItem.id}/>
                    <Editor code={activeItem.req}/>
                )}
            </Col>
            <Col style={{maxHeight: "50vh"}} className="p-2 text-start overflow-y-auto">
                {activeItem && (
                    <HttpMessageDetails response={activeItem.res} id={activeItem.id}/>
                )}
            </Col>
        </Row>
    )
}

export default EditorView