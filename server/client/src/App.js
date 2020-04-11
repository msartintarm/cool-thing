import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Wrapper from "./components/Wrapper";

import Intro from "./components/Intro";
import Game from "./components/Game";
import About from "./components/About";

function App() {
    return (
	    <Router>
	    <Wrapper title={
		    <Switch>
		    <Route exact path="/">
		    Hello
		    </Route>
		    <Route exact path="/game">
		    Game
		    </Route>
		    <Route exact path="/about">
		    About
		    </Route>
		    </Switch>
	    }
	content1={
	    <div className="App">
	    <h1>Hey there</h1>
	    <Switch>
            <Route exact path="/" component={Intro} />
	    <Route exact path="/game" component={Game} />
	    <Route exact path="/about" component={About} />
	    </Switch>
	    </div>
	}>
	    </Wrapper>
	    </Router>
    );
}

export default App;
