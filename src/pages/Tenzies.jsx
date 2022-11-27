import React, { useState, useEffect, useRef } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Tenzies(props) {
	useEffect(()=>{
		document.title="Tenzies"
	},[])
	const generateNewDice = () => {
		const tempArray = [];
		for (let i = 0; i <= 9; i++) {
			tempArray.push({
				id: i,
				number: Math.floor(Math.random() * 6) + 1,
				isHeld: false,
			});
		}
		return tempArray;
	};

	function initBestScore() {
		return parseInt(localStorage.getItem("tenziesBestScore"))
			? localStorage.getItem("tenziesBestScore")
			: "/";
	}
	const [tenzies, setTenzies] = useState(false);
	const [rollCount, setRollCount] = useState(0);
	const [dice, setDice] = useState(generateNewDice);
	const [bestScore, setBestScore] = useState(initBestScore);
	const displayDice = dice.map((el) => {
		return (
			<span
				className={el.isHeld ? "die held" : "die"}
				onClick={() => toggleHeld(el.id)}
				key={el.id}
			>
				{el.number}
			</span>
		);
	});
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].number;
		const allSameValue = dice.every((die) => die.number === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);
	useEffect(() => {
		if (tenzies) {
			setBestScore((old) => {
				if (
					!parseInt(localStorage.getItem("tenziesBestScore")) ||
					rollCount < parseInt(localStorage.getItem("tenziesBestScore"))
				) {
					localStorage.setItem("tenziesBestScore", rollCount);
					Toastify({
						text: `You Won!\nNew best score!`,
						duration: 3000,
						backgroundColor: "#001a4d",
						position: "center",
					}).showToast();
					return rollCount;
				} else {
					Toastify({
						text: `You Won!`,
						duration: 3000,
						backgroundColor: "#001a4d",
						position: "center",
					}).showToast();
				}
				return old;
			});
		}
	}, [tenzies]);
	function toggleHeld(id) {
		setDice((prev) => {
			return prev.map((el) => {
				return el.id == id ? { ...el, isHeld: !el.isHeld } : el;
			});
		});
	}

	function reRoll() {
		if (!tenzies) {
			setRollCount((prev) => prev + 1);
			setDice((prev) => {
				return prev.map((el) =>
					el.isHeld ? el : { ...el, number: Math.floor(Math.random() * 6) + 1 }
				);
			});
		} else {
			setDice(generateNewDice);
			setRollCount(0);
			setTenzies(false);
		}
	}
	return (
		<div className="tenzies">
			<p>Click on a die to hold it.</p>
			<p>The goal is to have all the dice on the same number.</p>
			<p>Good luck</p>
			<div className="dice">{displayDice}</div>
			<p className="roll-count">Roll count : {rollCount}</p>
			<div className="reroll-center">
				<button className="reroll" onClick={reRoll}>
					{tenzies ? "Restart" : "Reroll"}
				</button>
			</div>
			<p style={{ marginTop: "20px" }}>Best Score:{bestScore}</p>
		</div>
	);
}

export default Tenzies;
