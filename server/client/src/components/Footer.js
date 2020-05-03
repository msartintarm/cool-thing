import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const DISABLED_CLASS = "FooterLinkDisabled";

function Footer(props) {
    return (
    <div className="FooterContainer">
      <div className="FooterSpacer"></div>
      <div className="FooterContent">
	<p>
	  {[...props.linkz.entries()].map(([link, content]) =>
	      <span key={link} className={props.currLink === link? DISABLED_CLASS: ""}>
		<Link to={link}>{content}</Link>
		<br/>
	      </span>
	  )}
	</p>
      </div>
    </div>);
}

export default Footer;
