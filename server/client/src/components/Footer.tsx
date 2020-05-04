import React, {PureComponent} from "react"
import {Link} from 'react-router-dom'
import './Footer.css'

const DISABLED_CLASS = "FooterLinkDisabled"

type FooterProps = {
    linkz: Map<string, string>,
    currLink: string,
}
export default class Footer extends PureComponent<FooterProps> {
    
    render () {
	return (
	    <div className="FooterContainer">
	      <div className="FooterSpacer"></div>
	      <div className="FooterContent">
		<p>
		  {[...this.props.linkz.entries()].map(([link, content]) =>
		      <span key={link} className={this.props.currLink === link? DISABLED_CLASS: ""}>
			<Link to={link}>{content}</Link>
			<br/>
		      </span>
		  )}
		  ©2020 Michael Sartin-Tarm - All Rights Reserved
		</p>
	      </div>
	    </div>
	)
    }
}
