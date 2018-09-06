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
      Difficulty: 8,
      Redirect: false
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ didMount: true })
    }, 0)
  }

  ValidateInput(e, props) {
    var difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    let playerName = document.getElementById('playerName').value;
    if (playerName.trim().length < 1 || playerName.trim().length > 30) {
      e.preventDefault();
      document.getElementById('validation-error').classList.add('d-block');
    } else {
      this.setState({
        redirect: true,
        playerName: playerName,
        Difficulty: difficulty
      })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/singleplayer',
        state: {
          difficulty: this.state.Difficulty,
          playerName: this.state.playerName
        }
      }} push />
    }
  }

  render() {
    return (
      <div className={`intro slide-in ${this.state.didMount && 'visible'}`}>
        <h1 className="display-2 header mb-4 text-center">MATCHING PAIRS</h1>

        <div className="md-form mt-5">
          <input type="text" id="playerName" placeholder="NickName" defaultValue={this.props.location.state === undefined ? '': this.props.location.state.playerName} className="form-control form-control-lg d-inline-block col-md-6 col-sm-10 col-10"  />
          <small className="d-none text-danger" id="validation-error">Enter valid NickName</small>
        </div>
        <div className="row">
          <ChooseTile image={"/nhl-choice.jpg"} title={'NHL Logos'} tileClass={'card chooseTile mb-3 selected'} offset={'col-lg-3 col-md-4 col-sm-4 col-5 offset-3'} />
          <ChooseTile image={"/trailer-choice.jpg"} title={'Trailers'} tileClass={'card chooseTile mb-3 notSelected'} offset={'col-lg-3 col-md-4 col-sm-4 col-5 offset-0'} />
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
