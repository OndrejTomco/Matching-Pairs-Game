import React from 'react';
import './css/GameBoard.css';

class AsideOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = { Score: 0 };
    }

    render(props) {
        return (
            <div className="options col" >
                <ul className="list-group">
                    <li className=" h2 list-group-item d-flex justify-content-between align-items-center">
                        Points:
                <span className="badge badge-primary">{this.props.Score}</span>
                    </li>
                    <li className=" h2 list-group-item d-flex justify-content-between align-items-center">
                        {}
                    </li>

                </ul>
            </div>
        )
    }

}

export default AsideOptions