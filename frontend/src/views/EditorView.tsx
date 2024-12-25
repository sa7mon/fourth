import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import "./EditorView.scss"

function GetEditorItems() {
    return ["1", "2", "3"]
}

function EditorView() {
    return (
        <Row style={{height: "100vh"}}>
            <Col style={{maxWidth: "15rem"}} className="bg-body-secondary">
                <ListGroup className="text-start pt-2 list-group-hover">
                    {GetEditorItems().map(item => (
                        <ListGroupItem>{item}</ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
    )
}

export default EditorView