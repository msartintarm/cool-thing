import React, {Component} from "react";
import Phaser from "phaser";
import './PhaserGame.css';

 
class PhaserGame extends Component {
    render() {
	return (
	    <div className={this.props.isOpen? "PhaserGameContainerOpen": ""}>
	      <div className="PhaserGameBannerContainer">
		<p>Welcome to the Phaser game!</p>
		{renderButton(this.props.isOpen, this.props.expandFn)}
	      </div>
	      {this.props.isOpen && <PhaserGameInstance/>}
	      <p>Phaser game is currently in the preliminary stages.</p>
	    </div>
	);
    }
}


// Manages the lifecycle of the Phaser game; game will be created when component is rendered
class PhaserGameInstance extends Component {
    componentDidMount() {
	this.gameContent_ = new PhaserGameContent(/** config= */{
	    title: "PhaserGame",
	    width: 800,
	    height: 600,
	    parent: "PhaserContainer",
	    backgroundColor: "#18216D",
	    scene: [PhaserGameScene],
	    physics: {
		default: "arcade",
		arcade: {
		    debug: false,
		}
	    },
	});
    }

    componentWillUnmount() {
	this.gameContent_.destroy(/** removeCanvas= */ true);
    }

    render() {
	return (<div className="PhaserContainer" id="PhaserContainer"></div>);
    }
}


class PhaserGameContent extends Phaser.Game {}

function renderButton(isOpen, buttonClickFn) {
    return <button className="PhaserGameInitButton" onClick={buttonClickFn}>
      {isOpen? "Hide Game": "Show Game"}
    </button>;
}

class PhaserGameScene extends Phaser.Scene {
    constructor() {
	super({
	    key: "PhaserGameScene",
	});
    }

    // can accept params passed from game via 'scene.start'
    init(/** params */) {
    }

    // caches loading assets. called when scene objects are created
    preload() {
	this.load.spritesheet("knuckles", "knuckles.png", {
	    frameWidth: 32,
	    frameHeight: 40,
	});
    }

    // creates main game objects. called when assets are loaded
    create() {
	this.actualPlayer = this.add.sprite(30, 40, "knuckles");
    }

    update(/** time */) {
	// todo: implement per-tick behavior
    }
}

export default PhaserGame;
 
