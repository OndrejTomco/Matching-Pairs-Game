import React, { Component } from 'react';
import './css/GameBoard.css';
import GameCard from './GameCard';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.handleCard = this.handleCard.bind(this);
    this.compareTiles = this.compareTiles.bind(this);
    this.state = {
      Logos: ['logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5', 'logo-6', 'logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5','logo-6'],
      Clicks: 0,
      TurnedTiles: []
    };

    this.state.Logos.sort(() =>  0.5 - Math.random() );
  }

  componentDidUpdate() {
    console.log(this.state)
    if (this.state.Clicks == 2) {
      this.disableCards();
      this.compareTiles();
    }

  }

  disableCards() {
    let logos = document.getElementsByClassName("card");
    let myArray = Array.from(logos);

    myArray.map((logo) => {
      if(logo.classList.contains('disabled') == false)
      logo.className += " disabled";;
    })
  }

  enableCards() {

    let logos = document.getElementsByClassName("disabled");
    let myArray = Array.from(logos);

    myArray.map((logo) => {
      if(logo.classList.contains('inactive') == false)
        logo.classList.remove('disabled');
    })
  }

  turnBack() {
    this.state.TurnedTiles.map((tile) => {
      console.log(tile);
      document.querySelector("." + tile.className + "").src = '/nhl-logo.png';
    })
    this.enableCards();

    this.setState((prevState) => ({
      Clicks: 0,
      TurnedTiles: []
    }));
  }


  compareTiles() {

    if (this.state.TurnedTiles[0].src == this.state.TurnedTiles[1].src) {
      this.state.TurnedTiles.map((tile) => {
        document.querySelector('.'+tile.className).parentNode.className += " inactive";
      })
      this.props.CallBack(true);

      setTimeout(() => {
        this.enableCards();
      }, 500);
      
    
      this.setState((prevState) => ({
        Clicks: 0,
        TurnedTiles: []
      }));

    } else {
      setTimeout(() => {
        this.turnBack()
      }, 1000);
    }
  }


  handleCard(element) {

    element.src = '/' + element.dataset.img + '.png';
    element.parentNode.className += ' disabled';

    if (element.classList.contains('disabled') == false) {
      this.setState((prevState) => ({
        Clicks: prevState.Clicks + 1,
        TurnedTiles: [...prevState.TurnedTiles, element]
      }));
    }

  }

  renderCards() {
    const cards = [];
    for (var i = 0; i < 12; i++) {
      cards.push(<GameCard cardClass={'card-' + i} image={this.state.Logos[i]} sendData={this.handleCard} />)
    }
    return cards;
  }

  render() {
    return (
      <div id="GameBoard">
        {this.renderCards()}
      </div>

    );
  }
}

export default GameBoard;