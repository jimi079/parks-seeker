import * as React from 'react';
import './App.css';
import Router from "./router";
import { Container } from "@material-ui/core";

const App: React.FC = () => {
    return (
        <div className="App">
            <Container>
                <Router />
            </Container>
        </div>
    );
}

export default App;
