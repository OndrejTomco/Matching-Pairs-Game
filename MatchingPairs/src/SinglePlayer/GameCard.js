import React from 'react';
import './css/GameBoard.css';

class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.sendCardInfo = this.sendCardInfo.bind(this);
        this.state = {Clicks: 0};
      }

   sendCardInfo(e,props){
    this.props.sendData(e.target);

   }

    render(props) {
        return (
            <div className = "card" >
                <img
                 className={this.props.cardClass}
                 data-img = {this.props.image} 
                 src="/nhl-logo.png" width="90" height="110" 
                 onClick={this.sendCardInfo}
                  />
            </div>
        )
    }

}

export default GameCard