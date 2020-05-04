import React, {PureComponent} from "react"

import './Wrapper.css'
import Scroll1 from './scrollz/scroll1.png'
import Scroll2 from './scrollz/scroll2.png'
import Scroll3 from './scrollz/scroll3.png'
import Scroll4 from './scrollz/scroll4.png'
import Scroll5 from './scrollz/scroll5.png'
import Scroll6 from './scrollz/scroll6.png'
import Scroll7 from './scrollz/scroll7.png'
import Scroll8 from './scrollz/scroll8.png'
import Scroll9 from './scrollz/scroll9.png'
// import Scroll10 from './scrollz/scroll10.png'
// import Scroll11 from './scrollz/scroll11.png'
// import Scroll12 from './scrollz/scroll12.png'

const IMAGE_CLASS = "WrapperBanner"

type Dimension = number[]
type Dimensions = Dimension[]

type WrapperProps = {
    scale: number
    title: any // React.Fragment
    content1: any //React.Fragment
}
type WrapperState = {
    initialScale: number
    initialImageDimensions: undefined|Array<Array<number>>
    imgDim: Dimensions
}
// This is a wrapper class (basically chrome) which wraps the page
// It positions 9 images as borders. basically 9-slice scaling: https://en.wikipedia.org/wiki/9-slice_scaling
// It smoothly shrinks the images when the provided scale shrinks from the initial value
export default class Wrapper extends PureComponent<WrapperProps, WrapperState> {
    imageLoadsLeft: number
    constructor(props: WrapperProps) {
	super(props)
	this.state = {
	    initialScale: props.scale,
	    initialImageDimensions: undefined,
	    imgDim: new Array(9).fill([]),
	}
	this.imageLoadsLeft = 9
	this.checkIfImagesHaveLoaded = this.checkIfImagesHaveLoaded.bind(this)
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
	)
    }

    renderWrapperSection([contentL, contentCenter, contentR]: string[], [sizeL, sizeC, sizeR]: Dimensions, repeat=false) {
	// don't apply height to portion which repeats vertically
	const [appliedSizeL, appliedSizeC, appliedSizeR]: Dimensions = [sizeL, sizeC, sizeR].map(
	    ([x, y]) => [x, (repeat? 0: y)]
	)
    
	return <div className={`WrapperSection${repeat? " WrapperRepeat": ""}`}>
	  {this.renderWrapperBannerImage(contentL, appliedSizeL)}
	  {this.renderWrapperBannerImage(contentCenter,  appliedSizeC, /** repeat= */ true)}
	  {this.renderWrapperBannerImage(contentR, appliedSizeR)}
	</div>
    }
    
    renderWrapperBannerImage(content: string, [sizeX, sizeY]: Dimension, repeat=false) {
	// don't apply width to portion which repeats horizontally
	const appliedX = repeat? 0: sizeX
	return <img className={`${IMAGE_CLASS}${repeat? " WrapperRepeat": ""}`}
	style={{width: appliedX || "", height: sizeY || ""}}
	alt=""
	src={content}
	onLoad={this.checkIfImagesHaveLoaded}
	/>
    }

    componentDidUpdate(prevProps: WrapperProps) {
	if (this.props.scale === prevProps.scale) {
	    return
	}

	return (this.props.scale !== this.state.initialScale)?
	       this.shrinkSelf(this.props.scale / this.state.initialScale):
	       this.unshrinkSelf()
    }

    private checkIfImagesHaveLoaded() {
	this.imageLoadsLeft -= 1
	if (this.imageLoadsLeft === 0) {
	    this.setInitialImageSizes()
	}
    }
    
    // collect initial dimensions of images and set them on the DOM so they can
    // be animated when they change
    private setInitialImageSizes() {
	const initialDimensions = getImageDimensions()
	this.setState({
	    initialImageDimensions: initialDimensions,
	    imgDim: initialDimensions,
	})
    }
    
    // collects initial dimensions of images. sets new dimensions
    shrinkSelf(newScale: number) {
	if (!this.state.initialImageDimensions) {
	    return
	}
	this.setState({
	    imgDim: scaleDimensions(this.state.initialImageDimensions, newScale),
	})
    }

    unshrinkSelf() {
	if (!this.state.initialImageDimensions) {
	    return
	}
	this.setState({
	    imgDim: this.state.initialImageDimensions,
	})
    }

}    

function getImageDimensions(): Dimensions {
    return [...document.getElementsByClassName(IMAGE_CLASS)].map(
	(imageEl) => [
	    (imageEl as HTMLImageElement).naturalWidth,
	    (imageEl as HTMLImageElement).naturalHeight,
	])
}

function scaleDimensions(dimensions: Dimensions, scale: number) {
    return dimensions.map(([x,y]) => [x * scale, y * scale])
}
