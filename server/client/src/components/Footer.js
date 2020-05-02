import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import './Footer.css';

const DISABLED_CLASS = "FooterLinkDisabled";

function Footer(props) {

    const routeMatchMap = new Map([
	["/", useRouteMatch("/").isExact],
	["/about", useRouteMatch("/about")],
	["/game", useRouteMatch("/game")],
    ]);
    
    return (
    <div className="FooterContainer">
      <div className="FooterSpacer"></div>
      <div className="FooterContent">
	<p>
	  {[...props.linkz.entries()].map(([content, uri]) =>
	      <span key={uri} className={routeMatchMap[uri]? DISABLED_CLASS: ""}>
		<Link to={uri}>{content}</Link>
		<br/>
	      </span>
	  )}
	</p>
      </div>
    </div>);
}

export default Footer;
