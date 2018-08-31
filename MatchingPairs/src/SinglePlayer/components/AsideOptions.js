import React from 'react';
import '../css/GameBoard.css';

const AsideOptions = () => {
    return (
        <div className=" mt-4" >
            <a href="" className="btn btn-primary"><i className="fas fa-sync mr-2"></i>Restart Game</a>
            <a href="/" className="btn btn-primary"><i className="fas fa-home mr-2"></i>Main Menu</a>
        </div>
    )
}

export default AsideOptions;