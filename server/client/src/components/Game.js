import React, {Component} from "react";
import Unity, {UnityContent} from "react-unity-webgl";
import './Game.css';

const unityContent = new UnityContent(
    "unity/web_build.json",
    "unity/UnityLoader.js"
); 
 
class Game extends Component {

    render() {
	return (
	    <div className={this.props.isOpen? "GameContainerOpen": ""}>
	    <div className="GameBannerContainer">
	    <span className="GameDescription">Welcome to the game!</span>
	    {renderButton(this.props.isOpen, this.props.expandFn)}
	    </div>
	    {this.props.isOpen && renderGame()}
	    </div>
	);
    }
}

function renderButton(isOpen, buttonClickFn) {
    const buttonText = isOpen? "Hide Game": "Show Game";
    return <button className="GameInitButton" onClick={buttonClickFn}>
      {buttonText}
    </button>;
}

function renderGame() {
    return <div className="UnityContainer">
      <Unity unityContent={unityContent} />
    </div>;
}

export default Game;
 
