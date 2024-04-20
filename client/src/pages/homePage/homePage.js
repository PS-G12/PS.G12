import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LineElement, PointElement } from 'chart.js';
import {LinearScale} from 'chart.js';
import 'chartjs-plugin-datalabels'; 
import Header from '../../components/Header/header';
import ObjectiveCard from '../../components/ObjectiveCard/ObjectiveCard';
import MacrosCard from '../../components/MacrosCard/macrosCard';
import Footer from '../../components/Footer/footer';
import './homePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faHeart } from "@fortawesome/free-solid-svg-icons";
Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const IndexPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [objectiveData, setObjectiveData] = useState({
    value: 0,
    kcalObjective: 0,
    food: 0,
    exercise: 0,
    remaining: 0
  });
  const [macrosData, setMacrosData] = useState({
    value: 0,
    max: 0,
    value2: 0,
    max2: 0,
    value3: 0,
    max3: 0
  });

  const [weightProgressionData, setWeightProgressionData] = useState({
    dates: [],
    weights: []
  });

  const [PulseProgressionData, setPulseProgressionData] = useState({
    dates: [],
    ratio: []
  });

  const [loading, setLoading] = useState(true);

  const [popupData, setPopupData] = useState(null);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token){
      setLoading(true);
      fetch('/user/data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("set loading false");
        if (response.ok) {
          setIsLoggedIn(true);
          return response.json();
        } else {
          setIsLoggedIn(false);
          throw new Error('User data not available');
        }
      })
      .then(data => {
        setLoading(false);
        console.log(data);
        setObjectiveData({
          value: data.objectiveData.kcalConsumed,
          kcalObjective: data.objectiveData.kcalObjective,
          food: data.objectiveData.kcalConsumed,
          exercise:0,
          remaining: data.objectiveData.kcalObjective - data.objectiveData.kcalConsumed
        });
        setMacrosData({
          value: data.objectiveData.carbsConsumed,
          max: data.objectiveData.carbsObjective,
          value2: data.objectiveData.fatsConsumed,
          max2: data.objectiveData.fatsObjective,
          value3: data.objectiveData.proteinsConsumed,
          max3: data.objectiveData.proteinsObjective,
        });
  
        let weightProgressionDates = []; 
        let weightProgressionWeights = []; 
        let pulseProgressionDates = []; 
        let pulseProgressionratio = []; 
  
        weightProgressionDates = Object.keys(data.objectiveData.weightProgression);
        weightProgressionWeights = Object.values(data.objectiveData.weightProgression);
        pulseProgressionDates = Object.keys(data.objectiveData.pulseProgression);
        pulseProgressionratio = Object.values(data.objectiveData.pulseProgression);
  
  
        
        setWeightProgressionData({
          dates: weightProgressionDates,
          weights: weightProgressionWeights
        });
  
        setPulseProgressionData({
          dates: pulseProgressionDates,
          ratio: pulseProgressionratio
        });
  
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleWeightChartClick = (event) => {
    const clickedDate = event.target.dataset.date;
    const defaultDate = new Date(clickedDate);
    const currentDate = new Date();
    if (defaultDate > currentDate) return; 

    const weightPopup = (
      <div className="weight-popup">
        <h3>Register your weight</h3>
        <form className="weight-form" onSubmit={handleSubmit}>
          <label htmlFor="weightDate">Date:</label>
          <input type="date" id="weightDate" name="weightDate" defaultValue={clickedDate} max={currentDate.toISOString().split('T')[0]} required />
          <label htmlFor="weight">Weight (Kg):</label>
          <input type="number" id="weight" name="weight" min="0" required />
          <div className="button-space">
            <button type="submit" className="submit-button">Submit</button>
            <button className="cancel-button" onClick={() => setPopupData(null)}>Cancel</button>
          </div>
        </form>
      </div>
    );
    

    
    setPopupData(weightPopup);
  };

  const handlePulseChartClick = (event) => {
    const clickedDate = event.target.dataset.date;
    const defaultDate = new Date(clickedDate);
    const currentDate = new Date();
    if (defaultDate > currentDate) return; 

    const pulsePopup = (
      <div className="pulse-popup">
        <h3>Register your pulse</h3>
        <form className="pulse-form" onSubmit={handleSubmit}>
          <label htmlFor="pulseDate">Date:</label>
          <input type="date" id="pulseDate" name="pulseDate" defaultValue={clickedDate} max={currentDate.toISOString().split('T')[0]} required />
          <label htmlFor="pulse">Pulse (Bpm):</label>
          <input type="number" id="pulse" name="pulse" min="0" required />
          <div className="button-space">
            <button type="submit" className="submit-button">Submit</button>
            <button className="cancel-button" onClick={() => setPopupData(null)}>Cancel</button>
          </div>
        </form>
      </div>
    );

    setPopupData(pulsePopup);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const weightDate = formData.get('weightDate');
    const weight = formData.get('weight');
    const pulseDate = formData.get('pulseDate');
    const pulse = formData.get('pulse');

    if (pulse > 0){
      const token = sessionStorage.getItem('token');
      if(token){
        fetch('/user/data/pulse', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({ pulseDate, pulse}) 
        })
        .then(response => {
          setPopupData(null); 
          window.location.reload();
        })
      }  
    } else if (weight > 0){
      const token = sessionStorage.getItem('token');
      if(token){
        fetch('/user/data/weight', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({ weightDate, weight}) 
        })
        .then(response => {
          setPopupData(null); 
          window.location.reload();
        })
      }
    }

  };
  

  const handleWeightChartClick = (event) => {
    const clickedDate = event.target.dataset.date;
    const defaultDate = new Date(clickedDate);
    const currentDate = new Date();
    if (defaultDate > currentDate) return; 

    const weightPopup = (
      <div className="weight-popup">
        <h3>Register your weight</h3>
        <form className="weight-form" onSubmit={handleSubmit}>
          <label htmlFor="weightDate">Date:</label>
          <input type="date" id="weightDate" name="weightDate" defaultValue={clickedDate} max={currentDate.toISOString().split('T')[0]} required />
          <label htmlFor="weight">Weight (Kg):</label>
          <input type="number" id="weight" name="weight" min="0" required />
          <div className="button-space">
            <button type="submit" className="submit-button">Submit</button>
            <button className="cancel-button" onClick={() => setPopupData(null)}>Cancel</button>
          </div>
        </form>
      </div>
    );
    

    
    setPopupData(weightPopup);
  };

  const handlePulseChartClick = (event) => {
    const clickedDate = event.target.dataset.date;
    const defaultDate = new Date(clickedDate);
    const currentDate = new Date();
    if (defaultDate > currentDate) return; 

    const pulsePopup = (
      <div className="pulse-popup">
        <h3>Register your pulse</h3>
        <form className="pulse-form" onSubmit={handleSubmit}>
          <label htmlFor="pulseDate">Date:</label>
          <input type="date" id="pulseDate" name="pulseDate" defaultValue={clickedDate} max={currentDate.toISOString().split('T')[0]} required />
          <label htmlFor="pulse">Pulse (Bpm):</label>
          <input type="number" id="pulse" name="pulse" min="0" required />
          <div className="button-space">
            <button type="submit" className="submit-button">Submit</button>
            <button className="cancel-button" onClick={() => setPopupData(null)}>Cancel</button>
          </div>
        </form>
      </div>
    );

    setPopupData(pulsePopup);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const weightDate = formData.get('weightDate');
    const weight = formData.get('weight');
    const pulseDate = formData.get('pulseDate');
    const pulse = formData.get('pulse');

    if (pulse > 0){
      const token = sessionStorage.getItem('token');
      if(token){
        fetch('/user/data/pulse', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({ pulseDate, pulse}) 
        })
        .then(response => {
          setPopupData(null);
          window.location.reload();
        })
      }  
    } else if (weight > 0){
      const token = sessionStorage.getItem('token');
      if(token){
        fetch('/user/data/weight', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({ weightDate, weight}) 
        })
        .then(response => {
          setPopupData(null);
          window.location.reload();
        })
      }
    }

  };
  
  return (
    <div className="index-page">
      <Header isAuthenticated={isLoggedIn} />
      {loading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {isLoggedIn ? (
            <div className="cards">

                <ObjectiveCard
                  value={objectiveData.remaining === parseFloat(objectiveData.kcalObjective) ? 0 : (objectiveData.remaining / objectiveData.kcalObjective) * 100} 
                  kcalObjective={objectiveData.kcalObjective} 
                  food={objectiveData.food} 
                  exercise={objectiveData.exercise} 
                  remaining={objectiveData.remaining} 
                />

                <MacrosCard 
                  value={macrosData.value} 
                  max={macrosData.max} 
                  value2={macrosData.value2} 
                  max2={macrosData.max2} 
                  value3={macrosData.value3} 
                  max3={macrosData.max3}
                />

              <div className="chart-container" onClick={handleWeightChartClick}>
                <p> Your Weight Progression <FontAwesomeIcon icon={faDumbbell} /></p>
                <Line
                  data={{
                    labels: weightProgressionData.dates, 
                    datasets: [
                      {
                        label: 'Weight Progression', 
                        data: weightProgressionData.weights, 
                        fill: false, 
                        borderColor: 'rgb(75, 192, 192)', 
                        tension: 0.1 
                      }
                    ]
                  }}
                  options={{
                    plugins: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      legend: {
                        display: true
                      }
                    }
                  }}
                />
              </div>
              <div className="chart-container2" onClick={handlePulseChartClick}>
                <p>Your Pulse Progression <FontAwesomeIcon icon={faHeart} /></p>
                <Line
                  data={{
                    labels: PulseProgressionData.dates, 
                    datasets: [
                      {
                        label: 'Pulse Progression', 
                        data: PulseProgressionData.ratio, 
                        fill: false, 
                        borderColor: 'rgb(12, 374, 12)', 
                        tension: 0.1 
                      }
                    ]
                  }}
                  options={{
                    plugins: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      legend: {
                        display: true
                      }
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="cards default">
              <div className="message-block">
                <span role="img" aria-label="lock" className="lock-icon">&#x1F512;</span>
                <p>Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to access this content.</p>
              </div>
              <div className="blur-content">
                <ObjectiveCard value={50} kcalObjective={2000} food={0} exercise={0} remaining={1000} />
                <MacrosCard value={60} max={150} value2={40} max2={50} value3={30} max3={80}/>
              </div>
            </div>
          )}
          <Footer />
          {popupData && popupData}
        </>
      )}
    </div>
  );
  
};

export default IndexPage;
