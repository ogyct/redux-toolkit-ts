import React from 'react';
import './App.css';
import {Posts} from "./posts/Posts";
import {Header} from "./features/header/Header";
import {Container} from "reactstrap";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import About from "./about/About";
import TableComponent from "./table/Table";

function App() {
    return (
        <BrowserRouter>
            <div className="App ">
                <Header/>
                <Container className="container container-lg border rounded">
                    <Route exact path="/"><Redirect to="/posts"/></Route>
                    <Route path="/posts">
                        <Posts/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/table">
                        <TableComponent/>
                    </Route>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
