import React from 'react';
import '../css/GameBoard.css';

const GameTile = (props) => {

    const sendTileInfo = (e) => {
        if (e.target.nodeName === 'DIV') {
            props.sendData(e.target.children[0]);

        } else {
            props.sendData(e.target);
        }
    }

    return (
        <div className={props.tileClass} onClick={sendTileInfo} >
            <img
                className={props.imgClass}
                data-img={props.image}
                src="/nhl/nhl-logo.png" width="80" height="90"
                alt="A Tile"
            />
        </div>
    )

}

export default GameTile