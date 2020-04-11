import React, {Component} from "react";
import Unity, {UnityContent} from "react-unity-webgl";

const unityContent = new UnityContent(
    "src/unity/web_build.json",
    "src/unity/UnityLoader.js"
); 
 
class Game extends Component {

    constructor(props) {
	super(props);
	this.state = {gameIsOpen: false};
    }

    render() {
	return (
		<div>
		<p>This is the cool game!</p>
		{this.renderButton()}
	    {this.state.gameIsOpen && this.renderGame()}
	    </div>
	);
    }

    changeGameOpenStateOnClick() {
	this.setState({gameIsOpen: !this.state.gameIsOpen});
    }
    
    renderButton() {
	const buttonText = this.state.gameIsOpen? "Hide Game": "Show Game";
	return <button onClick={this.changeGameOpenStateOnClick.bind(this)}>
	    {buttonText}
	</button>;
    }

    renderGame() {
	return <Unity unityContent={unityContent} />;
    }
}

export default Game;
