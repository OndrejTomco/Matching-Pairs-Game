import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './App.css';
import ChooseTile from './ChooseTile';
import Difficulty from './Difficulty';

class App extends Component {

  constructor(props) {
    super(props);
    this.ValidateInput = this.ValidateInput.bind(this);

    this.state = {
      didMount: false,
      playerName: null,
      difficulty: 8,
      chosenTopic:'topic-nhl',
      topics: [
        { title: 'NHL Logos', src: '/nhl-choice.jpg',id:'topic-nhl' },
        { title: 'Programming languages', src: '/prog-choice.png',id:'topic-programming' }
      ],
      Redirect: false,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ didMount: true })
    }, 0)

    let choiceCards = Array.from(document.querySelector('.choice-cards').children);
    choiceCards.map((card,index) => index == 0 ? card.children[0].classList.add('selected') : card.children[0].classList.add('notSelected'));
    
  }

  ValidateInput(e, props) {
    let difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    let playerName = document.getElementById('playerName').value;
    let topic = document.getElementsByClassName('chooseTile selected')[0].id;
    
    if (playerName.trim().length < 1 || playerName.trim().length > 30) {
      e.preventDefault();
      document.getElementById('validation-error').classList.add('d-block');
    } else {
      this.setState({
        redirect: true,
        playerName: playerName,
        difficulty: difficulty,
        chosenTopic: topic
      })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/singleplayer',
        state: {
          difficulty: this.state.difficulty,
          playerName: this.state.playerName,
          chosenTopic:this.state.chosenTopic
        }
      }} push />
    }
  }

  render() {
    return (
      <div className={`intro slide-in ${this.state.didMount && 'visible'}`}>
        <h1 className="display-2 header mb-4 text-center">MATCHING PAIRS</h1>

        <div className="md-form mt-5">
          <input type="text" id="playerName" placeholder="NickName" defaultValue={this.props.location.state === undefined ? '' : this.props.location.state.playerName} className="form-control form-control-lg d-inline-block col-md-6 col-sm-10 col-10" />
          <small className="d-none text-danger" id="validation-error">Enter valid NickName</small>
        </div>

        <div className="choice-cards d-inline-block">
          { this.state.topics.map((topic, index) => <ChooseTile topic={topic} />) }
        </div>

        <Difficulty />

        <div className="mt-5">
          {this.renderRedirect()}

          <a onClick={this.ValidateInput} className="btn btn-primary"><i className="fas fa-play mr-3"></i>Single player</a>
          <Link to="/multiplayer" className="btn btn-deep-purple"><i className="fas fa-play mr-3"></i>Multi player</Link>
        </div>

      </div >

    );
  }
}

export default App;
