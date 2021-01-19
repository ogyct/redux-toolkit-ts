import React, { useEffect } from 'react';
import './App.css';
import { Posts } from "./posts/Posts";
import { Header } from "./features/header/Header";
import { Button, Col, Container, Row } from "reactstrap";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import About from "./about/About";
import TableComponent from "./table/Table";
import ProtectedRoute from './common/ProtectedRoute';
import ProtectedComponent from './protected/ProtectedComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

useEffect(() => {

});
function App() {
    const history = useHistory();
    return (
      <div className="App">
          <Header/>
          <Container className="container container-lg">
              <Row>
                  <Col className="pl-1 pt-4" xs="auto">
                      <Button onClick={() => history.goBack()} className="">
                          <FontAwesomeIcon icon={faLongArrowAltLeft} size='2x'/>
                      </Button>
                  </Col>
                  <Col className='border rounded'>
                      <Switch>
                          <Route exact path="/"><Redirect to="/posts"/></Route>
                          <Route path="/posts" component={Posts}/>
                          <Route path="/about" component={About}/>
                          <Route path="/table" component={TableComponent}/>
                          <ProtectedRoute exact path="/protected" component={ProtectedComponent}/>
                      </Switch>
                  </Col>
              </Row>
          </Container>
      </div>
    );
}

export default App;
