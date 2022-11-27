import React, { useEffect } from "react";
import "../assets/Home.scss";
import GameIcon from "../components/GameIcon";
function Home({ games }) {
	useEffect(() => {
		document.title = "Home";
	}, []);
	const displayGames = games.map((el) => (
		<GameIcon gameData={el} key={el.id} />
	));
	return (
		<div className="homepage">
			<h1>Game arena</h1>
			<div className="gamelist">{displayGames}</div>
		</div>
	);
}

export default Home;
