import React, {PureComponent} from "react"
import Unity, {UnityContent} from "react-unity-webgl"
import './UnityGame.css'

type UnityPropsType = {
    isOpen: boolean
    expandFn: () => void
}
type UnityStateType = {}
export default class UnityGame extends PureComponent<UnityPropsType, UnityStateType> {
    unityContent: UnityContent
    constructor(props: UnityPropsType) {
	super(props)
	this.unityContent = new UnityContent(
	    "unity/web_build.json",
	    "unity/UnityLoader.js",
	)
    }

    render() {
	return (
	    <div className={this.props.isOpen? "UnityGameContainerOpen": ""}>
	    <div className="UnityGameBannerContainer">
	      <p>Welcome to the game!</p>
	    {renderButton(this.props.isOpen, this.props.expandFn)}
	    </div>
	    {this.props.isOpen && renderGame(this.unityContent)}
	      <p>This is a short demo written in Unity and compiled to WebAssembly.</p>
	      <p>Control "5" using the arrow keys, get the dollar bill, and use your mighty scissors to push the creeps off the edge! To be continued...</p>
	    </div>
	)
    }

    componentWillUnmount() {
	this.unityContent.remove()
    }
}

function renderButton(isOpen: boolean, buttonClickFn: () => void) {
    const buttonText = isOpen? "Hide Game": "Show Game"
    return <button className="UnityGameInitButton" onClick={buttonClickFn}>
      {buttonText}
    </button>
}

function renderGame(unityContent: UnityContent) {
    return <div className="UnityContainer">
      <Unity unityContent={unityContent} />
    </div>
}
