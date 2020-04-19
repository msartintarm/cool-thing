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

const IMAGE_CLASS = "WrapperBanner";

class Wrapper extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    initialImageDimensions: undefined,
	    imgDim: [[],[],[],[],[],[],[],[],[],[],[],[]],
	    scale: 1
	};
	this.imageEls_ = [];
    }
    
    render() {
	console.log("Con");
	console.log(JSON.stringify(this.state.imgDim));
	return (
	    <div className="Wrapper">

	      <div className="WrapperBackground">
		{/* order of the imgDim array doesn't matter */}
		{WrapperSection([Scroll1, Scroll2, Scroll3], this.state.imgDim.slice(0,3))}
		{WrapperSection([Scroll7, Scroll8, Scroll9], this.state.imgDim.slice(3,6), /** repeat= */ true)}
		{WrapperSection([Scroll4, Scroll5, Scroll6], this.state.imgDim.slice(6,9))}
	      </div>

	      <div className="WrapperContent">
		<div className="WrapperTitle">{this.props.title}</div>
		<div className="WrapperParag">{this.props.content1}</div>
	      </div>
	    </div>
	);
    }

	componentDidMount() {
	    this.imageEls_ = [...document.getElementsByClassName(IMAGE_CLASS)];
	}

    componentDidUpdate(prevProps) {
	if (this.props.scale === prevProps.scale) {
	    return;
	}

	return (this.props.scale !== 1)?
	       this.shrinkSelf(this.props.scale):
	       this.unshrinkSelf();
    }
    
    // collects initial dimensions of images. sets new dimensions
    shrinkSelf(newScale) {
	const initialDimensions = this.state.initialImageDimensions
			       || getImageDimensions(this.imageEls_);
	console.log("INITIALNEW");
	console.log(JSON.stringify(initialDimensions));
	const newDimensions = scaleDimensions(initialDimensions, newScale);
	console.log(JSON.stringify(newDimensions));
	
	this.setState({
	    initialImageDimensions: initialDimensions,
	    imgDim: newDimensions,
	});
    }

    unshrinkSelf() {
	this.setState({
	    imgDim: this.state.initialImageDimensions,
	});
    }

}    

function getImageDimensions(imgEls) {
    return imgEls.map((imgEl) => [
	imgEl.naturalWidth,
	imgEl.naturalHeight
    ]);
}

function scaleDimensions(dimensions, scale) {
    return dimensions.map(([x,y]) => [x * scale, y * scale]);
}

function WrapperSection([sectionL, sectionCenter, sectionR], [sizeL, sizeC, sizeR], repeat=false) {
    // don't apply height to the portion of the banner which repeats vertically
    const [appliedSizeL, appliedSizeC, appliedSizeR] = [sizeL, sizeC, sizeR].map(
	([x, y]) => [x, (repeat? "": y)]
    );
    
    return <div className={`WrapperSection${repeat? " WrapperRepeat": ""}`}>
      {WrapperBannerImage(sectionL, appliedSizeL)}
      {WrapperBannerImage(sectionCenter,  appliedSizeC, /** repeat= */ true)}
      {WrapperBannerImage(sectionR, appliedSizeR)}
    </div>;
}

function WrapperBannerImage(content, [sizeX, sizeY], repeat=false) {
    const appliedX = repeat? "": sizeX;
    return <img className={`${IMAGE_CLASS}${repeat? " WrapperRepeat": ""}`}
		alt=""
		src={content}
		width={appliedX}
		height={sizeY}
    />;
}

export default Wrapper;
