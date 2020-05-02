import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

import Intro from "./components/Intro";
import UnityGame from "./components/UnityGame";
import PhaserGame from "./components/UnityGame";
import About from "./components/About";

class App extends React.PureComponent {
    constructor(props) {
	super(props);
	this.state = {
	    unityGameExpanded: false,
	    wrapperScale: 1.0
	};
	this.expandUnityGame = this.expandUnityGame.bind(this);
    }
    
    render() {

	const titleContent = 
	    <h1>
	      <Switch>
		<Route exact path="/">Hello</Route>
		<Route exact path="/game">Game</Route>
		<Route exact path="/about">About</Route>
	      </Switch>
	    </h1>;

	const footerLinks = new Map([
	    ["Check out the intro", "/"],
	    ["Check out the game", "/game"],
	    ["About the site", "/about"],
	]);

	return (
	    <div className="App">
	      <Router>
		<Wrapper
		    title={!this.state.unityGameExpanded && titleContent}
		    scale={this.state.wrapperScale}
		    content1={
			<>
			  <Switch>
			    <Route exact path="/"><Intro /></Route>
			    <Route exact path="/game">
			      <UnityGame isOpen={this.state.unityGameExpanded} expandFn={this.expandUnityGame} />
			    </Route>
			    <Route exact path="/about"><About /></Route>
			  </Switch>
			  {!this.state.unityGameExpanded && <Footer linkz={footerLinks}/>}
			</>
		    }/>
	      </Router>
	    </div>
	);
    }
    
    expandUnityGame() {
	const newExpandedState = !this.state.unityGameExpanded;
	this.setState({
	    unityGameExpanded: newExpandedState,
	    wrapperScale: newExpandedState? 0.5: 1.0,
	});
    }
}

export default App;
