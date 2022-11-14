import React, { useState, useEffect } from "react";

function Tenzies(props) {
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
	const [tenzies, setTenzies] = useState(false);
    const [rollCount, setRollCount] = useState(0);
	const [dice, setDice] = useState(generateNewDice);
	const displayDice = dice.map((el) => (
		<span
			className={el.isHeld ? "die held" : "die"}
			onClick={() => toggleHeld(el.id)}
			key={el.id}
		>
			{el.number}
		</span>
	));
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].number;
		const allSameValue = dice.every((die) => die.number === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);
	function toggleHeld(id) {
		setDice((prev) => {
			return prev.map((el) => {
				return el.id == id ? { ...el, isHeld: !el.isHeld } : el;
			});
		});
	}

	function reRoll() {
		if (!tenzies) {
            setRollCount(prev=>prev+1)
			setDice((prev) => {
				return prev.map((el) =>
					el.isHeld ? el : { ...el, number: Math.floor(Math.random() * 6) + 1 }
				);
			});
		} else {
			setDice(generateNewDice);
            setRollCount(0)
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
		</div>
	);
}

export default Tenzies;
