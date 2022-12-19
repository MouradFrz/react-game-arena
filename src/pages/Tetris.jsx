import React, { useState, useEffect } from "react";
import "../assets/Tetris.scss";
import TetrisSquare from "../components/TetrisSquare";

function generateRandomShape() {

	const shapes = [
		{
			type: 1,
			bottomSquares: [0, 3],
			squares: [
				{ x: 5 * SS, y: 13 * SS },
				{ x: 5 * SS, y: 14 * SS },
				{ x: 5 * SS, y: 15 * SS },
				{ x: 6 * SS, y: 13 * SS },
			],
		},
		{
			type: 2,
			bottomSquares: [0, 2],
			squares: [
				{ x: 5 * SS, y: 13 * SS },
				{ x: 5 * SS, y: 14 * SS },
				{ x: 6 * SS, y: 13 * SS },
				{ x: 6 * SS, y: 14 * SS },
			],
		},
		{
			type: 3,
			bottomSquares: [0],
			squares: [
				{ x: 5 * SS, y: 13 * SS },
				{ x: 5 * SS, y: 14 * SS },
				{ x: 5 * SS, y: 15 * SS },
				{ x: 5 * SS, y: 16 * SS },
			],
		},
		{
			type: 4,
			bottomSquares: [0, 2],
			squares: [
				{ x: 5 * SS, y: 13 * SS },
				{ x: 5 * SS, y: 14 * SS },
				{ x: 4 * SS, y: 14 * SS },
				{ x: 4 * SS, y: 15 * SS },
			],
		},
		{
			type: 5,
			bottomSquares: [0, 1, 2],
			squares: [
				{ x: 5 * SS, y: 13 * SS },
				{ x: 4 * SS, y: 13 * SS },
				{ x: 6 * SS, y: 13 * SS },
				{ x: 5 * SS, y: 14 * SS },
			],
		},
	];
	return shapes[Math.floor(Math.random() * 5)];
}
const SS = 40;
function Tetris(props) {
	useEffect(()=>{
		document.title="Tetris"
	},[])
	const [currentShape, setCurrentShape] = useState(generateRandomShape());
	const [currentTable, setCurrentTable] = useState([]);
	useEffect(() => {
		function handleKeyPress(ev) {
			if (ev.isComposing || ev.keyCode === 37) {
				const testLeft = currentShape.squares.filter((el) => {
					return currentTable.filter((tableEl) => {
						return tableEl.x === el.x - 40 && tableEl.y === el.y;
					}).length;
				}).length;

				setCurrentShape((prev) => {
					return {
						...prev,
						squares:
							prev.squares.filter((element) => element.x === 0).length ||
							testLeft
								? prev.squares
								: prev.squares.map((element) => {
										return { ...element, x: element.x - 1 * SS };
								  }),
					};
				});
			}
			if (ev.isComposing || ev.keyCode === 39) {
				const testRight = currentShape.squares.filter((el) => {
					return currentTable.filter((tableEl) => {
						return tableEl.x - 40 === el.x && tableEl.y === el.y;
					}).length;
				}).length;
				setCurrentShape((prev) => {
					return {
						...prev,
						squares:
							prev.squares.filter((element) => element.x === 280).length ||
							testRight
								? prev.squares
								: prev.squares.map((element) => {
										return { ...element, x: element.x + 1 * SS };
								  }),
					};
				});
			}
		}
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [currentTable, currentShape]);
	useEffect(() => {
		const timer = setInterval(() => {
			const hitBottomLine =
				currentShape.squares[currentShape.bottomSquares[0]].y === 0;
			const hitAnotherBlock = currentTable.filter((el) => {
				let result = false;
				currentShape.bottomSquares.forEach((bottomSqIndex) => {
					if (
						currentShape.squares[bottomSqIndex].x === el.x &&
						currentShape.squares[bottomSqIndex].y - 1 * SS === el.y
					) {
						result = true;
					}
				});
				return result;
			}).length;
			if (!hitBottomLine && !hitAnotherBlock) {
				setCurrentShape((prev) => {
					return {
						...prev,
						squares: prev.squares.map((el) => {
							return { ...el, y: el.y - 1 * SS };
						}),
					};
				});
			} else {
				setCurrentTable((prev) => prev.concat(currentShape.squares));
				setCurrentShape(() => {
					return generateRandomShape();
				});
			}
		}, 200);
		return () => {
			clearInterval(timer);
		};
	}, [currentShape]);
	useEffect(() => {
		for (let i = 0; i < 13; i++) {
			if (currentTable.filter((el) => el.y === i * SS).length === 8) {
				setCurrentTable((prev) => {
					const removedRow = prev.filter((el) => el.y !== i * SS);
					return removedRow.map((el) =>
						el.y > i * SS ? { ...el, y: el.y - SS } : el
					);
				});
			}
		}
	}, [currentTable]);
	return (
		<div className="tetris-container">
			{currentShape.squares.map((el, i) => {
				return (
					<div
						className="square"
						style={{ left: `${el.x}px`, bottom: `${el.y}px` }}
						key={i}
					></div>
				);
			})}
			{currentTable.map((el, i) => {
				return (
                    <TetrisSquare left={el.x} bottom={el.y} key={i} />
				);
			})}
		</div>
	);
}

export default Tetris;
