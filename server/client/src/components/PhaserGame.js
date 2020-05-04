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
    constructor() {
	super();
	this.setDisplayGame_ = this.setDisplayGame_.bind(this);
	this.state = { displayGame: false };
    }
    
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
	this.timer_ = setTimeout(this.setDisplayGame_, 300); // wait for banner transition to finish
    }

    setDisplayGame_() {
	this.setState({ displayGame: true });
    }

    componentWillUnmount() {
	clearTimeout(this.timer_);
	this.gameContent_.destroy(/** removeCanvas= */ true);
    }

    render() {
	const gameDisplayClass = this.state.displayGame? "PhaserCanvasContainerOpen": "PhaserCanvasContainerClosed";
	return (<div className={gameDisplayClass} id="PhaserContainer"></div>);
    }
}


class PhaserGameContent extends Phaser.Game {}

function renderButton(isOpen, buttonClickFn) {
    return <button className="PhaserGameInitButton" onClick={buttonClickFn}>
      {isOpen? "Hide Game": "Show Game"}
    </button>;
}

// create a class so we don't need to hardcode this info, as the width and height may change later
class PhaserSpriteInfo {
    constructor(uri, width, height, key) {
	this.uri = uri;
	this.width = width;
	this.height = height;
	this.key = key;
    }
}
const KNUCKLES = new PhaserSpriteInfo("knuckles.png", 32, 40, "knuckles");

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
	this.load.spritesheet(KNUCKLES.key, KNUCKLES.uri, {
	    frameWidth: KNUCKLES.width,
	    frameHeight: KNUCKLES.height,
	});
    }

    // creates main game objects. called when assets are loaded
    create() {
	this.actualPlayer = this.add.sprite(KNUCKLES.width, KNUCKLES.height, KNUCKLES.key);
    }

    update(/** time */) {
	// todo: implement per-tick behavior
    }
}

export default PhaserGame;
 
