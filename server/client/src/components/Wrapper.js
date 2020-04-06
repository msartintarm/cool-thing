import React, {Component} from "react";
import { Link } from "react-router-dom";

import './Wrapper.css';
import Scroll1 from './scrollz/scroll1.png';

class Wrapper extends Component {
    render() {
	return (
		<div className="Wrapper">
		Wrapper
		<img src={Scroll1} />
		{this.props.children}
		</div>
	);
    }
}

export default Wrapper;
