import React, { useState, useEffect } from "react";
import { Card, CardContent } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import './macrosSpecificationCard.css';

Chart.register(ArcElement);



const MacrosSpecificationCard = ({ specificationName }) => {



  const [desayuno, setDesayuno] = useState([]);
  const [objectives, setObjectives] = useState(null);
  const [ObjectiveValue, setObjectiveValue] = useState(null);
  const [almuerzo, setAlmuerzo] = useState([]);
  const [cena, setCena] = useState([]);
  const [aperitivos, setAperitivos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  let specificName = '';
  let index = 0;

  switch (specificationName) {
    case 'calories':
      specificName = 'calorias';
      index = 0;
      break;
    case 'carbs':
      specificName = 'carbs';
      index = 1;
      break;
    case 'fats':
      specificName = 'fats';
      index = 2;
      break;
    case 'proteins':
      specificName = 'protein';
      index = 3;
      break;
    default:
      break;
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setLoading(false);
          setIsLoggedIn(false);
          getLocalData();
          return;
        }
        setLoading(true);
        const response = await fetch('/user/data/food', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setLoading(false);
        if (response.ok) {
          setIsLoggedIn(true);
          const data = await response.json();
          setFoodData(data);
        } else {
          setIsLoggedIn(false);
          getLocalData();
          throw new Error('User data not available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        getLocalData();
      }
    };

    fetchUserData();
  }, []);


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
        const objectives = [
          data.objectiveData.kcalObjective,
          data.objectiveData.carbsObjective,
          data.objectiveData.fatsObjective,
          data.objectiveData.proteinsObjective
        ];

        setObjectives(objectives);
        
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setLoading(false);
      });
    }

    
    setLoading(false);
  }, []);

  const setFoodData = (userData) => {
    const storedAlimentos = userData || [];

    const desayunoData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "breakfast"
    );
    const almuerzoData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "lunch"
    );
    const cenaData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "dinner"
    );
    const aperitivosData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "snacks"
    );

    setAlmuerzo(almuerzoData);
    setCena(cenaData);
    setAperitivos(aperitivosData);
    setDesayuno(desayunoData);
  };

  const getLocalData = () => {
    const storedAlimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    
    const desayunoData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "breakfast"
    );
    const almuerzoData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "lunch"
    );
    const cenaData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "dinner"
    );
    const aperitivosData = storedAlimentos.filter(
      (alimento) => alimento.typeComida === "snacks"
    );

    setDesayuno(desayunoData);
    setAlmuerzo(almuerzoData);
    setCena(cenaData);
    setAperitivos(aperitivosData);
  };

  const calcularTotales = (alimentos) => {
    return alimentos.reduce((totales, alimento) => {
      return {
        calorias: totales.calorias + (alimento.calorias || 0),
        fats: totales.fats + (alimento.fatTotal || 0),
        carbs: totales.carbs + (alimento.carbohydratesTotal || 0),
        protein: totales.protein + (alimento.protein || 0),
      };
    }, {
      calorias: 0,
      fats: 0,
      carbs: 0,
      protein: 0
    });
  };
  

  const getTotal = () =>{
    return desayunoTotal[specificName] + almuerzoTotal[specificName] + aperitivosTotal[specificName] + cenaTotal[specificName];
  }


  const desayunoTotal = calcularTotales(desayuno);
  const almuerzoTotal = calcularTotales(almuerzo);
  const aperitivosTotal = calcularTotales(aperitivos);
  const cenaTotal = calcularTotales(cena);

  const totals = [desayunoTotal, almuerzoTotal, aperitivosTotal, cenaTotal];
  const percentages = totals.map(total => Math.round((total[specificName] / getTotal()) * 100));

  useEffect(() => {
    if(objectives !== null){
      setObjectiveValue(objectives[index])
    } else {
      setObjectiveValue('')
    }
  }, [objectives]);


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
                  data: percentages,
                  backgroundColor: ['#4A93F4', '#196EE1', '#95BBEE', '#000000'],
                },
              ],
            }}
          />
        </div>

        <div className="specifications-per-categories">
          <CategoryDetail color="#4A93F4" title="Breakfast" percentage={`${percentages[0]}%`} />
          <CategoryDetail color="#196EE1" title="Lunch" percentage={`${percentages[1]}%`} />
          <CategoryDetail color="#000000" title="Dinner" percentage={`${percentages[3]}%`} />
          <CategoryDetail color="#95BBEE" title="Snacks" percentage={`${percentages[2]}%`} />
        </div>

        <div className="separator" />

        <div className="total-specifications">
          <SpecificationTitle title={`Total ${specificationName}`} />
          <SpecificationValue value={`${Math.round(getTotal())}`} />
        </div>

        <div className="separator" />

        <div className="goal-specifications">
          <SpecificationTitle title="Goal" />
          <SpecificationValue value={`${ObjectiveValue}`} />
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
