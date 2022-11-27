import React, { useEffect, useRef, useState } from "react";
import "../assets/Snake.scss";
//Utility functions ---------------------------------------------------------------
function initBestScore() {
	return parseInt(localStorage.getItem("snakeBestScore"))
		? localStorage.getItem("snakeBestScore")
		: "/";
}
function generateFood() {
	return [Math.floor(Math.random() * 49), Math.floor(Math.random() * 49)];
}

function Snake(props) {
	useEffect(()=>{
		document.title="Snake"
	},[])
	const [snake, setSnake] = useState([
		[24, 25],
		[23, 25],
	]);
	//State and refs initializations
	const [bestScore, setBestScore] = useState(initBestScore);
	const [direction, setDirection] = useState("down");
	const [food, setFood] = useState(generateFood());
	const [score, setScore] = useState(0);
	const [paused, setPaused] = useState(false);
	const [speed, setSpeed] = useState(100);
	const [gameState, setGameState] = useState("stopped");
	const prevDirection = useRef("up");
	// Edit the difficulty
	function editDifficulty(level) {
		switch (level) {
			case "easy":
				setSpeed(100);
				return;
			case "medium":
				setSpeed(80);
				return;
			case "hard":
				setSpeed(50);
				return;
			case "impossible":
				setSpeed(30);
				return;
			default:
				return;
		}
	}
	//setting the best score each time the user loses a game
	useEffect(() => {
		if (gameState === "lost") {
			setBestScore((old) => {
				if (
					!parseInt(localStorage.getItem("snakeBestScore")) ||
					score > parseInt(localStorage.getItem("snakeBestScore"))
				) {
					localStorage.setItem("snakeBestScore", score);
					return score;
				}
				return old;
			});
		}
	}, [gameState]);
	//displaying the snake cells
	const displaySnake = snake.map((el, index) => (
		<span
			className="snake-element"
			key={index}
			style={{
				top: el[0] * 2 + "%",
				left: el[1] * 2 + "%",
				background:
				index===0 ? "linear-gradient(0deg, #163805 0%, #163805 71%)" :
					index === 1 && direction === "up"
						? "linear-gradient(0deg, rgba(78,106,24,1) 0%, rgba(22,56,5,1) 71%)"
						: index === 1 && direction === "down"
						? "linear-gradient(180deg, rgba(78,106,24,1) 0%, rgba(22,56,5,1) 71%)"
						: index === 1 && direction === "left"
						? "linear-gradient(270deg, rgba(78,106,24,1) 0%, rgba(22,56,5,1) 71%)"
						: index === 1 && direction === "right"
						? "linear-gradient(90deg, rgba(78,106,24,1) 0%, rgba(22,56,5,1) 71%)"
						: "linear-gradient(0deg, rgba(78,106,24,1) 0%, rgba(78,106,24,1) 71%)" ,
				borderRadius:
					!index && direction === "up"
						? "50% 50% 0 0"
						: !index && direction === "down"
						? " 0 0 50% 50%"
						: !index && direction === "left"
						? "50% 0 0 50% "
						: !index && direction === "right"
						? " 0  50% 50% 0"
						: "",
			}}
		></span>
	));
	//Adding a square when the first snake cell meets a food cell
	function addSquare() {
		setSnake((prev) => {
			if (prev[prev.length - 1][0] === prev[prev.length - 2][0]) {
				if (prev[prev.length - 1][1] > prev[prev.length - 2][1]) {
					return [
						...prev,
						[prev[prev.length - 1][0], prev[prev.length - 1][1] + 1],
					];
				} else {
					return [
						...prev,
						[prev[prev.length - 1][0], prev[prev.length - 1][1] - 1],
					];
				}
			} else {
				if (prev[prev.length - 1][0] > prev[prev.length - 2][0]) {
					return [
						...prev,
						[prev[prev.length - 1][0] + 1, prev[prev.length - 1][1]],
					];
				} else {
					return [
						...prev,
						[prev[prev.length - 1][0] - 1, prev[prev.length - 1][1]],
					];
				}
			}
		});
	}
	//Staring a new game
	function restartGame() {
		setSnake([
			[24, 25],
			[23, 25],
		]);
		prevDirection.current = "up";
		setDirection("down");
		setScore(0);
		setGameState("playing");
		setPaused(false);
		setFood(generateFood())
	}
	//Binding the keys
	useEffect(() => {
		function handleKeyPress(ev) {
			if (ev.isComposing || ev.keyCode === 40) {
				prevDirection.current !== "up" && setDirection("down");
			}
			if (ev.isComposing || ev.keyCode === 38) {
				prevDirection.current !== "down" && setDirection("up");
			}
			if (ev.isComposing || ev.keyCode === 37) {
				prevDirection.current !== "right" && setDirection("left");
			}
			if (ev.isComposing || ev.keyCode === 39) {
				prevDirection.current !== "left" && setDirection("right");
			}
			if (ev.isComposing || ev.keyCode === 32) {
				togglePause();
			}
		}
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);
	let changeInterval;
	//The function that makes the snake move and refresh every second
	useEffect(() => {
		const handleDirectionChange = () => {
			if (!paused) {
				//makes sure the game isnt paused to move the snake
				switch (
					direction //which direction to move the snake
				) {
					case "right":
						setSnake((old) => {
							const newSnake = [];
							old.forEach((el, i) => {
								i === 0
									? newSnake.push([el[0], el[1] + 1])
									: newSnake.push([old[i - 1][0], old[i - 1][1]]);
							});
							return newSnake;
						});
						break;
					case "left":
						setSnake((old) => {
							const newSnake = [];
							old.forEach((el, i) => {
								i === 0
									? newSnake.push([el[0], el[1] - 1])
									: newSnake.push([old[i - 1][0], old[i - 1][1]]);
							});
							return newSnake;
						});
						break;
					case "up":
						setSnake((old) => {
							const newSnake = [];
							old.forEach((el, i) => {
								i === 0
									? newSnake.push([el[0] - 1, el[1]])
									: newSnake.push([old[i - 1][0], old[i - 1][1]]);
							});
							return newSnake;
						});
						break;
					case "down":
						setSnake((old) => {
							const newSnake = [];
							old.forEach((el, i) => {
								i === 0
									? newSnake.push([el[0] + 1, el[1]])
									: newSnake.push([old[i - 1][0], old[i - 1][1]]);
							});
							return newSnake;
						});
						break;
					default:
						return;
				}
			}
		};
		//Clears the setInterval when the game ends and starts it when it starts
		if (gameState === "playing") {
			handleDirectionChange();
			changeInterval = setInterval(handleDirectionChange, speed);
			prevDirection.current = direction;
		} else {
			clearInterval(changeInterval);
		}
		return () => clearInterval(changeInterval);
	}, [direction, gameState, paused]);
	//Pausing unpausing the game
	function togglePause() {
		if (gameState !== "playing") {
			setPaused((prev) => !prev);
		}
	}
	//Checks if user lost (Hit himself or a border) on every snake movement
	useEffect(() => {
		const touching = snake.filter((el, index) => {
			return index !== 0
				? el[0] === snake[0][0] && el[1] === snake[0][1]
				: false;
		}).length;
		const outOfBoard =
			snake[0][0] > 49 ||
			snake[0][0] < 0 ||
			snake[0][1] > 49 ||
			snake[0][1] < 0;
		(touching || outOfBoard) && setGameState("lost");
		//Eating the food
		if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
			addSquare();
			setScore((prev) => prev + 1);
			setFood(generateFood);
		}
	}, [snake]);

	return gameState === "playing" ? (
		<div className="snake-board">
			{paused && (
				<div className="overlay">
					<span className="paused-sign"></span>
					<span className="paused-sign"></span>
				</div>
			)}
			<p className="score-display">Score : {score}</p>
			<span
				className="food"
				style={{ top: food[0] * 2 + "%", left: food[1] * 2 + "%" }}
			></span>
			{displaySnake}
		</div>
	) : (
		<div>
			<div className="snake-menu">
				{score ? <p>You lost! Score: {score}</p> : ""}
				<h1>Snake Game</h1>
				<p>Highest score: {bestScore}</p>
				<button onClick={restartGame} className="new-game-button">
					Start a new game
				</button>
				<p style={{ marginBottom: "60px" }}>
					<button
						className={
							speed === 100 ? "difficulty-button active" : "difficulty-button"
						}
						onClick={() => editDifficulty("easy")}
					>
						Easy
					</button>
					<button
						className={
							speed === 80 ? "difficulty-button active" : "difficulty-button"
						}
						onClick={() => editDifficulty("medium")}
					>
						Meduim
					</button>
					<button
						className={
							speed === 50 ? "difficulty-button active" : "difficulty-button"
						}
						onClick={() => editDifficulty("hard")}
					>
						Hard
					</button>
					<button
						className={
							speed === 30 ? "difficulty-button active" : "difficulty-button"
						}
						onClick={() => editDifficulty("impossible")}
					>
						Impossible
					</button>
				</p>
			</div>
		</div>
	);
}

export default Snake;
