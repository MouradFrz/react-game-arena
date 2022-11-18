import React from "react";
import {Link} from "react-router-dom"
function GameIcon({gameData}) {
	return (
		<Link to={gameData.path} className="game">
			<img
				className="game-image"
				src={gameData.image}
				alt=""
			/>
			<p className="game-title">{gameData.name}</p>
		</Link>
	);
}

export default GameIcon;
