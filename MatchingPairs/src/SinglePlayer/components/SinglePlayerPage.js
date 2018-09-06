import React, { Component } from 'react';
import '../css/SinglePlayerPage.css';
import GameBoard from './GameBoard';
import ScoreBar from './ScoreBar';
import Header from './Header';

class SinglePlayerPage extends Component {

    constructor(props) {
        super(props);
        this.updateScore = this.updateScore.bind(this);

        this.state = {
            Score: 0,
            Missed: 0,
            DidMount: false,
            NickName: 'Player',
            Difficulty: 10

        };
    }

    componentWillMount(props) {
         if(this.props.location.state !== undefined){
            this.setState({
                NickName: this.props.location.state.playerName,
                Difficulty: this.props.location.state.difficulty
            })
         }
        
    }

    //fade-in animation
    componentDidMount(props) {
        setTimeout(() => {
            this.setState({ DidMount: true })
        }, 0)
    }

    updateScore(match) {
        let incScoreBy;
        if (this.state.Score > 1) {
            incScoreBy = match === true ? 10 : -2;
        } else {
            incScoreBy = match === true ? 10 : 0;
        }

        let incMissed = match === true ? 0 : 1;

        this.setState((state) => ({
            Score: state.Score + incScoreBy,
            Missed: state.Missed + incMissed
        }));
    }

    render() {
        return (
            <div className={`SinglePlayerPage slide-in ${this.state.DidMount && 'visible'}`}>
                <Header />
                <ScoreBar Score={this.state.Score} Missed={this.state.Missed} NickName={this.state.NickName} />
                <GameBoard updateScore={this.updateScore} Score={this.state.Score} Missed={this.state.Missed} NickName={this.state.NickName} Difficulty={this.state.Difficulty} >
                </GameBoard>
            </div>

        );
    }
}

export default SinglePlayerPage;