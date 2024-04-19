import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import "./registerFood.css";

const FoodSearch = () => {
  const [desayuno, setDesayuno] = useState([]);
  const [almuerzo, setAlmuerzo] = useState([]);
  const [cena, setCena] = useState([]);
  const [aperitivos, setAperitivos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          getLocalData();
          return;
        }
        
        const response = await fetch('/user/data/food', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
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

  const setFoodData = (userData) => {
    console.log(userData);
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
  
    setDesayuno(desayunoData);
    setAlmuerzo(almuerzoData);
    setCena(cenaData);
    setAperitivos(aperitivosData);
  };
  

  const getLocalData = () => {
    const storedAlimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    console.log(JSON.stringify(storedAlimentos));
    
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  const mostrarComidasEnLista = (tipo, lista) => {
    return (
      <div className={`listado-${tipo.toLowerCase()}`} id="listado-items">
        <h2>{tipo}</h2>
        <ul>
          {lista.map((comida, index) => (
            <li key={index}>
              {capitalizeFirstLetter(comida.nombre)} - {comida.cantidad} grams
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button
            onClick={() =>
              (window.location.href = `/searchFood?type=${tipo.toLowerCase()}`)
            }
          >
            Add Food
          </button>
        </div>
      </div>
    );
  };
  

  return (
    <div className="registro-container">
      <Header isAuthenticated={isLoggedIn}/>
      <h1 id="listado-h1">Food List</h1>
      <div className="registro-box">
        {mostrarComidasEnLista("Breakfast", desayuno)}
        {mostrarComidasEnLista("Lunch", almuerzo)}
        {mostrarComidasEnLista("Dinner", cena)}
        {mostrarComidasEnLista("Snacks", aperitivos)}
      </div>
      <Footer />
    </div>
  );
};

export default FoodSearch;
