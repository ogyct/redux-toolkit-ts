import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from "reactstrap";
interface Props {
    imageUrl: string
}

const delay = async (ms: number = 3000) => {
    console.log(`waiting ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
};
const result = async () => {
    await delay();
    return ('https://sun6-20.userapi.com/impg/LSpa2LVuoSk4aZeJmqpaF0pNABfSNBIaN5hLJg/cLWnL5b2XDA.jpg?size=1000x800&quality=96&proxy=1&sign=b5eb8ec90336f13dcf8a5ab795808add');
};
const Table: FC<Props> = ({imageUrl}) => {
    const [imgUrl, setImgUrl] = useState<string>();

    useEffect(() => {
        void async function () {
            setImgUrl(await result());
        }();
    }, []);
    return (
      <div>
          <Container fluid>
              <Row className="align-items-center">
                  <Col className="border border-primary align-top">Col1</Col>
                  <Col className="border border-primary">
                      <Row>
                          <Col>{}</Col>
                          <Col>nested column 2</Col>
                      </Row>
                  </Col>
                  <Col className="border border-primary ">Col3</Col>
                  <Col className="border border-primary">Col4</Col>
              </Row>
              <img src={imageUrl} alt='loading'/>
          </Container>
      </div>
    );
};

export default Table;
