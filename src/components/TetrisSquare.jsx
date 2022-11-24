import React from "react";

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
