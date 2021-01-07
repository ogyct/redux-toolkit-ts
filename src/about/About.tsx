import React, { useRef } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const About = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Card title</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
            <input ref={inputRef} type="text"/>
            <button onClick={event => inputRef.current?.focus()}>Test Ref</button>
        </div>
    );
};

export default About;
