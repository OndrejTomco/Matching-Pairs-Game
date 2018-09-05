import React from 'react';
import '../css/GameBoard.css';

const Header = (props) => {
    return (
        <div>
            <h1 className="display-4 header mb-3">MATCHING PAIRS <h3 className="text-muted d-inline-block">Memory game</h3>
            </h1>
        </div>
    )
}

export default Header;