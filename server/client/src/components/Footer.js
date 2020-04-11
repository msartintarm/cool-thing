import React, {Component} from "react";
import { Link, Route, Switch } from "react-router-dom";

class Footer extends Component {
    render() {
	return (
		<div>
		<p>
		<Switch>
		<Route exact path="/">
		<Link to="/game">Check out the game</Link>
		<br/>
		<Link to="/about">About the site</Link>
		</Route>
		<Route exact path="/game">
		<Link to="/">Check out the intro</Link>
		</Route>
		<Route exact path="/about">
		<Link to="/">Check out the intro</Link>
		<br/>
		<Link to="/game">Check out the game</Link>
		</Route>
		</Switch>
		</p>
		</div>
	);
    }
}

export default Footer;
