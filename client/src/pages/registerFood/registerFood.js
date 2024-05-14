import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./registerFood.css";

const FoodSearch = () => {
  const [desayuno, setDesayuno] = useState([]);
  const [almuerzo, setAlmuerzo] = useState([]);
  const [cena, setCena] = useState([]);
  const [aperitivos, setAperitivos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Hola");
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
        } else if (response.status === 401) {
          setIsLoggedIn(false);
          getLocalData();
          throw new Error('User data not available');
        } else {
          setIsLoggedIn(true);
          getLocalData();
          throw new Error('User data not available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(true);
        getLocalData();
      }
    };
  
    fetchUserData();
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


    console.log("ENTRO");
  
    setDesayuno(desayunoData);
    setAlmuerzo(almuerzoData);
    setCena(cenaData);
    setAperitivos(aperitivosData);
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

    console.log("entro aqiu y no debo");
    setDesayuno(desayunoData);
    setAlmuerzo(almuerzoData);
    setCena(cenaData);
    setAperitivos(aperitivosData);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      window.location.href = `/searchFood?type=none&query=${searchQuery.toLowerCase()}`;
    }
  };

  
  const mostrarComidasEnLista = (tipo, lista) => {
    const handleDelete = (index) => {      

      const token = sessionStorage.getItem("token");
      const updatedList = [...lista.slice(0, index), ...lista.slice(index + 1)];
      const nameElementToDelete = lista[index].nombre;
      const elementToDelete = lista[index];
      console.log(nameElementToDelete)

      if (token) {
        fetch("/api/food/delete", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre: nameElementToDelete, tipo: tipo, alimento: elementToDelete}),
        })
          .then((response) => {
            if (response.ok) {
              setIsLoggedIn(true);
              switch (tipo) {
                case "Breakfast":
                  setDesayuno(updatedList);
                  console.log("este es el desayuno", updatedList);
                  console.log("este es el desayuno", desayuno);
                  break;
                case "Lunch":
                  setAlmuerzo(updatedList);
                  break;
                case "Dinner":
                  setCena(updatedList);
                  break;
                case "Snacks":
                  setAperitivos(updatedList);
                  break;
                default:
                  break;
              }
            } else {
              setIsLoggedIn(false);
              console.error("Invalid token");
            }
          })
          .catch((error) => {
            console.error("Error verifying token:", error);
          });
      } else {
        console.error("Could not find the token, user not authenticated");
      }


    };
  
    return (
      <div className={`listado-${tipo.toLowerCase()}`} id="listado-items">
        <h2>{tipo}</h2>
        <ul>
          {lista.map((comida, index) => (
            <li key={index}>
              {
              capitalizeFirstLetter(comida.nombre)} - {comida.cantidad} grams
              <button onClick={() => handleDelete(index)}><FontAwesomeIcon icon={faTimes} /></button>
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
      {loading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        <>
        <div className="searchbar">
        <div id="form" className="searchbar-container">
          <input
            type="text"
            placeholder="Enter search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="searchButton">
            <svg viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 
              36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 
              312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 
              263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 
              218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 
              0-218.455 97.091-218.455 218.455z"></path>
            </svg>
          </button>
        </div>
      </div>
          <h1 id="listado-h1">Food List</h1>
          <div className="registro-box">
            {mostrarComidasEnLista("Breakfast", desayuno)}
            {mostrarComidasEnLista("Lunch", almuerzo)}
            {mostrarComidasEnLista("Dinner", cena)}
            {mostrarComidasEnLista("Snacks", aperitivos)}
          </div>
          <Footer />
        </>
      )}
    </div>
  );  
};

export default FoodSearch;
