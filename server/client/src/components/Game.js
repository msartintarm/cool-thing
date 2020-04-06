import React, {Component} from "react";
import { Link } from "react-router-dom";

class Game extends Component {
    render() {
	return (
		<div>
		<p>
		This is the cool game!
	    </p>
		<p>
		<Link to="/">Check out the intro</Link>
		</p>
		</div>
	);
    }
}

export default Game;
