import { useState } from "react";
import { useRoutes } from "react-router-dom";
import GameLayout from "./layouts/GameLayout";
import Home from "./pages/Home";
import Tenzies from "./pages/Tenzies";
import XO from "./pages/XO";
import Snake from "./pages/Snake";
import TenziesImage from "/public/game-images/tenzi.jpg";
import SnakeImage from "/public/game-images/snake.jpg";
import XOImage from "/public/game-images/xo.png";
function App() {
	const Games = [
		{
			name: "Tenzies",
			path: "/tenzies",
			image: TenziesImage,
			id: 0,
		},
		{
			name: "Snake Game",
			path: "/snake",
			image: SnakeImage,
			id: 1,
		},
		{
			name: "XO",
			path:"/x-o",
			image: XOImage,
			id:2,
		}
	];
	const myRoutes = useRoutes([
		{
			element: <GameLayout />,
			children: [
				{
					path: "",
					element: <Home games={Games} />,
				},
				{
					path: "/tenzies",
					element: <Tenzies />,
				},
				{
					path: "/snake",
					element: <Snake />,
				},
				{
					path: "/x-o",
					element: <XO />,
				},
			],
		},
	]);

	return <>{myRoutes}</>;
}

export default App;
