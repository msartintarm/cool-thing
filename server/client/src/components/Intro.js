import React, {Component} from "react";
import { Link } from "react-router-dom";

class Intro extends Component {
    render() {
	return (
		<div>
		<p>
		Hello there folks, welcome to tarm.info!
	    </p>
		<p>
		<Link to="/game">Check out the game</Link>
		<br/>
		<Link to="/about">About the site</Link>
		</p>
		</div>
	);
    }
}

export default Intro;
