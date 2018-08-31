import React from 'react';
import '../css/GameBoard.css';

class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.sendCardInfo = this.sendCardInfo.bind(this);
        this.state = { Clicks: 0 };
    }

    sendCardInfo(e, props) {
        if(e.target.nodeName == 'DIV'){
            this.props.sendData(e.target.children[0]);

        } else{
            this.props.sendData(e.target);

        }

    }

    render(props) {
        return (
            <div className="card z-depth-3" onClick={this.sendCardInfo} >
                <img
                    className={this.props.cardClass}
                    data-img={this.props.image}
                    src="/nhl-logo.png" width="80" height="90"
                    alt="A card"
                />
            </div>
        )
    }

}

export default GameCard