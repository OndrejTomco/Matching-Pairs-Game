import React from 'react';
import '../css/GameBoard.css';

const AsideScores = (props) => {

    return (
        <div>
            <nav class="navbar navbar-expand bg-white">
                <ul class="navbar-nav mr-auto float-left">
                    <li class="nav-item mr-4 ml-3">
                        <span className="nav-link font-weight-bold">{props.NickName}</span>
                    </li>
                    <li class="nav-item">
                        <span className="nav-link">Points<span className="badge badge-primary ml-2">{props.Score}</span></span>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link" href="#">Missed<span className="badge badge-danger ml-2">{props.Missed}</span></span>
                    </li>
                </ul>
            </nav>


        </div>

        // <nav className="options z-depth-1">
        //     <ul className="list-inline d-inline-block float-left">
        //         <li className="list-inline-item nickName">{props.NickName}</li>
        //         <li className="list-inline-item">Points:<span className="badge badge-primary ml-2">{props.Score}</span></li>
        //         <li className="list-inline-item">Missed:<span className="badge badge-danger ml-2">{props.Missed}</span></li>
        //     </ul>

        //     <span className="menuOptions float-right">
        //       
        //     </span>
        // </nav>
    )

}

export default AsideScores