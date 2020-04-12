import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import './Footer.css';

const DISABLED_CLASS = "FooterLinkDisabled";

function Footer() {
    const gameClass = useRouteMatch("/game")? DISABLED_CLASS: "";
    const aboutClass = useRouteMatch("/about")? DISABLED_CLASS: "";
    const introClass = useRouteMatch("/").isExact? DISABLED_CLASS: "";

    return (
	<div className="FooterContainer">
	  <div className="FooterSpacer"></div>
	  <div className="FooterContent">
	    <p>
	      {renderLink("/", introClass, "Check out the intro")}
	      <br/>
	      {renderLink("/game", gameClass, "Check out the game")}
	      <br/>
	      {renderLink("/about", aboutClass, "About the site")}
	    </p>
	  </div>
	</div>
    );
}

function renderLink(uri, cssClass, content) {
    return <span className={cssClass}>
      <Link to={uri}>{content}</Link>
    </span>;
}

export default Footer;
