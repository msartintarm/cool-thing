import React, {Component} from "react";
import Unity, {UnityContent} from "react-unity-webgl";

const unityContent = new UnityContent(
    "unity/web_build.json",
    "unity/UnityLoader.js"
); 
 
class Game extends Component {

    constructor(props) {
	super(props);
	this.state = {gameIsOpen: false};
	this.changeGameOpenStateOnClick = this.changeGameOpenStateOnClick.bind(this);
    }

    changeGameOpenStateOnClick() {
	this.setState({gameIsOpen: !this.state.gameIsOpen});
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

    renderButton() {
	const buttonText = this.state.gameIsOpen? "Hide Game": "Show Game";
	return <button onClick={this.changeGameOpenStateOnClick}>
	  {buttonText}
	</button>;
    }

    renderGame() {
	return <div>
	  <Unity unityContent={unityContent} />
	</div>;
    }
}

export default Game;
