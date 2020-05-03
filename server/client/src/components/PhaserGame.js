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
    constructor(props) {
	super(props);
    }

    componentDidMount() {
	this.gameContent_ = new PhaserGameContent({
	    title: "Starfall",
	    width: 800,
	    height: 600,
	    parent: "PhaserContainer",
	    backgroundColor: "#18216D",
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

export default PhaserGame;
 
