import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import "./EditorView.scss"
import {GetEditorItems} from "../../wailsjs/go/app/App";
import {useEffect, useState} from "react";
import {ProxyHistoryItem} from "../types/ProxyHistoryItem";
import {Editor} from "../components/Editor";
import {EditorItem} from "../types/EditorItem";
import {Send} from "../../wailsjs/go/app/App";
import {EventsOn, EventsOnce} from "../../wailsjs/runtime";

function EditorView() {
    const [items, setItems] = useState<ProxyHistoryItem[]>([])
    const [activeItem, setActiveItem] = useState<EditorItem | undefined>(undefined)
    const [activeItemId, setActiveItemId] = useState<number | undefined>(undefined)

    useEffect(() => {
        GetEditorItems().then(data => setItems(data))
    }, [])

    const handleClick = (id: number) => {
        setActiveItemId(id)
        setActiveItem(items.find((item) => item.id === id))
    }

    EventsOn("editor_new-response", (data: ProxyHistoryItem) => {
        console.log("[EventsOnce] ", data)
    })
    console.log("[onSend] event listener started")

    const onSend = (request: string, id: number) => {
        Send(request, id).then((res: boolean) => {
            console.log("[onSend] Called Send() on backend")
        }).catch((e) => {
            console.log("[onSend]", e)
        })
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
            <Col style={{maxHeight: "50vh"}}
                 className="border-end border-secondary-subtle p-1 text-start overflow-y-auto">
                {activeItem && (
                    <Editor onSend={onSend} editable={true} request={activeItem.req}/>
                )}
            </Col>
            <Col style={{maxHeight: "50vh"}} className="p-1 text-start overflow-y-auto">
                {activeItem && (
                    <Editor editable={false} response={activeItem.res}/>
                )}
            </Col>
        </Row>
    )
}

export default EditorView