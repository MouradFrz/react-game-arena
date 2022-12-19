import React from "react";
function Try({ item, answer }) {
	const items = [];

	for (let i = 0; i < 5; i++) {
		const char = item ? item.word[i] : "";
		items.push(
			<div
				className={
					!item.isConfirmed
						? "letter"
						: answer[i] === char.toUpperCase()
						? "letter in-word right-index"
						: answer.includes(char.toUpperCase())
						? "letter in-word" 
						: "letter"
				}
				key={i}
			>
				{char ? char.toUpperCase() : ""}
			</div>
		);
	}
	return <div className="try">{items}</div>;
}

export default Try;
