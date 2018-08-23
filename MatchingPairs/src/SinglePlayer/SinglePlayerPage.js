import React, { Component } from 'react';
import './css/SinglePlayerPage.css';
import GameBoard from './GameBoard';
import AsideOptions from './AsideOptions';

class SinglePlayerPage extends Component {

    constructor(props) {
        super(props);
        this.setScore= this.setScore.bind(this);
        this.state = { Score: 0 };
    }

    setScore(data) {
        this.setState((state) => ({ Score: state.Score + 1}));

    }


    render() {
        return (
            <div className="SinglePlayerPage container container-fluid">
            <h1 className="display-3 header mb-3 text-center">MATCHING PAIRS</h1>
            {console.log(this.props)}
                <div className="row mt-5">
                    <div className="col-md-4">
                        <AsideOptions Score={this.state.Score} />
                    </div>

                    <div className="col-md-8">
                        <GameBoard CallBack={this.setScore}>
                        </GameBoard>
                    </div>
                </div>
            </div>

        );
    }
}

export default SinglePlayerPage;