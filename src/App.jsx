import { useState } from "react";
import { useRoutes } from "react-router-dom";
import GameLayout from "./layouts/GameLayout";
import Home from "./pages/Home";
import Tenzies from "./pages/Tenzies";
import XO from "./pages/XO";
import Snake from "./pages/Snake";
import CandyCrush from "./pages/CandyCrush";
import Tetris from "./pages/Tetris";
import TenziesImage from "/game-images/tenzi.jpg";
import SnakeImage from "/game-images/snake.jpg";
import XOImage from "/game-images/xo.png";
import CandyCrushImage from "/game-images/candy-crush.webp";
import TetrisImage from "/game-images/Tetris-icon.png";
import WordleImage from "/game-images/wordle.png";
import Wordle from "./pages/Wordle";
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
			path: "/x-o",
			image: XOImage,
			id: 2,
		},
		{
			name: "Candy Crush",
			path: "/candy-crush",
			image: CandyCrushImage,
			id: 3,
		},
		{
			name: "Tetris",
			path: "/tetris",
			image: TetrisImage,
			id: 4,
		},
		{
			name: "Wordle",
			path: "/wordle",
			image: WordleImage,
			id: 5,
		},
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
				{
					path: "/candy-crush",
					element: <CandyCrush />,
				},
				{
					path: "/tetris",
					element: <Tetris />,
				},
				{
					path: "/wordle",
					element: <Wordle />,
				},
			],
		},
	]);

	return <>{myRoutes}</>;
}

export default App;
