import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

import Intro from "./components/Intro";
import Game from "./components/Game";
import About from "./components/About";

function App() {
    return (
	    <div className="App">
	    <Router>
	    <Wrapper
	title={Title()}
	content1={
		<>
		<Switch>
		<Route exact path="/"><Intro /></Route>
		<Route exact path="/game"><Game /></Route>
		<Route exact path="/about"><About /></Route>
		</Switch>
		<Footer/>
		</>
	}/>
	    </Router>
	    </div>
    );
}

function Title() {
    return <h1>
	<Switch>
	<Route exact path="/">Hello</Route>
	<Route exact path="/game">Game</Route>
	<Route exact path="/about">About</Route>
	</Switch>
	</h1>;
}

export default App;
