import React, {Component} from "react";
import Unity, {UnityContent} from "react-unity-webgl";

const unityContent = new UnityContent(
    "unity/web_build.json",
    "unity/UnityLoader.js"
); 
 
class Game extends Component {

    render() {
	return (
	    <div>
	      <p>This is the cool game!</p>
	      {renderButton(this.props.isOpen, this.props.expandFn)}
	      {this.props.isOpen && renderGame()}
	    </div>
	);
    }

}

function renderButton(isOpen, buttonClickFn) {
    const buttonText = isOpen? "Hide Game": "Show Game";
    return <button onClick={buttonClickFn}>
      {buttonText}
    </button>;
}

function renderGame() {
    return <div>
      <Unity unityContent={unityContent} />
    </div>;
}

export default Game;
 
