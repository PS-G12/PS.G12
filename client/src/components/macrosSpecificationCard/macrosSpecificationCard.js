import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import './macrosSpecificationCard.css';

Chart.register(ArcElement);

const MacrosSpecificationCard = ({ specificationName }) => {
  return (
    <div className="card">
      <CardContent>
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
          <CategoryDetail color="#4A93F4" title="Breakfast" percentage="19%" />
          <CategoryDetail color="#196EE1" title="Lunch" percentage="47%" />
          <CategoryDetail color="#000000" title="Dinner" percentage="19%" />
          <CategoryDetail color="#95BBEE" title="Snacks" percentage="19%" />
        </div>

        <div className="separator" />

        <div className="total-specifications">
          <SpecificationTitle title={`Total ${specificationName}`} />
          <SpecificationValue value="XXXX" />
        </div>

        <div className="separator" />

        <div className="goal-specifications">
          <SpecificationTitle title="Goal" />
          <SpecificationValue value="XXXX" />
        </div>
      </CardContent>
    </div>
  );
};

const CategoryDetail = ({ color, title, percentage }) => {
  return (
    <div className="category-details">
      <div className="color-square" style={{ backgroundColor: color }} />
      <div className="text">
        <h1>{title}</h1>
        <h2>{percentage}</h2>
      </div>
    </div>
  );
};

const SpecificationTitle = ({ title }) => {
  return <h1 className="specification-title">{title}</h1>;
};

const SpecificationValue = ({ value }) => {
  return <h2 className="specification-value">{value}</h2>;
};

export default MacrosSpecificationCard;
