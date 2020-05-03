import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";

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
	    gameExpanded: false,
	    wrapperScale: 1.0
	};
	this.expandGame = this.expandGame.bind(this);
    }
    
    render() {
	const titleContent = 
	    <h1>
	      <Switch>
		{[
		     ["/", "Hello"],
		     ["/game", "Game"],
		     ["/about","About"],
		].map(([link, text]) => (<Route exact path={link}>{text}</Route>))}
	      </Switch>
	    </h1>;
	
	return (
	    <div className="App">
	      <Router>
		<Wrapper
		    title={!this.state.gameExpanded && titleContent}
		    scale={this.state.wrapperScale}
		    content1={
			<>
			  <Switch>
			    <Route exact path="/"><Intro /></Route>
			    <Route exact path="/game">
			      <UnityGame isOpen={this.state.gameExpanded} expandFn={this.expandGame} />
			    </Route>
			    <Route exact path="/game2">
			      <PhaserGame isOpen={this.state.gameExpanded} expandFn={this.expandGame} />
			    </Route>
			    <Route exact path="/about"><About /></Route>
			  </Switch>
			  {!this.state.gameExpanded && <FooterWithLinks/>}
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

/// Define the link mapping at the application level, not within the footer level
function FooterWithLinks() {
    // useRouteMatch is a 'react hook', and thus must obey certain constraints such as no dynamic inputs
    const [_, matchingLink] = [
	["/", useRouteMatch("/").isExact],
	["/about", useRouteMatch("/about")],
	["/game", useRouteMatch("/game")],
    ].find(([_, isMatch]) => isMatch);
    
    const footerLinks = new Map([
	["/", "Check out the intro"],
	["/game", "Check out the game"],
	["/about", "About the site"],
    ]);
    return (<Footer linkz={footerLinks} currLink = {matchingLink}/>);
}

export default App;
