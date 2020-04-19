import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

import Intro from "./components/Intro";
import Game from "./components/Game";
import About from "./components/About";

class App extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    gameExpanded: false,
	    wrapperScale: 1.0
	};
	this.expandGame = this.expandGame.bind(this);
    }
    
    render() {
	return (
	    <div className="App">
	      <Router>
		<Wrapper
		    title={Title()}
		    scale={this.state.wrapperScale}
		    content1={
			<>
			  <Switch>
			    <Route exact path="/"><Intro /></Route>
			    <Route exact path="/game">
			      <Game isOpen={this.state.gameExpanded} expandFn={this.expandGame} />
			    </Route>
			    <Route exact path="/about"><About /></Route>
			  </Switch>
			  <Footer/>
			</>
		    }/>
	      </Router>
	    </div>
	);
    }
    
    expandGame() {
	const newExpandedState = !this.state.gameExpanded;
	this.setState({
	    gameExpanded: newExpandedState,
	    wrapperScale: newExpandedState? 0.5: 1.0,
	});
    }
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
