import React, { useEffect, useState } from "react";
import "../assets/Snake.scss";
function Snake(props) {
	const [snake, setSnake] = useState([
		[24, 25],
		[23, 25],
		[22, 25],
	]);
	const [direction, setDirection] = useState("down");
	const [food, setFood] = useState([14, 22]);

	const displaySnake = snake.map((el) => (
		<span
			className="snake-element"
			style={{ top: el[0] * 2 + "%", left: el[1] * 2 + "%" }}
		></span>
	));
	useEffect(() => {
		function handleKeyPress(ev) {
			if (ev.isComposing || ev.keyCode === 40) {
				setDirection("down");
			}
			if (ev.isComposing || ev.keyCode === 38) {
				setDirection("up");
			}
			if (ev.isComposing || ev.keyCode === 37) {
				setDirection("left");
			}
			if (ev.isComposing || ev.keyCode === 39) {
				setDirection("right");
			}
		}
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);
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
								? newSnake.push([el[0]-1, el[1]])
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
								? newSnake.push([el[0]+1, el[1]])
								: newSnake.push([old[i - 1][0], old[i - 1][1]]);
						});
						return newSnake;
					});
					break;
				default:
					return;
			}
		};
		handleDirectionChange();
		const lol = setInterval(handleDirectionChange, 100);
		return () => clearInterval(lol);
	}, [direction]);
	return (
		<div className="snake-board">
			{/* <span className="snake-element"></span> */}
			<span
				className="food"
				style={{ top: food[0] * 2 + "%", left: food[1] * 2 + "%" }}
			></span>
			{displaySnake}
			{direction}
		</div>
	);
}

export default Snake;
