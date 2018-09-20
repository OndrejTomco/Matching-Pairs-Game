import React, { Component } from 'react';

class ChooseTile extends Component {

    constructor(props) {
        super(props)
        this.handleChooseTile.bind(this);
    }

    handleChooseTile(e) {
        console.log(e.target.parentNode);
        let formerSelected = Array.from(document.getElementsByClassName('selected'));

        //make others not selected
        formerSelected.forEach((el) => {
            el.classList.remove('selected');
            el.classList.add('notSelected');
        })

        //remove not Selected and make selected
        e.target.closest('.chooseTile').classList.remove('notSelected');
        e.target.closest('.chooseTile').classList.add('selected');

    }

    render(props) {
        return (
            <div className="choice-card">
                <div className='card chooseTile mb-3 p-2' id={this.props.topic.id} onClick={this.handleChooseTile}>
                    <img className="card-img-top" src={this.props.topic.src} width="100" alt="Card cap" />
                    <h5 className="card-title mt-2">{this.props.topic.title}</h5>
                </div>
            </div>

        )
    }
}

export default ChooseTile