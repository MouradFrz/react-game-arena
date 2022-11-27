import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "../assets/GameLayout.scss";

function GameLayout(props) {
	const currentPageInfo = useLocation();
	const showReturn = currentPageInfo.pathname !== "/";
	const toggleButton = useRef();
	const copyRef = useRef();
	useEffect(() => {
		const toggleFunction = () => {
			copyRef.current.classList.toggle("visible");
		};
		toggleButton.current.addEventListener("click", toggleFunction);
		return () => {
			toggleButton.current.removeEventListener("click", toggleFunction);
		};
	}, []);
	return (
		<div className="global-wrapper">
			<div className="container">
				<div className="game-window">
					{showReturn ? (
						<Link to="/" className="return-link">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-arrow-left return-arrow"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
								/>
							</svg>
						</Link>
					) : (
						""
					)}
					<Outlet />
				</div>
			</div>
			<div ref={copyRef} className="copyright">
				<button ref={toggleButton}>&#8656;</button>
				<p>© 2022 Yaou Mourad - All Rights Reserved.</p>
			</div>
		</div>
	);
}

export default GameLayout;
