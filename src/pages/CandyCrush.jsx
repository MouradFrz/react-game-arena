import React, { useEffect, useState } from "react";
import "../assets/CandyCrush.scss";
import BlueCandy from "/candy-crush-candies/blue-candy.png";
import GreenCandy from "/candy-crush-candies/green-candy.png";
import YellowCandy from "/candy-crush-candies/yellow-candy.png";
import OrangeCandy from "/candy-crush-candies/orange-candy.png";
import PurpleCandy from "/candy-crush-candies/purple-candy.png";
import RedCandy from "/candy-crush-candies/red-candy.png";
import blank from "/candy-crush-candies/blank.png";
const colors = [
	BlueCandy,
	GreenCandy,
	RedCandy,
	YellowCandy,
	OrangeCandy,
	PurpleCandy,
];
const width = 8;
const generateCurrentColors = () => {
	const returnedArray = [];
	for (let i = 0; i < width * width; i++) {
		returnedArray.push(colors[Math.floor(Math.random() * 6)]);
	}
	return returnedArray;
};

const CandyCrush = (props) => {
	useEffect(()=>{
		document.title="Candy Crush"
	},[])
	const [currentColors, setCurrentColors] = useState(generateCurrentColors());
	const [squareBeingDragged, setSquareBeingDragged] = useState(null);
	const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
	const [score, setScore] = useState(0);

	const checkForCombinationsOfThree = () => {
		for (let i = 0; i <= 47; i++) {
			const combinationIndexes = [i, i + width, i + width * 2];
			const colorToLookFor = currentColors[i];
			const isBlank = colorToLookFor === blank;
			if (
				combinationIndexes.every(
					(el) => currentColors[el] === colorToLookFor
				) &&
				!isBlank
			) {
				setScore((prev) => prev + 3);
				combinationIndexes.forEach(
					(indexOfTheSquare) => (currentColors[indexOfTheSquare] = blank)
				);
				return true;
			}
		}
	};
	const checkForCombinationsOfFour = () => {
		for (let i = 0; i <= 39; i++) {
			const combinationIndexes = [i, i + width, i + width * 2, i + width * 3];
			const colorToLookFor = currentColors[i];
			const isBlank = colorToLookFor === blank;
			if (
				combinationIndexes.every(
					(el) => currentColors[el] === colorToLookFor
				) &&
				!isBlank
			) {
				setScore((prev) => prev + 4);
				combinationIndexes.forEach(
					(indexOfTheSquare) => (currentColors[indexOfTheSquare] = blank)
				);
				return true;
			}
		}
	};
	const checkForRowsOfThree = () => {
		for (let i = 0; i < 64; i++) {
			const combinationIndexes = [i, i + 1, i + 2];
			const colorToLookFor = currentColors[i];
			if ([6, 7].includes(i % 8)) {
				continue;
			}
			const isBlank = colorToLookFor === blank;
			if (
				combinationIndexes.every(
					(el) => currentColors[el] === colorToLookFor
				) &&
				!isBlank
			) {
				setScore((prev) => prev + 3);
				combinationIndexes.forEach(
					(indexOfTheSquare) => (currentColors[indexOfTheSquare] = blank)
				);
				return true;
			}
		}
	};
	const checkForRowsOfFour = () => {
		for (let i = 0; i < 64; i++) {
			const combinationIndexes = [i, i + 1, i + 2, i + 3];
			const colorToLookFor = currentColors[i];
			if ([5, 6, 7].includes(i % 8)) {
				continue;
			}
			const isBlank = colorToLookFor === blank;
			if (
				combinationIndexes.every(
					(el) => currentColors[el] === colorToLookFor
				) &&
				!isBlank
			) {
				setScore((prev) => prev + 4);
				combinationIndexes.forEach(
					(indexOfTheSquare) => (currentColors[indexOfTheSquare] = blank)
				);
				return true;
			}
		}
	};
	const dropDownInEmptySquares = () => {
		currentColors.forEach((el, i) => {
			if (i < 8 && currentColors[i] === blank) {
				currentColors[i] = colors[Math.floor(Math.random() * 6)];
			}
			if (i <= 55) {
				if (currentColors[i + width] === blank) {
					currentColors[i + width] = currentColors[i];
					currentColors[i] = blank;
				}
			}
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			checkForCombinationsOfFour();
			checkForCombinationsOfThree();
			checkForRowsOfFour();
			checkForRowsOfThree();
			dropDownInEmptySquares();
			setCurrentColors([...currentColors]);
		}, 100);
		return () => clearTimeout(interval);
	}, [currentColors]);

	const dragStart = (e) => {
		setSquareBeingDragged(e.target);
	};
	const dragEnd = (e) => {
		const squareBeingDraggedId = parseInt(squareBeingDragged.dataset.id);
		const squareBeingReplacedId = parseInt(squareBeingReplaced.dataset.id);
		currentColors[squareBeingReplacedId] =
			squareBeingDragged.getAttribute("src");
		currentColors[squareBeingDraggedId] =
			squareBeingReplaced.getAttribute("src");
		const validMoves = [
			squareBeingDraggedId + 1,
			squareBeingDraggedId + 8,
			squareBeingDraggedId - 1,
			squareBeingDraggedId - 8,
		];

		const validMove = validMoves.includes(squareBeingReplacedId);
		const isAColumnOfFour = checkForCombinationsOfFour();
		const isAColumnOfThree = checkForCombinationsOfThree();
		const isARowOfFour = checkForRowsOfFour();
		const isARowOfThree = checkForRowsOfThree();

		if (
			squareBeingReplacedId &&
			validMove &&
			(isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)
		) {
			setSquareBeingDragged(null);
			setSquareBeingReplaced(null);
		} else {
			currentColors[squareBeingDraggedId] =
				squareBeingDragged.getAttribute("src");
			currentColors[squareBeingReplacedId] =
				squareBeingReplaced.getAttribute("src");
		}
	};
	const dragDrop = (e) => {
		setSquareBeingReplaced(e.target);
	};
	return (
		<div className="center-text">
			<p>Score : {score}</p>
			<div className="candy-crush-wrapper">
				{currentColors.map((el, index) => {
					return (
						<img
							key={index}
							src={el}
							data-id={index}
							draggable={true}
							alt={el}
							onDragOver={(e) => e.preventDefault()}
							onDragEnter={(e) => e.preventDefault()}
							onDragLeave={(e) => e.preventDefault()}
							onDrop={(e) => {
								e.stopPropagation();
								dragDrop(e);
							}}
							onDragStart={(e) => {
								e.stopPropagation();
								dragStart(e);
							}}
							onDragEnd={(e) => {
								e.stopPropagation();
								dragEnd(e);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CandyCrush;
