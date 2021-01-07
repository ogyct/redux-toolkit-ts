import React from 'react';
import './App.css';
import {Posts} from "./posts/Posts";
import {Header} from "./features/header/Header";
import {Container} from "reactstrap";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import About from "./about/About";
import TableComponent from "./table/Table";
export const delay = async (ms: number = 3000) => {
    console.log(`waiting ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
};

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
                        <TableComponent imageUrl={'null'}/>
                    </Route>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
