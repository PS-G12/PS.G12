import React, { useState, useEffect } from "react";
import "./userDataRegister.css";

const UserDataRegister = () => {
    const [system, setSystem] = useState("metric");

    useEffect(() => {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((check) =>
          check.addEventListener("change", handleCheckboxChange)
        );
        return () => {
          checkboxes.forEach((check) =>
            check.removeEventListener("change", handleCheckboxChange)
          );
        };
    }, []);

    const handleCheckboxChange = (e) => {
        const marked = e.target.checked;
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((check) => (check.checked = false));
        e.target.checked = marked;
    };

    const typeOfSystem = (event) => {
        setSystem(event.target.value);
    };

    return (
        <div className="user-data-container">
            <div className="tittle-subtittle">
                <h1>Change your stats</h1>
                <h2>This way, we can track your progress</h2>
            </div>
            <div className="forms-user-data">
                <div className="measurement-system-user">
                    <div className="radio-button-metric">
                        <input type="checkbox" value='metric' checked onChange={typeOfSystem}></input>
                        <p>Metric System</p>
                    </div>
                    <div className="radio-button-imperial">
                        <input type="checkbox" value='imperial' onChange={typeOfSystem}></input>
                        <p>Imperial System</p>
                    </div>
                </div>
                <div className="form-user-actual-weight">
                    <form>
                        <label>{system === 'metric' ? 'Introduce your actual weight (Kg)' : 'Introduce your actual weight (lb)'}</label>
                    </form>
                    <input type="text" placeholder="weight"></input>
                </div>
                <div className="form-user-weight-goal">
                    <form>
                        <label>{system === 'metric' ? 'Introduce your weight goal (Kg)' : 'Introduce your weight goal (lb)'}</label>
                    </form>
                    <input type="text" placeholder="weight goal"></input>
                </div>
                <div className="form-user-age">
                    <form>
                        <label>Introduce your age</label>
                    </form>
                    <input type="text" placeholder="age"></input>
                </div>
            </div>
            <div className="drop-downs">
                <div className="goal-drop-down">
                    <select className="select-sex">
                        <option value='' selected>Select your fitness goal</option>
                        <option value='gain'>Gain Weight</option>
                        <option value='mantain'>Maintain weight</option>
                        <option value='lose'>Lose weight</option>
                    </select>
                </div>
                <div className="activity-drop-down">
                    <select className="select-physical-activity">
                        <option value='' selected>Select your physical activity</option>
                        <option value='sedentary'>Sedentary</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='intense'>Intense</option>
                    </select>
                </div>
            </div>
            <div className="buttons-confirm-cancel">
                <button className="button-cancel">Cancel</button>
                <button className="button-confirm">Confirm</button>
            </div>
        </div>
    );
};

export default UserDataRegister;
