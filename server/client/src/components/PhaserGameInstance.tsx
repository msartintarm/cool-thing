import React, {PureComponent} from "react"
import Phaser from "phaser"
 

type PhaserGameInstanceProps = {}
type PhaserGameInstanceState = {
    displayGame: boolean
}
// Manages the lifecycle of the Phaser game game will be created when component is rendered
export default class PhaserGameInstance extends PureComponent<PhaserGameInstanceProps, PhaserGameInstanceState> {

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

// create a class so we don't need to hardcode this info, as the width and height may change later
type PhaserSpriteInfo = {
    uri: string
    width: number
    height: number
    key: string
}

const KNUCKLES: PhaserSpriteInfo = ({
    uri: "knuckles.png",
    width: 32,
    height: 40,
    key: "knuckles",
})

class PhaserGameScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite|undefined
    cursors: Phaser.Types.Input.Keyboard.CursorKeys|undefined
    snakePlayer: SnakePlayer|undefined
    constructor() {
	super({
	    key: "PhaserGameScene"
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
	this.player = this.physics.add.sprite(KNUCKLES.width, KNUCKLES.height, KNUCKLES.key)
	this.cursors = this.input.keyboard.createCursorKeys()
	this.snakePlayer = new SnakePlayer(this.add.group(), 23, 34);
    }

    update(/** time */) {
	if (!this.cursors || !this.cursors.left || !this.cursors.right || !this.cursors.up || !this.cursors.down || !this.player) {
	    return
	}
	if (this.cursors.left.isDown) {
	    this.player.setVelocityX(-160)
	}
	else if (this.cursors.right.isDown) {
	    this.player.setVelocityX(160)
	} else {
	    this.player.setVelocityX(0)
	}
	if (this.cursors.up.isDown && !this.player.body.touching.up) {
	    this.player.setVelocityY(-330)
	} else if (this.cursors.down.isDown && !this.player.body.touching.down) {
	    this.player.setVelocityY(330)
	} else {
	    this.player.setVelocityY(0)
	}
    }
}

const SNAKE_STEP = 16

class SnakePlayer {
    headPos: Phaser.Geom.Point
    body: Phaser.GameObjects.Group
    head: Phaser.GameObjects.Group
    constructor(group: Phaser.GameObjects.Group, x: number, y: number) {
	this.headPos = new Phaser.Geom.Point(x, y)
	this.body = group
	this.head = this.body.create(x * SNAKE_STEP, y * SNAKE_STEP, KNUCKLES.key)
	this.head.setOrigin(0)
   }

}
