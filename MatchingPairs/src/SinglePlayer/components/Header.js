import React from 'react';
import '../css/GameBoard.css';

const Header = (props) => {
    return (
        <div>
            <div className="display-4 header mb-3">MATCHING PAIRS <h3 className="text-muted d-inline-block">Memory game</h3>
            </div>
        </div>
    )
}

export default Header;