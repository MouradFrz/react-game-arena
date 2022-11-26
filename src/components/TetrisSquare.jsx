import React from "react";
const colors = [
	{
		back: "#ff9494",
		border: "#a44d4d",
	},
	{
		back: "#94a0ff",
		border: "#514da4",
	},
	{
		back: "#a8ff94",
		border: "#5ca44d",
	},
	{
		back: "#db94ff",
		border: "#864da4",
	},
];
function TetrisSquare({ left, bottom }) {
	return (
		<div
			className="square"
			style={{
				left: `${left}px`,
				bottom: `${bottom}px`,
			}}
		></div>
	);
}

export default TetrisSquare;
