import React from 'react';
import '../css/GameBoard.css';

const AsideScores = (props) => {

    return (
        <div className="options z-depth-1">
            <ul className="list-group fancyFont">
                <li className=" h1 list-group-item text-center">
                    {props.NickName}
                </li>

                <li className=" h2 list-group-item d-flex justify-content-between align-items-center">
                    Points:
                        <span className="badge badge-primary">{props.Score}</span>
                </li>

                <li className=" h2 list-group-item d-flex justify-content-between align-items-center">
                    Missed:
                        <span className="badge badge-danger">{props.Missed}</span>
                </li>

            </ul>
        </div>
    )

}

export default AsideScores