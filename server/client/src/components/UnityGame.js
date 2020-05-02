import React, {Component} from "react";
import Unity, {UnityContent} from "react-unity-webgl";
import './UnityGame.css';

const unityContent = new UnityContent(
    "unity/web_build.json",
    "unity/UnityLoader.js"
); 
 
class UnityGame extends Component {

    render() {
	return (
	    <div className={this.props.isOpen? "UnityGameContainerOpen": ""}>
	    <div className="UnityGameBannerContainer">
	      <p>Welcome to the game!</p>
	    {renderButton(this.props.isOpen, this.props.expandFn)}
	    </div>
	    {this.props.isOpen && renderGame()}
	      <p>This is a short demo written in Unity and compiled to WebAssembly.</p>
	      <p>Control "5" using the arrow keys, get the dollar bill, and use your mighty scissors to push the creeps off the edge! To be continued...</p>
	    </div>
	);
    }

    componentWillUnmount() {
	unityContent.remove();
    }
}

function renderButton(isOpen, buttonClickFn) {
    const buttonText = isOpen? "Hide Game": "Show Game";
    return <button className="UnityGameInitButton" onClick={buttonClickFn}>
      {buttonText}
    </button>;
}

function renderGame() {
    return <div className="UnityContainer">
      <Unity unityContent={unityContent} />
    </div>;
}

export default UnityGame;
 
