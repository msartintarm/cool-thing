import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Intro from "./components/Intro";
import Game from "./components/Game";
import About from "./components/About";

function App() {
    return (
	<Router>
	    <div className="App">
	    <h1>Hey there</h1>
	    <p>Contents:</p>
            <Route exact path="/" component={Intro} />
	    <Route exact path="/game" component={Game} />
	    <Route exact path="/about" component={About} />
	    </div>
	    </Router>
    );
}

export default App;
