import React, {PureComponent} from "react"
import Phaser from "phaser"
import './PhaserGame.css'
 
type PhaserGameProps = {
    isOpen: boolean,
    expandFn: () => void,
}
type PhaserGameState = {}
class PhaserGame extends PureComponent<PhaserGameProps, PhaserGameState> {
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
	)
    }
}


type PhaserGameInstanceProps = {}
type PhaserGameInstanceState = {
    displayGame: boolean
}
// Manages the lifecycle of the Phaser game game will be created when component is rendered
class PhaserGameInstance extends PureComponent<PhaserGameInstanceProps, PhaserGameInstanceState> {

    gameContent: PhaserGameContent|undefined
    timerId: number|undefined
    
    constructor(props: PhaserGameInstanceProps) {
	super(props)
	this.setDisplayGame_ = this.setDisplayGame_.bind(this)
	this.state = { displayGame: false }
    }
    
    componentDidMount() {
	this.gameContent = new PhaserGameContent(/** config= */{
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
	})
	this.timerId = window.setTimeout(this.setDisplayGame_, 300) // wait for banner transition to finish
    }

    setDisplayGame_() {
	this.setState({ displayGame: true })
    }

    componentWillUnmount() {
	clearTimeout(this.timerId)
	if (this.gameContent) {
	    this.gameContent.destroy(/** removeCanvas= */ true)
	}
    }

    render() {
	const gameDisplayClass = this.state.displayGame? "PhaserCanvasContainerOpen": "PhaserCanvasContainerClosed"
	return (<div className={gameDisplayClass} id="PhaserContainer"></div>)
    }
}


class PhaserGameContent extends Phaser.Game {}

function renderButton(isOpen: boolean, buttonClickFn: () => void) {
    return <button className="PhaserGameInitButton" onClick={buttonClickFn}>
      {isOpen? "Hide Game": "Show Game"}
    </button>
}

// create a class so we don't need to hardcode this info, as the width and height may change later
class PhaserSpriteInfo {
    uri: string
    width: number
    height: number
    key: string
    constructor(uri: string, width: number, height: number, key: string) {
	this.uri = uri
	this.width = width
	this.height = height
	this.key = key
    }
}
const KNUCKLES = new PhaserSpriteInfo("knuckles.png", 32, 40, "knuckles")

class PhaserGameScene extends Phaser.Scene {
    actualPlayer: Phaser.GameObjects.Sprite|undefined
    constructor() {
	super({
	    key: "PhaserGameScene",
	})
    }

    // can accept params passed from game via 'scene.start'
    init(/** params */) {
    }

    // caches loading assets. called when scene objects are created
    preload() {
	this.load.spritesheet(KNUCKLES.key, KNUCKLES.uri, {
	    frameWidth: KNUCKLES.width,
	    frameHeight: KNUCKLES.height,
	})
    }

    // creates main game objects. called when assets are loaded
    create() {
	this.actualPlayer = this.add.sprite(KNUCKLES.width, KNUCKLES.height, KNUCKLES.key)
    }

    update(/** time */) {
	// todo: implement per-tick behavior
    }
}

export default PhaserGame
 
