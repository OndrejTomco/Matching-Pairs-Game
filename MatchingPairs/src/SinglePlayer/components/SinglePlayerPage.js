import React, { Component } from 'react';
import '../css/SinglePlayerPage.css';
import GameBoard from './GameBoard';
import AsideScores from './AsideScores';
import AsideOptions from './AsideOptions';
import Header from './Header';

class SinglePlayerPage extends Component {

    constructor(props) {
        super(props);
        this.updateScore = this.updateScore.bind(this);

        this.state = {
            Score: 0,
            Missed: 0,
            didMount: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ didMount: true })
        }, 0)
    }


    updateScore(match) {
        let incScoreBy = match === true ? 1 : 0;
        let incMissed = match === true ? 0 : 1;
        this.setState((state) => ({
            Score: state.Score + incScoreBy,
            Missed: state.Missed + incMissed
        }));
    }
    render() {
        return (
            <div className={`SinglePlayerPage container container-fluid slide-in ${this.state.didMount && 'visible'}`}>
            <Header />
                <div className="row mt-5">
                    <div className="col">
                        <AsideScores Score={this.state.Score} Missed={this.state.Missed} NickName={this.props.match.params.name} />
                        <AsideOptions />
                    </div>

                    <div className="col-md-8">
                        <GameBoard setAsideScores={this.updateScore} Score={this.state.Score} Missed={this.state.Missed}>
                        </GameBoard>
                    </div>


                </div>
            </div>

        );
    }
}

export default SinglePlayerPage;