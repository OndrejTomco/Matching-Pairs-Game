import React from 'react';
import '../css/GameBoard.css';

const ScoreBar = (props) => {

    return (
        <div>
            <nav className="navbar navbar-expand bg-white scoreBar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <span className="nav-link nickName ml-2">{props.NickName}</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link ml-4">Points<span className="badge badge-primary ml-2">{props.Score}</span></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Missed<span className="badge badge-danger ml-2">{props.Missed}</span></span>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default ScoreBar