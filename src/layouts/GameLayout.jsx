import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "../assets/GameLayout.scss";

function GameLayout(props) {
	const currentPageInfo = useLocation();
	const showReturn = currentPageInfo.pathname !== "/";
	return (
		<div>
			<div className="container">
				<div className="game-window">
					{showReturn ? (
						<Link to="/" className="return-link">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-arrow-left"
								viewBox="0 0 16 16"
                                className="return-arrow"
							>
								<path
									fill-rule="evenodd"
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
		</div>
	);
}

export default GameLayout;
