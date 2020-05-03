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

// This is a wrapper class (basically chrome) which wraps the page
// It positions 9 images as borders. basically 9-slice scaling: https://en.wikipedia.org/wiki/9-slice_scaling
// It smoothly shrinks the images when the provided scale shrinks from the initial value
class Wrapper extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    initialScale: props.scale,
	    initialImageDimensions: undefined,
	    imgDim: new Array(9).fill([]),
	};
	this.imageLoadsLeft_ = 9;
	this.checkIfImagesHaveLoaded_ = this.checkIfImagesHaveLoaded_.bind(this);
    }
    
    render() {
	return (
	    <div className="Wrapper">

	      <div className="WrapperBackground">
		{/* order of the imgDim array doesn't matter */}
		{this.renderWrapperSection([Scroll1, Scroll2, Scroll3], this.state.imgDim.slice(0,3))}
		{this.renderWrapperSection([Scroll7, Scroll8, Scroll9], this.state.imgDim.slice(3,6), /** repeat= */ true)}
		{this.renderWrapperSection([Scroll4, Scroll5, Scroll6], this.state.imgDim.slice(6,9))}
	      </div>

	      <div className="WrapperContent">
		<div className="WrapperTitle">{this.props.title}</div>
		<div className="WrapperParag">{this.props.content1}</div>
	      </div>
	    </div>
	);
    }

    renderWrapperSection([sectionL, sectionCenter, sectionR], [sizeL, sizeC, sizeR], repeat=false) {
	// don't apply height to portion which repeats vertically
	const [appliedSizeL, appliedSizeC, appliedSizeR] = [sizeL, sizeC, sizeR].map(
	    ([x, y]) => [x, (repeat? "": y)]
	);
    
	return <div className={`WrapperSection${repeat? " WrapperRepeat": ""}`}>
	  {this.renderWrapperBannerImage(sectionL, appliedSizeL)}
	  {this.renderWrapperBannerImage(sectionCenter,  appliedSizeC, /** repeat= */ true)}
	  {this.renderWrapperBannerImage(sectionR, appliedSizeR)}
	</div>;
    }
    
    renderWrapperBannerImage(content, [sizeX, sizeY], repeat=false) {
	// don't apply width to portion which repeats horizontally
	const appliedX = repeat? "": sizeX;
	return <img className={`${IMAGE_CLASS}${repeat? " WrapperRepeat": ""}`}
	alt=""
	src={content}
	width={appliedX}
	height={sizeY}
	onLoad={this.checkIfImagesHaveLoaded_}
	/>;
    }

    componentDidUpdate(prevProps) {
	if (this.props.scale === prevProps.scale) {
	    return;
	}

	return (this.props.scale !== this.state.initialScale)?
	       this.shrinkSelf(this.props.scale / this.state.initialScale):
	       this.unshrinkSelf();
    }

    checkIfImagesHaveLoaded_() {
	this.imageLoadsLeft_ -= 1;
	if (this.imageLoadsLeft_ === 0) {
	    this.setInitialImageSizes();
	}
    }
    
    // collect initial dimensions of images and set them on the DOM so they can
    // be animated when they change
    setInitialImageSizes(newScale) {
	const initialDimensions = getImageDimensions([...document.getElementsByClassName(IMAGE_CLASS)]);
	this.setState({
	    initialImageDimensions: initialDimensions,
	    imgDim: initialDimensions,
	});
    }
    
    // collects initial dimensions of images. sets new dimensions
    shrinkSelf(newScale) {
	this.setState({
	    imgDim: scaleDimensions(this.state.initialImageDimensions, newScale),
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


export default Wrapper;
