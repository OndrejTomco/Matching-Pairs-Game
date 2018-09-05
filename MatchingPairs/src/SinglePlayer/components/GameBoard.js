import React, { Component } from 'react';
import axios from 'axios';
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
    this.state = {
      Logos: [],
      FlippedTiles: 0,
      ShowWinningModal: false,
      ShowHighScoresModal: false
    };
  }

  componentDidUpdate() {
    if (this.state.FlippedTiles === 2) {
      this.disableTiles();
      this.compareTiles();
    }
  }

  componentWillMount(props) {
    let logoArray = [];
    for (let i = 0; i < this.props.Difficulty; i++) {
      let canContinue = false;

      while (canContinue === false) {
        let random = Math.floor(Math.random() * 31) + 1;
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
    this.setState({ Logos: logoArray });

  }

  isGameOver() {
    let allTiles = Array.from(document.querySelectorAll('.tile'));
    let filteredTiles = allTiles.filter((tile) => {
      return tile.classList.contains('inactive') === false;
    })

    if(filteredTiles.length < 1){
        this.storeScore();
        this.setState(() => ({ ShowWinningModal: true }));
    }
  }

  storeScore(){
    console.log('whats going on');
    fetch('http://localhost:5000/storeScore', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name:this.props.NickName,
        Score: this.props.Score,
        Missed:this.props.Missed,
        Difficulty:this.props.Difficulty
      })
    }).then((res) => {
      console.log(res);
    })
   }

  disableTiles() {
    let logosArray = Array.from(document.getElementsByClassName("tile"));

    logosArray.forEach((logo) => {
      if (logo.classList.contains('disabled') === false)
        logo.className += " disabled";;
    })
  }

  enableTiles() {
    let logos = document.getElementsByClassName("disabled");
    let myArray = Array.from(logos);

    myArray.forEach((logo) => {
      if (logo.classList.contains('inactive') === false)
        logo.classList.remove('disabled');
    })
  }

  flipBack(tile) {
    tile.forEach((tile) => {
      tile.classList.remove('turned');
      tile.children[0].src = '/nhl/nhl-logo.png';
    })

    this.enableTiles();
  }

  resetTiles() {
    this.setState(() => ({
      FlippedTiles: 0,
    }));
  }

  compareTiles() {
    let turnedTiles = document.getElementsByClassName('turned');
    let turnedTilesArray = Array.from(turnedTiles);
    let match;

    if (turnedTilesArray[0].children[0].src === turnedTilesArray[1].children[0].src) {
      match = true;

      turnedTilesArray.forEach((tile) => {
        tile.classList.add('inactive');
        tile.classList.remove('turned');
      })

      this.props.setAsideScores(match);

      setTimeout(() => {
        this.enableTiles();
        this.isGameOver();

      }, 300);


    } else {
      match = false;

      this.props.setAsideScores(match);
      setTimeout(() => {
        this.flipBack(turnedTilesArray);
      }, 1000);
    }

    this.resetTiles();

  }

  handleTile(tile, props) {
    tile.parentNode.classList.add('turned');
    tile.src = '/nhl/logo-' + tile.dataset.img + '.png';
    tile.parentNode.className += ' disabled';

    this.setState((prevState) => ({
      FlippedTiles: prevState.FlippedTiles + 1,
    }));

  }

  renderTiles() {
    const tiles = [];
    for (var i = 0; i < this.state.Logos.length; i++) {
      tiles.push(<GameTile imgClass={'tile-img'} tileClass={'z-depth-1 tile tile-' + i} image={this.state.Logos[i]} sendData={this.handleTile} key={i} />)
    }
    return tiles;
  }

  showHighScores(){
    this.setState(() => ({ ShowHighScoresModal : true }));
  }

  hideHighScores(){
    this.setState(() => ({ ShowHighScoresModal : false }));
  }

  render() {
    return (
      <div id="GameBoard" className={'text-center mt-3 gameboard-' + this.props.Difficulty}>
        <Options nickName={this.props.NickName} showHighScores = {this.showHighScores}/>
        <WinningModal showModal={this.state.ShowWinningModal} scores={this.props} />
        <HighScoreModal showModal = {this.state.ShowHighScoresModal} hideModal = {this.hideHighScores}/>

        {this.renderTiles()}
      </div>

    );
  }
}

export default GameBoard;