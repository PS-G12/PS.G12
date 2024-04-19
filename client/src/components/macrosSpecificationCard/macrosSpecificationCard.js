import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import './macrosSpecificationCard.css'

Chart.register(ArcElement);

const MacrosSpecificationCard = ({specificationName}) => {
  return (
    
    <div class="card">
        <div class="card-content">
            <div className="pie-chart">
                <Pie
                    data={{
                    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
                    datasets: [
                        {
                        label: '# of votes',
                        data: [19, 41, 19, 21],
                        backgroundColor: ['#4A93F4', '#196EE1', '#000000', '#95BBEE'],
                        },
                    ],
                    }}
                />
            </div>

                    
            <div className="specifications-per-categories">
                <div className="category-details breakfast-details">
                    <div class="color-square"></div>
                    <div class="text">
                        <h1>Breakfast</h1>
                        <h2>19%(Prueba)</h2>
                    </div>
                </div>

                <div className="category-details lunch-details">
                    <div class="color-square"></div>
                    <div class="text">
                        <h1>Lunch</h1>
                        <h2>47%(Prueba)</h2>
                    </div>
                </div>

                <div className="category-details dinner-details">
                    <div class="color-square"></div>
                    <div class="text">
                        <h1>Dinner</h1>
                        <h2>19%(Prueba)</h2>
                    </div>
                </div>

                <div className="category-details snacks-details">
                    <div class="color-square"></div>
                    <div class="text">
                        <h1>Snacks</h1>
                        <h2>19%(Prueba)</h2>
                    </div>
                </div>
            </div>

            <div className="separator"></div>

            <div className="total-specifications">
                <h1>Total {specificationName}</h1>
                <h2>XXXX</h2>
            </div>

            <div className="separator"></div>
            
            <div className="goal-specifications">
                <h1>Goal</h1>
                <h2>XXXX</h2>
            </div>

        </div>
    </div>
  );
};

export default MacrosSpecificationCard;
