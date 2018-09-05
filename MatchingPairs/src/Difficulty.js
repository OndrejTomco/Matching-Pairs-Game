import React from 'react';
import './App.css';

const Difficulty = (props) => {
    return (
        <div className="mt-4">

            <div class="form-check form-check-inline">
            <span className="mr-3 font-weight-bold ">Difficulty:</span>
                <input class="form-check-input" type="radio" name="difficulty" id="inlineRadio1" value="8" />
                <label class="form-check-label" htmlFor="inlineRadio1">8 pairs</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="difficulty" id="inlineRadio2" value="10" defaultChecked />
                <label class="form-check-label" htmlFor="inlineRadio2">10 pairs</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="difficulty" id="inlineRadio3" value="12" />
                <label class="form-check-label" htmlFor="inlineRadio3">12 pairs</label>
            </div>
        </div>

    )
}

export default Difficulty;