import React, {Component} from "react";

import './Wrapper.css';
import Scroll1 from './scrollz/scroll1.png';
import Scroll2 from './scrollz/scroll2.png';
import Scroll3 from './scrollz/scroll3.png';
import Scroll4 from './scrollz/scroll4.png';
import Scroll5 from './scrollz/scroll5.png';
import Scroll6 from './scrollz/scroll6.png';
import Scroll7 from './scrollz/scroll7.png';
import Scroll8 from './scrollz/scroll8.png';
import Scroll9 from './scrollz/scroll9.png';
// import Scroll10 from './scrollz/scroll10.png';
// import Scroll11 from './scrollz/scroll11.png';
// import Scroll12 from './scrollz/scroll12.png';

class Wrapper extends Component {
    render() {
	return (
	    <div className="Wrapper">

	      <div className="WrapperBackground">
		{WrapperSection(Scroll1, Scroll2, Scroll3)}
		{WrapperSection(Scroll7, Scroll8, Scroll9, " WrapperScroll")}
		{WrapperSection(Scroll4, Scroll5, Scroll6)}
	      </div>

	      <div className="WrapperContent">
		<div className="WrapperTitle">{this.props.title}</div>
		<div className="WrapperParag">{this.props.content1}</div>
	      </div>
	    </div>
	);
    }
}
//	    {WrapperSection(Scroll7, Scroll8, Scroll9)}
//	    {WrapperSection(Scroll10, Scroll11, Scroll12)}

function WrapperSection(sectionL, sectionCenter, sectionR, extraClasses="") {
    return <div className={`WrapperSection${extraClasses}`}>
      {WrapperBannerImage(sectionL)}
      {WrapperBannerImage(sectionCenter, " WrapperScroll")}
      {WrapperBannerImage(sectionR)}
    </div>;
}

function WrapperBannerImage(content, extraClasses="") {
    return <img className={`WrapperBanner${extraClasses}`}
		alt=""
		src={content}
    />;
}

export default Wrapper;
