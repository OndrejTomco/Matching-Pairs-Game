import React, { Component } from 'react';
import '../css/GameBoard.css';
import GameTile from './GameTile';
import WinningModal from './WinningModal';
import HighScoreModal from './HighScoreModal';
import Options from './Options';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.handleTile = this.handleTile.bind(this);
    this.compareTiles = this.compareTiles.bind(this);
    this.showHighScores = this.showHighScores.bind(this);
    this.hideHighScores = this.hideHighScores.bind(this);
    this.hideWinningModal = this.hideWinningModal.bind(this);
    this.state = {
      Logos: [],
      FlippedTiles: 0,
      backImg: '/nhl/nhl-logo.png',
      frontImgPath: '/nhl/logo-',
      ShowWinningModal: false,
      ShowHighScoresModal: false,

    };
  }

  componentDidUpdate() {
    if (this.state.FlippedTiles === 2) {
      this.disableTiles();
      this.compareTiles();
    }

    console.log(this.state);
  }

  componentWillMount(props) {
    //fill logo array
    let logoArray = [];
    for (let i = 0; i < this.props.Difficulty; i++) {
      let canContinue = false;

      while (canContinue === false) {
        let random = Math.floor(Math.random() * 13) + 1;
        let num = logoArray.filter((number) => {
          return number === random;
        })

        if (num.length === 0) {
          logoArray.push(random, random);
          canContinue = true;
        }
      }
    }

    logoArray.sort(() => 0.5 - Math.random());

    //set back image
    let backImg;
    let frontImgPath;
    switch(this.props.Topic){
      case 'topic-nhl': backImg = '/nhl/nhl-logo.png'; frontImgPath = '/nhl/logo-'; break
      case 'topic-programming': backImg = '/prog-choice.png'; frontImgPath = '/progLanguages/prog-'

    }
    this.setState({ 
      Logos: logoArray,
      backImg,
      frontImgPath
    });

  }

  isGameOver() {
    let activeTiles = Array.from(document.querySelectorAll('.tile:not(.inactive)'));

    if (activeTiles.length < 1) {
      this.storeScore();
      this.setState({ ShowWinningModal: true });
    }
  }

  storeScore() {
    fetch('http://localhost:5000/storeScore', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: this.props.NickName,
        Score: this.props.Score,
        Missed: this.props.Missed,
        Difficulty: this.props.Difficulty
      })
    }).then((res) => {
      console.log(res);
    })
  }

  disableTiles() {
    let logosArray = Array.from(document.querySelectorAll(".tile:not(.disabled)"));
    logosArray.forEach(logo => logo.classList.add('disabled'));
  }

  enableTiles() {
    let logoArray = Array.from(document.querySelectorAll(".disabled:not(.inactive)"));
    logoArray.forEach(logo => logo.classList.remove('disabled'));
  }

  flipBack(tile) {
    tile.forEach((tile) => {
      tile.classList.remove('turned');
      tile.children[0].src = this.state.backImg;
    })

    this.enableTiles();
  }

  resetTiles() {
    this.setState({
      FlippedTiles: 0,
    });
  }

  compareTiles() {
    let turnedTiles = Array.from(document.getElementsByClassName('turned'));
    let match;

    if (turnedTiles[0].children[0].src === turnedTiles[1].children[0].src) {
      match = true;

      turnedTiles.forEach((tile) => {
        tile.classList.add('inactive');
        tile.classList.remove('turned');
      })

      this.props.updateScore(match);

      setTimeout(() => {
        this.enableTiles();
        this.isGameOver();

      }, 300);


    } else {
      match = false;

      this.props.updateScore(match);
      setTimeout(() => {
        this.flipBack(turnedTiles);
      }, 1000);
    }

    this.resetTiles();

  }

  handleTile(tile, props) {
    tile.parentNode.classList.add('turned');
    tile.src = this.state.frontImgPath + tile.dataset.img + '.png';
    tile.parentNode.className += ' disabled';

    this.setState((prevState) => ({
      FlippedTiles: prevState.FlippedTiles + 1,
    }));

  }

  renderTiles() {
    const tiles = [];
    for (var i = 0; i < this.state.Logos.length; i++) {
      tiles.push(<GameTile back = {this.state.backImg} imgClass={'tile-img'} tileClass={'z-depth-1 tile tile-' + i} image={this.state.Logos[i]} sendData={this.handleTile} key={i} />)
    }
    return tiles;
  }

  showHighScores() {
    this.setState(() => ({ ShowHighScoresModal: true }));
  }

  hideHighScores() {
    this.setState(() => ({ ShowHighScoresModal: false }));
  }

  hideWinningModal(){
    this.setState(() => ({ ShowWinningModal: false }));

  }

  render() {
    return (
      <div id="GameBoard" className={'text-center mt-3 gameboard-' + this.props.Difficulty}>
        <Options nickName={this.props.NickName} showHighScores={this.showHighScores} />
        <WinningModal showModal={this.state.ShowWinningModal} hideModal={this.hideWinningModal} scores={this.props} />
        <HighScoreModal showModal={this.state.ShowHighScoresModal} hideModal={this.hideHighScores} />
        {this.renderTiles()}
      </div>

    );
  }
}

export default GameBoard;