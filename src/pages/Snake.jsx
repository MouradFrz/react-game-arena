import React, { useEffect, useRef, useState } from "react";
import "../assets/Snake.scss";
function Snake(props) {
	const [snake, setSnake] = useState([
		[24, 25],
		[23, 25],
	]);
	function initBestScore() {
		return parseInt(localStorage.getItem("snakeBestScore"))
			? localStorage.getItem("snakeBestScore")
			: "/";
	}
	const [bestScore, setBestScore] = useState(initBestScore);
	function generateFood() {
		return [Math.floor(Math.random() * 49), Math.floor(Math.random() * 49)];
	}

	const [direction, setDirection] = useState("down");
	const [food, setFood] = useState(generateFood());
	const [score, setScore] = useState(0);
	const [paused, setPaused] = useState(false);
	const [speed, setSpeed] = useState(100);
	const prevDirection = useRef("up");
	const prevSpeed = useRef(speed);
	const [gameState, setGameState] = useState("stopped");
	useEffect(() => {
		prevSpeed.current = speed;
	}, [speed]);
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
	const displaySnake = snake.map((el, index) => (
		<span
			className="snake-element"
			key={el.index}
			style={{
				top: el[0] * 2 + "%",
				left: el[1] * 2 + "%",
				backgroundColor: index === 0 ? "#163805" : "rgb(105, 130, 33)",
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
	function addSquare() {
		const lastElement = snake[snake.length - 1];
		const beforeLastElement = snake[snake.length - 2];
		let difference;
		if (lastElement[0] === beforeLastElement[0]) {
			difference = "horizontal";
		} else {
			difference = "vertical";
		}
		if (difference === "horizontal") {
			if (lastElement[1] > beforeLastElement[1]) {
				setSnake((prev) => [
					...prev,
					[prev[prev.length - 1][0], prev.length - 1][0] + 1,
				]);
			} else {
				setSnake((prev) => [
					...prev,
					[prev[prev.length - 1][0], prev.length - 1][0] - 1,
				]);
			}
		} else {
			if (lastElement[0] > beforeLastElement[0]) {
				setSnake((prev) => [
					...prev,
					[prev[prev.length - 1][0] + 1, prev.length - 1][0],
				]);
			} else {
				setSnake((prev) => [
					...prev,
					[prev[prev.length - 1][0] - 1, prev.length - 1][0],
				]);
			}
		}
	}
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
	}
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
	useEffect(() => {
		const handleDirectionChange = () => {
			if (!paused) {
				switch (direction) {
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
		if (gameState === "playing") {
			handleDirectionChange();
			changeInterval = setInterval(handleDirectionChange, speed);
			prevDirection.current = direction;
		} else {
			clearInterval(changeInterval);
		}
		return () => clearInterval(changeInterval);
	}, [direction, gameState, paused]);
	function togglePause() {
		if (gameState !== "playing") {
			setPaused((prev) => !prev);
			console.log(gameState);
		}
	}
	useEffect(() => {
		const touching = snake.filter((el, index) => {
			if (index !== 0) {
				return el[0] === snake[0][0] && el[1] === snake[0][1];
			}
			return false;
		}).length;
		const outOfBoard =
			snake[0][0] > 49 ||
			snake[0][0] < 0 ||
			snake[0][1] > 49 ||
			snake[0][1] < 0;
		if (touching || outOfBoard) {
			setGameState("lost");
		}
		if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
			setScore((prev) => prev + 1);
			setFood(generateFood);
			addSquare();
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
