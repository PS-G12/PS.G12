import React, { useState } from "react";
import './macrosCalculator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFire, faCheese, faBreadSlice, faFish, faPlay } from '@fortawesome/free-solid-svg-icons'

function MacrosCalculator(){

    // Lectura de datos: system, height, age, weight, gender, physicalActivity y goal
    const [system, setSystem] = useState("metric");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("male");
    const [physicalActivity, setPhysicalActivity] = useState("sedentary");
    const [goal, setGoal] = useState("lose-weight");

    // Resultados de calorías, proteínas, carbohidratos y grasas
    const [resultCalories, setCalories] = useState("");
    const [resultProteins, setProteins] = useState("");
    const [resultCarbs, setCarbs] = useState("");
    const [resultFats, setFats] = useState("");

    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(check => check.addEventListener("change", function(e){
        let marked = e.target.checked;
        checkboxes.forEach(check => check.checked = false);
        e.target.checked = marked;
    }));

    const getAge = (event) => {
        setAge(event.target.value);
    };

    const getHeight = (event) => {
        setHeight(event.target.value);
    };

    const getWeight = (event) => {
        setWeight(event.target.value);
    };

    const typeOfSystem = (event) => {
        setSystem(event.target.value);
    }

    const getGender = (event) => {
        setGender(event.target.value);
    }

    const getPhysicalActivity = (event) => {
        setPhysicalActivity(event.target.value);
    }

    const getGoal = (event) => {
        setGoal(event.target.value);
    }

    const calculateMacros = (event) => {
        event.preventDefault();
        
        if (!height || !weight || !age) {
            alert('Please, fill-in each field.');
            return;
        }

        const sedentaryFactor = 1.2;
        const intermediateFactor = 1.375;
        const intenseFactor = 1.60;

        let heightUser = 0;
        let weightUser = 0;

        if (system === "imperial") {
            heightUser = parseFloat(height.replace(",", "."));
            weightUser = parseFloat(weight.replace(",", "."));
      
            heightUser = heightUser / 0.032808; //De pies a centimetros
            weightUser = weightUser / 2.2046; //De libras a kilos
        } else {
            heightUser = parseFloat(height);
            weightUser = parseFloat(weight.replace(",", "."));
        }



        let caloriesGoal;
        switch (goal) {
            case "gain-weight":
                caloriesGoal = 500; 
                break;
            case "lose-weight":
                caloriesGoal = -500; 
                break;
            case "maintain-weight":
            default:
                caloriesGoal = 0; 
                break;
        }
    
        let BMR; // Tasa goalbólica basal
        let physicalActivityFactor;
    
        // Calcular la BMR según el género
        if (gender === "male") {
            BMR = 10 * weightUser + 6.25 * heightUser - 5 * age + 5;
        } else {
            BMR = 10 * weightUser + 6.25 * heightUser - 5 * age - 161;
        }
    
        // Calcular el factor de physicalActivity
        if (physicalActivity === "sedentary") {
            physicalActivityFactor = sedentaryFactor;
        } else if (physicalActivity === "intermediate") {
            physicalActivityFactor = intermediateFactor;
        } else {
            physicalActivityFactor = intenseFactor;
        }

        
    
        // Calcular las calorías necesarias por día
        const calories = BMR * physicalActivityFactor + caloriesGoal;
        setCalories(calories.toFixed(2));
    
        // Calcular las proteínas necesarias
        const proteins = calories * 0.25 / 4; // En gramos
        setProteins(proteins.toFixed(2));
    
        // Calcular las grasas necesarias
        const fats = (calories * 0.25) / 9; // El 25% de las calorías diarias proviene de grasas
        setFats(fats.toFixed(2));
    
        // Calcular los carbohidratos necesarios
        const carbs = (calories - (proteins * 4) - (fats * 9)) / 4; // Los carbohidratos aportan 4 calorías por gramo
        setCarbs(carbs.toFixed(2));
    };

    return (
        <div className="macros-containercalc">
            <p>MACRONUTRIENTS AND CALORIES</p>
            <div className="intro">
                <span className="data1">Calculate the necessary macronutrients you should consume based on your height, weight, and goals.</span>
                <span className="data2">Choose a unit of measurement:</span>
                <div className="measurement-selection">
                    <label>
                        Imperial system
                        <input type="checkbox" value="imperial" onChange={typeOfSystem}></input>
                    </label>
                    <label>
                        Metric system
                        <input type="checkbox" defaultChecked value="metric" onChange={typeOfSystem}></input>
                    </label>
                </div>
            </div>
            <form>
                <div className="row1">
                    <div className="age-input">
                        <div className="age">
                            <label className="age-info">{"Age:"}</label>
                            <input type="text" placeholder="Age" className="input-age" value={age} onChange={getAge} required></input>
                        </div>
                    </div>
        
                    <div className="gender-input">
                        <div className="gender">
                            <label className="gender-info">{"Gender:"}</label>
                            <select id="gender-info" className="genders-info" value={gender} onChange={getGender}>
                                <option value="male">Male</option> 
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="height-input">
                        <div className="height">
                            <label className="height-info">{system === "imperial" ? "Height (ft):" : "Height (cm):"}</label>
                            <input type="text" placeholder="Height" className="input-height" value={height} onChange={getHeight} required></input>
                        </div>
                    </div>
        
                    <div className="weight-input">
                        <div className="weight">
                            <label className="weight-info">{system === "imperial" ? "Weight (lbs):" : "Weight (kg):"}</label>
                            <input type="text" placeholder="Weight" className="input-weight" value={weight} onChange={getWeight} required></input>
                        </div>
                    </div>
                </div>
                <div className="row2">
                    <div className="physicalActivity-input">
                        <div className="physicalActivity">
                            <label htmlFor="physicalActivity">Current Physical Activity:</label>
                            <select id="physicalActivity" className="input-physicalActivity" value={physicalActivity} onChange={getPhysicalActivity}>
                                <option value="sedentary">Sedentary</option> 
                                <option value="intermediate">Moderate</option>
                                <option value="intense">Intense</option>
                            </select>
                        </div>
                    </div>
        
                    <div className="goal-input">
                        <label className="goal-info">{"Goal:"}</label>
                        <ul>
                            <li><input type="radio" id="lose-weight" name="goal" value="lose-weight" checked={goal === "lose-weight"} onChange={getGoal}/><label htmlFor="lose-weight">Lose weight</label></li>
                            <li><input type="radio" id="maintain" name="goal" value="maintain" checked={goal === "maintain"} onChange={getGoal}/><label htmlFor="maintain">Keep weight</label></li>
                            <li><input type="radio" id="gain-weight" name="goal" value="gain-weight" checked={goal === "gain-weight"} onChange={getGoal}/><label htmlFor="gain-weight">Gain weight</label></li>
                        </ul>
                    </div>
                </div>
                <button className="calculateMacros" onClick={calculateMacros}>Calculate</button>
                <div className="result-macros">
                    <div className="result-label">The necessary macronutrients are:</div>
                    <div className="container-box">
                        <div className="box">
                            <FontAwesomeIcon icon={faFire} className="calories-icon" />
                            <p>Calories</p>
                            <p className="info" id="calories-info">{resultCalories} calories per day</p>
                        </div>
                        <div className="box">
                            <FontAwesomeIcon icon={faBreadSlice} className="carbs-icon" />
                            <p>Carbohydrates</p>
                            <p className="info" id="carbs-info">{resultCarbs} grams per day</p>
                        </div>
                        <div className="box">
                            <FontAwesomeIcon icon={faFish} className="proteins-icon" />
                            <p>Proteins</p>
                            <p className="info" id="proteins-info">{resultProteins} grams per day </p>
                        </div>
                        <div className="box">
                            <FontAwesomeIcon icon={faCheese} className="fats-icon" />
                            <p>Fats</p>
                            <p className="info" id="fats-info">{resultFats} grams per day</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MacrosCalculator;
