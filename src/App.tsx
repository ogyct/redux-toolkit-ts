/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";
import {Posts} from "./posts/Posts";
import {Header} from "./header/Header";
import {Col, Container, Row} from "reactstrap";
import {Redirect, Route, Switch} from "react-router-dom";
import PostDetail from "./postdetail/PostDetail";
import About from "./about/About";

function App() {


  return (
    <div className="App">
      <Header />
      <Container className="container container-lg">
        <Row>
          <Col className="">
            <Switch>
              <Route exact path="/">
                <Redirect to="/about" />
              </Route>
              <Route path="/posts" component={Posts} />
              <Route exact path="/post/:id" component={PostDetail} />
              <Route path="/about" component={About} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <footer>Dmitry Avgustis 2021 {process.env.REACT_APP_TEST}</footer>
    </div>
  );
}

export default App;
