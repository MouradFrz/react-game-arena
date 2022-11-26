import React, { useEffect, useState } from "react";
import Try from "../components/Try";
import "../assets/Wordle.scss";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Wordle(props) {
	const [gameState, setGameState] = useState("playing");
	const [tries, setTries] = useState([
		{ isConfirmed: false, word: "" },
		{ isConfirmed: false, word: "" },
		{ isConfirmed: false, word: "" },
		{ isConfirmed: false, word: "" },
		{ isConfirmed: false, word: "" },
		{ isConfirmed: false, word: "" },
	]);
	const [answer, setAnswer] = useState("");
	const [allAnswers, setAllAnswers] = useState([]);
	function handleChange(ev) {
		for (let i = 0; i < 6; i++) {
			if (tries[i].isConfirmed) {
				continue;
			} else {
				setTries((prev) =>
					prev.map((el, index) => {
						return index === i ? { ...el, word: ev.target.value } : el;
					})
				);
				break;
			}
		}
	}
	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "810f02213fmsh13ae6207e2586cap1f0d1ajsn16db7d642ff6",
				"X-RapidAPI-Host": "wordle-answers-solutions.p.rapidapi.com",
			},
		};
		fetch("https://wordle-answers-solutions.p.rapidapi.com/answers", options)
			.then((response) => response.json())
			.then((response) => {
				const toReturn = [];
				response.data.forEach((el, i) => {
					toReturn.push(el.answer);
				});
				setAnswer(toReturn[Math.floor(Math.random() * toReturn.length)]);
				setAllAnswers(toReturn);
			})
			.catch((err) => console.error(err));
	}, []);
	useEffect(() => {
		function handleEnter(ev) {
			if (ev.isComposing || ev.keyCode === 13) {
				for (let i = 0; i < 6; i++) {
					if (tries[i].isConfirmed) {
						continue;
					} else {
						if (
							tries[i].word.length === 5 &&
							allAnswers.includes(
								document.querySelector("#hidden-input").value.toUpperCase()
							)
						) {
							setTries((prev) =>
								prev.map((el, index) => {
									return index === i
										? { ...el, isConfirmed: !el.isConfirmed }
										: el;
								})
							);

							if (
								document.querySelector("#hidden-input").value.toUpperCase() ===
								answer
							) {
								setGameState("won");
							}
							const tryCount = tries.filter((el) => el.word !== "").length;
							if(tryCount===6){
								setGameState("lost")
							}
							document.querySelector("#hidden-input").value = "";
						} else {
							Toastify({
								text: `Invalid word`,
								duration: 1500,
								backgroundColor: "#0f0f0f",
								position: "center",
							}).showToast();
						}
						break;
					}
				}
			}
		}
		document.querySelector("*").addEventListener("click", () => {
			document.querySelector("#hidden-input").focus();
		});
		window.addEventListener("keyup", handleEnter);
		return () => {
			window.removeEventListener("keyup", handleEnter);
		};
	}, [tries]);
	function restartGame() {
		setTries([
			{ isConfirmed: false, word: "" },
			{ isConfirmed: false, word: "" },
			{ isConfirmed: false, word: "" },
			{ isConfirmed: false, word: "" },
			{ isConfirmed: false, word: "" },
			{ isConfirmed: false, word: "" },
		]);
		setGameState("playing");
		setAnswer(allAnswers[Math.floor(Math.random() * allAnswers.length)]);
	}
	return gameState === "playing" ? (
		<div className="wordle-wrapper">
			{tries.map((el, i) => {
				return <Try item={el} key={i} answer={answer} />;
			})}
			<input
				type="text"
				onChange={(ev) => {
					handleChange(ev);
				}}
				maxLength={5}
				style={{ opacity: "0" }}
				id="hidden-input"
			/>
		</div>
	) : (
		<div className="wordle-result-menu">
			{gameState === "won" ? (
				<div>
					<h1>Won!</h1>
					<button className="wordle-button" onClick={restartGame}>
						Play again
					</button>
				</div>
			) : (
				<div>
					<h1>Lost!</h1>
					<p>Your word was : {answer}</p>
					<button className="wordle-button" onClick={restartGame}>
						Play again
					</button>
				</div>
			)}
		</div>
	);
}

export default Wordle;
