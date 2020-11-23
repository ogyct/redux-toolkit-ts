import React from 'react';
import './App.css';
import {Posts} from "./posts/Posts";
import {Header} from "./features/header/Header";
import {Container} from "reactstrap";

function App() {
    return (
        <div className="App ">
            <Header/>
            <Container className="container-lg">
                <Posts/>
            </Container>
        </div>
    );
}

export default App;
