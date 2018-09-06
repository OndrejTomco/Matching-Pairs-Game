import React from 'react';
import '../css/GameBoard.css';

const Options = (props) => {

    return (
        <div className="menuOptions">
            <a href="" className="btn btn-default btn-sm"><i className="fas fa-sync mr-2"></i>Restart Game</a>
            <a href="/" className="btn btn-default btn-sm "><i className="fas fa-home mr-2"></i>Main Menu</a>
            <span onClick={props.showHighScores} className="btn btn-default btn-sm "><i className="fas fa-home mr-2"></i>Highscores</span>

        </div>
    )
}

export default Options;