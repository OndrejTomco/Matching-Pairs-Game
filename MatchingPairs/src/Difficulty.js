import React from 'react';
import './App.css';

const Difficulty = (props) => {
    return (
        <div className="mt-4">

            <div className="form-check form-check-inline">
            <span className="mr-3 font-weight-bold ">Difficulty:</span>
                <input className="form-check-input" type="radio" name="difficulty" id="inlineRadio1" value="8" />
                <label className="form-check-label" htmlFor="inlineRadio1">8 pairs</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="inlineRadio2" value="10" defaultChecked />
                <label className="form-check-label" htmlFor="inlineRadio2">10 pairs</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="inlineRadio3" value="12" />
                <label className="form-check-label" htmlFor="inlineRadio3">12 pairs</label>
            </div>
        </div>

    )
}

export default Difficulty;