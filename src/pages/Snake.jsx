import React, { useEffect, useRef, useState } from "react";
import "../assets/Snake.scss";
function Snake(props) {
	const [snake, setSnake] = useState([
		[24, 25],
		[23, 25],
		[22, 25],
		[21, 25],
		[20, 25],
		[19, 25],
	]);
	function generateFood() {
		return [Math.floor(Math.random() * 49), Math.floor(Math.random() * 49)];
	}
	const [direction, setDirection] = useState("down");
	const [food, setFood] = useState(generateFood());
	const [score, setScore] = useState(0);
	const prevDirection = useRef("up");
	const [gameState, setGameState] = useState("playing");
	const displaySnake = snake.map((el, index, array) => (
		<span
			className="snake-element"
			style={{
				top: el[0] * 2 + "%",
				left: el[1] * 2 + "%",
				backgroundColor: index === array.length - 1 ? "Red" : "black",
			}}
		></span>
	));
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
					[prev[prev.length-1][0] + 1, prev.length-1][0],
				]);
			} else {
				setSnake((prev) => [
					...prev,
					[prev[prev.length-1][0] - 1, prev.length-1][0],
				]);
			}
		}
	}
	function restartGame() {
		setSnake([
			[24, 25],
			[23, 25],
			[22, 25],
			[21, 25],
			[20, 25],
			[19, 25],
		]);
		prevDirection.current = "up";
		setDirection("down");
		setScore(0);
		setGameState("playing");
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
		}
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);
	let changeInterval;
	useEffect(() => {
		const handleDirectionChange = () => {
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
		};
		if (gameState === "playing") {
			handleDirectionChange();
			changeInterval = setInterval(handleDirectionChange, 40);
			prevDirection.current = direction;
		} else {
			clearInterval(changeInterval);
		}
		return () => clearInterval(changeInterval);
	}, [direction, gameState]);
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
			setGameState("stopped");
		}
		if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
			setScore((prev) => prev + 1);
			setFood(generateFood);
			addSquare();
		}
	}, [snake]);

	return gameState === "playing" ? (
		<div className="snake-board">
			<p>{score}</p>
			<span
				className="food"
				style={{ top: food[0] * 2 + "%", left: food[1] * 2 + "%" }}
			></span>
			{displaySnake}
			{direction}
		</div>
	) : (
		<div>
			<button onClick={restartGame}>Restart</button>
		</div>
	);
}

export default Snake;
