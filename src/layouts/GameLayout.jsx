import React from 'react';
import {Outlet} from 'react-router-dom'
import '../assets/GameLayout.scss'
function GameLayout(props) {
    return (
        <div>
            <div className="container">
                <div className="game-window">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default GameLayout;