import React, {Component} from "react";
import { Link } from "react-router-dom";

class About extends Component {
    render() {
	return (
		<div>
		<p>
		Michael Sartin-Tarm enjoys cheese, running, and beer. </p>
		<p>
		He created this site to spread platforming joy. First, though, he has to learn how to create games. To be continued...
	    </p>
		<p>
		<Link to="/">Check out the intro</Link>
		<br/>
		<Link to="/game">Check out the game</Link>
		</p>
		</div>
	);
    }
}

export default About;
