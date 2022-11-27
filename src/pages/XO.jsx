import React, { useEffect, useRef, useState } from "react";
import "../assets/XO.scss";
function getNewTable() {
	return [
		{
			id: 0,
			value: false,
		},
		{
			id: 1,
			value: false,
		},
		{
			id: 2,
			value: false,
		},
		{
			id: 3,
			value: false,
		},
		{
			id: 4,
			value: false,
		},
		{
			id: 5,
			value: false,
		},
		{
			id: 6,
			value: false,
		},
		{
			id: 7,
			value: false,
		},
		{
			id: 8,
			value: false,
		},
	];
}
function XO(props) {
	useEffect(()=>{
		document.title="XO"
	},[])
	const [tour, setTour] = useState(["O", "X"][Math.floor(Math.random() * 2)]);
	const [gameState, setGameState] = useState("choosing");
	const [winner, setWinner] = useState("");
	const player1Ref = useRef();
	const player2Ref = useRef();
	const [players, setPlayers] = useState([
		{
			name: "",
			sign: "O",
			winCount: 0,
		},
		{
			name: "",
			sign: "X",
			winCount: 0,
		},
	]);
	const [table, setTable] = useState(getNewTable());
	const displayTable = table.map((el) => {
		return (
			<div
				onClick={() => handleCellClick(el.id)}
				className={
					!el.value
						? "xo-cell"
						: el.value === "O"
						? "xo-cell o-cell"
						: "xo-cell x-cell"
				}
				key={el.id}
			></div>
		);
	});
	function handleCellClick(id) {
		setTable((prev) => {
			return prev.map((el) => {
				const temp = id !== el.id || el.value;
				temp || setTour((prev) => (prev === "O" ? "X" : "O"));
				return temp ? el : { ...el, value: tour === "O" ? "O" : "X" };
			});
		});
	}
	function switchSigns() {
		setPlayers((prev) => {
			return prev.map((el) => {
				return { ...el, sign: el.sign === "O" ? "X" : "O" };
			});
		});
	}
	const winCombination = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	function checkWin() {
		let result = false;
		winCombination.forEach((el) => {
			if (
				table[el[0]].value &&
				table[el[1]].value &&
				table[el[2]].value &&
				table[el[0]].value === table[el[1]].value &&
				table[el[1]].value === table[el[2]].value
			) {
				result = table[el[0]].value;
			}
		});
		return result;
	}
	function fullSquaresCount() {
		return table.filter((el) => el.value).length;
	}
	useEffect(() => {
		const winner = checkWin();
		if (winner) {
			setWinner(players.filter((el) => el.sign === winner)[0].name);
			setPlayers((prev) => {
				return prev.map((el) => {
					return el.name === players.filter((el) => el.sign === winner)[0].name
						? { ...el, winCount: el.winCount + 1 }
						: el;
				});
			});
			setGameState("won");
			setTable(getNewTable());
		} else {
			if (fullSquaresCount() === 9) {
				setGameState("won");
				setWinner("");
				setTable(getNewTable());
			}
		}
	}, [table]);

	function startGame() {
		setPlayers((prev) => {
			return prev.map((el, index) => {
				return index
					? { ...el, name: player2Ref.current.value || el.sign }
					: { ...el, name: player1Ref.current.value || el.sign };
			});
		});
		setGameState("playing");
	}
	function restartGame() {
		setGameState("playing");
		setTour(["O", "X"][Math.floor(Math.random() * 2)]);
		setTable(getNewTable());
	}
	function resetGame() {
		setGameState("choosing");
		setTour(["O", "X"][Math.floor(Math.random() * 2)]);
		setTable(getNewTable());
		setPlayers([
			{
				name: "",
				sign: "O",
				winCount: 0,
			},
			{
				name: "",
				sign: "X",
				winCount: 0,
			},
		]);
	}
	return gameState === "choosing" ? (
		<div className="xo-menu-wrapper">
			<h1 className="game-title">XO</h1>
			<div className="player-setting">
				<div>
					<h5>Player 1 </h5>
					<input type="text" ref={player1Ref} />
					<p>
						Sign : <span className="sign">{players[0].sign}</span>
					</p>
				</div>
				<div>
					<h5>Player 2</h5>
					<input type="text" ref={player2Ref} />
					<p>
						Sign : <span className="sign">{players[1].sign}</span>
					</p>
				</div>
			</div>
			<button onClick={switchSigns} className="switch-signs">
				Switch signs
			</button>
			<button onClick={startGame} className="start-game">
				Start game
			</button>
		</div>
	) : gameState === "playing" ? (
		<div className="xo-wrapper">
			<div className="xo-stats">
				{tour === players[0].sign
					? players[0].name + "'s turn"
					: players[1].name + "'s turn"}
			</div>
			<div className="xo-board">{displayTable}</div>
		</div>
	) : gameState === "won" ? (
		<div className="xo-menu-wrapper">
			{winner ? <h1>{winner} Won !</h1> : <h1>Its a tie!</h1>}
			<p>
				{players[0].name} {players[0].winCount} - {players[1].winCount}{" "}
				{players[1].name}
			</p>
			<div>
				<button className="start-game" onClick={restartGame}>
					Restart
				</button>
				<button className="start-game" onClick={resetGame}>
					Reset Game
				</button>
			</div>
		</div>
	) : (
		""
	);
}

export default XO;
