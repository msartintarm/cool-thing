import React, {PureComponent} from 'react'
import './App.css'
import {HashRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom"

import Footer from "./components/Footer"
import Wrapper from "./components/Wrapper"

import Intro from "./components/Intro"
import UnityGame from "./components/UnityGame"
import PhaserGame from "./components/PhaserGame"
import About from "./components/About"

type AppPropsType = {}
type AppStateType = {
    gameExpanded: boolean,
    wrapperScale: number
}
class App extends PureComponent<AppPropsType, AppStateType> {
    constructor(props: AppPropsType) {
	super(props)
	this.state = {
	    gameExpanded: false,
	    wrapperScale: 1.0
	}
	this.expandGame = this.expandGame.bind(this)
    }
    
    render() {
	const titleContent = this.state.gameExpanded? <div></div>: 
			     <h1>
			       <Switch>
				 {[
				      ["/", "Hello there"],
				      ["/game", "Unity game"],
				      ["/game2", "Phaser game"],
				      ["/about","About site"],
				 ].map(([link, text]) => (<Route key={link} exact path={link}>{text}</Route>))}
			       </Switch>
			     </h1>
	
	return (
	    <div className="App">
	      <Router>
		<Wrapper
		    title={titleContent}
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
	)
    }
    
    expandGame() {
	const newExpandedState = !this.state.gameExpanded
	this.setState({
	    gameExpanded: newExpandedState,
	    wrapperScale: newExpandedState? 0.5: 1.0,
	})
    }
}

/// Define the link mapping at the application level, not within the footer level
function FooterWithLinks() {
    // useRouteMatch is a 'react hook', and thus must obey certain constraints such as no dynamic inputs
    const matchingLinks = new Map([
	["/about", !!useRouteMatch("/about")],
	["/game", !!useRouteMatch("/game")],
	["/game2", !!useRouteMatch("/game2")],
    ])
    const matchingEntry = [...matchingLinks.entries()].find((entry) => entry[1])
    const matchingLink = matchingEntry? matchingEntry[0]: "/"
    const footerLinks = new Map([
	["/", "Check out the intro"],
	["/game", "Check out the Unity game"],
	["/game2", "COMING SOON: Check out the Phaser game"],
	["/about", "About the site"],
    ])
    return (<Footer linkz={footerLinks} currLink={matchingLink}/>)
}

export default App
