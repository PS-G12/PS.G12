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
  
  const navigate = useNavigate();

  const handleObjectiveCardClick = () => {
    navigate('/calories');
  };

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
        setLoading(false);
        if (response.ok) {
          setIsLoggedIn(true);
          return response.json();
        } else {
          setIsLoggedIn(false);
          throw new Error('User data not available');
        }
      })
      .then(data => {
        console.log(data);
        setObjectiveData({
          value: data.objectiveData.kcalConsumed,
          kcalObjective: data.objectiveData.kcalObjective,
          //food: data.objectiveData.food,
          //exercise: data.objectiveData.exercise,
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
    }
    setLoading(false);
  }, []);
  
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

              <div className="chart-container">
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
              <div className="chart-container2">
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
        </>
      )}
    </div>
  );
  
};

export default IndexPage;
