import React, {Component} from "react";
import './Wrapper.css';
import { Link } from "react-router-dom";

class Wrapper extends Component {
    render() {
	return (
		<div className="Wrapper">
		Wrapper
		{this.props.children}
		</div>
	);
    }
}

export default Wrapper;
