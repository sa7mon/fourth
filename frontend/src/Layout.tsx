import {Col, Container, Row} from "react-bootstrap";
import {Sidebar} from "./components/Sidebar";
import React from "react";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <React.StrictMode>
            <div id="App">
                <Container fluid={true} style={{height: "100vh"}}>
                    <Row>
                        <Col style={{maxWidth: "150px", height: "100vh"}}
                             className="border-end border-secondary-subtle">
                            <Sidebar/>
                        </Col>
                        <Col>
                            <Outlet/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.StrictMode>
    )
}

export default Layout