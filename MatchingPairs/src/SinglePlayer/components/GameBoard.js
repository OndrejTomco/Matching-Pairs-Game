import React, { Component } from 'react';
import '../css/GameBoard.css';
import GameCard from './GameCard';
import WinningModal from './WinningModal';


class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.handleCard = this.handleCard.bind(this);
    this.compareTiles = this.compareTiles.bind(this);
    this.state = {
      Logos: ['logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5', 'logo-6', 'logo-7', 'logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5', 'logo-6', 'logo-7'],
      CurrentlyTurnedTiles: 0,
      ShowWinningModal: false
    };

    this.state.Logos.sort(() => 0.5 - Math.random());
  }

  componentDidUpdate() {
    if (this.state.CurrentlyTurnedTiles === 2) {
      this.disableCards();
      this.compareTiles();
    }

  }

  isGameOver() {
    let allCards = Array.from(document.querySelectorAll('.card'));
    let filteredCards = allCards.filter((card) => {
      return card.classList.contains('inactive') === false;
    })

    filteredCards.length > 0 ? console.log('playing') : setTimeout(() => {
      this.setState(() => ({ ShowWinningModal: true }));
    }, 300); 

  }

  disableCards() {
    let logos = document.getElementsByClassName("card");
    let myArray = Array.from(logos);

    myArray.forEach((logo) => {
      if (logo.classList.contains('disabled') === false)
        logo.className += " disabled";;
    })
  }

  enableCards() {

    let logos = document.getElementsByClassName("disabled");
    let myArray = Array.from(logos);

    myArray.forEach((logo) => {
      if (logo.classList.contains('inactive') === false)
        logo.classList.remove('disabled');
    })
  }

  turnBack(toBeTurnedBack) {

    toBeTurnedBack.forEach((tile) => {
      console.log(tile);
      tile.classList.remove('turned');
      tile.children[0].src = '/nhl-logo.png';
    })

    this.enableCards();

  }

  resetTiles() {
    this.setState(() => ({
      CurrentlyTurnedTiles: 0,
    }));
  }


  compareTiles() {

    let turnedCards = document.getElementsByClassName('turned');
    let turnedCardsArray = Array.from(turnedCards);
    let match;

    if (turnedCardsArray[0].children[0].src === turnedCardsArray[1].children[0].src) {
      match = true;

      turnedCardsArray.forEach((tile) => {
        tile.classList.add('inactive');
        tile.classList.remove('turned');
      })

      setTimeout(() => {
        this.enableCards();
        this.props.setAsideScores(match);
      }, 300);

      this.isGameOver();

    } else {
      match = false;

      setTimeout(() => {
        this.turnBack(turnedCardsArray);
        this.props.setAsideScores(match);
      }, 1000);



    }

    this.resetTiles();

  }


  handleCard(tile, props) {

    tile.parentNode.classList.add('turned');
    tile.src = '/' + tile.dataset.img + '.png';
    tile.parentNode.className += ' disabled';

    if (tile.classList.contains('disabled') === false) {
      this.setState((prevState) => ({
        CurrentlyTurnedTiles: prevState.CurrentlyTurnedTiles + 1,
      }));
    }

  }

  renderCards() {
    const cards = [];
    for (var i = 0; i < this.state.Logos.length; i++) {
      cards.push(<GameCard cardClass={'card-' + i} image={this.state.Logos[i]} sendData={this.handleCard} key={i} />)
    }
    return cards;
  }

  render() {
    return (
      <div id="GameBoard">
        <WinningModal
          showModal={this.state.ShowWinningModal}
          scores={this.props}
        />
        {this.renderCards()}
      </div>

    );
  }
}

export default GameBoard;