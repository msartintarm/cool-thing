import React, {PureComponent} from "react"
import PhaserGameInstance from "./PhaserGameInstance"
import './PhaserGame.css'
 
type PhaserGameProps = {
    isOpen: boolean
    expandFn: () => void
}
type PhaserGameState = {}
export default class PhaserGame extends PureComponent<PhaserGameProps, PhaserGameState> {
    render() {
	return (
	    <div className={this.props.isOpen? "PhaserGameContainerOpen": ""}>
	      <div className="PhaserGameBannerContainer">
		<p>Welcome to the Phaser game!</p>
		<button className="PhaserGameInitButton" onClick={this.props.expandFn}>
		  {this.props.isOpen? "Hide Game": "Show Game"}
		</button>
	      </div>
	      {this.props.isOpen && <PhaserGameInstance/>}
	      <p>Phaser game is currently in the preliminary stages.</p>
	    </div>
	)
    }
}
