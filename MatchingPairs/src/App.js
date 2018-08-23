import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.ValidateInput= this.ValidateInput.bind(this);

    this.state = {
      didMount: false,
      playerName: null,
      Redirect:false
  
    }
}
 

  componentDidMount() {
    setTimeout(() => {
      this.setState({ didMount: true })
    }, 0)
  }

  ValidateInput(e, props) {

    let playerName = document.getElementById('playerName').value;
    if (playerName.trim().length < 1) {
      e.preventDefault();
      document.getElementById('validation-error').classList.add('d-block');
    } else {
        this.setState({
          redirect: true,
          playerName: playerName
        })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/singleplayer/'+this.state.playerName} />
    }
  }

  render() {
    return (
      <div className={`intro slide-in ${this.state.didMount && 'visible'}`}>
        <h1 className="display-1 header mb-4">MATCHING PAIRS</h1>

        <div className="md-form mt-5">

          <input type="text" id="playerName" placeholder="NickName" className="form-control form-control-lg d-inline-block col-md-3 col-sm-6 col-10" />
          <small className="d-none text-danger" id="validation-error">Enter valid NickName</small>
        </div>

        <div className="mt-5">
        {this.renderRedirect()}

          <a onClick={this.ValidateInput} className="btn btn-outline-primary"><i class="fas fa-play mr-3"></i>Single player</a>
          <Link to="/multiplayer" className="btn btn-outline-deep-purple"><i className="fas fa-play mr-3"></i>Multi player</Link>
        </div>

      </div>

    );
  }
}

export default App;
