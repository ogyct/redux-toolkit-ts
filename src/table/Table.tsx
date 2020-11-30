import React from 'react';
import {Col, Container, Row} from "reactstrap";

const Table = () => {
    return (
        <div>
            <Container fluid >
                <Row className="align-items-center">
                    <Col className="border border-primary align-top">Col1</Col>
                    <Col className="border border-primary">
                        <Row>
                            <Col>nested column 1</Col>
                            <Col>nested column 2</Col>
                        </Row>
                    </Col>
                    <Col className="border border-primary ">Col3</Col>
                    <Col className="border border-primary">Col4</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Table;