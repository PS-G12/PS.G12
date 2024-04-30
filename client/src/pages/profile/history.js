import React, { useState, useEffect } from "react";
import ProfileNavBar from "../../components/profileNavBar/profileNavBar.js";
import Header from "../../components/Header/header.js";
import FilterByTimeHistory from "../../components/filterByTimeHistory/filterByTimeHistory.js";
import "./history.css";

const ProfileHistory = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [tokenFetched, setTokenFetched] = useState(false);

    const [formData, setFormData] = useState(
        {
            userData:{
                username: "",
                passwordIn:"",
                passwordDb: "",
                passwordRepeat: "",
            }
        }
    );

    const dataObjects = [
        {
            date: "01/04/2024",
            value1: 2000,
            value2: 300,
            value3: 250,
            value4: 100,
            value5: 80,
            measurement1: "2L",
            measurement2: "70kg",
            measurement3: 80
        },
        {
            date: "02/04/2024",
            value1: 1800,
            value2: 280,
            value3: 220,
            value4: 90,
            value5: 70,
            measurement1: "1.5L",
            measurement2: "65kg",
            measurement3: 75
        },
        {
            date: "03/04/2024",
            value1: 2100,
            value2: 320,
            value3: 220,
            value4: 110,
            value5: 90,
            measurement1: "2.2L",
            measurement2: "72kg",
            measurement3: 85
        },
        {
            date: "04/04/2024",
            value1: 1900,
            value2: 290,
            value3: 230,
            value4: 95,
            value5: 75,
            measurement1: "1.7L",
            measurement2: "68kg",
            measurement3: 80
        },
        {
            date: "05/04/2024",
            value1: 2200,
            value2: 330,
            value3: 280,
            value4: 120,
            value5: 100,
            measurement1: "2.5L",
            measurement2: "75kg",
            measurement3: 90
        },
        // Agrega más objetos según sea necesario
    ];
    

      const [sortBy, setSortBy] = useState('date');
      const [sortOrder, setSortOrder] = useState('asc');
  
      const handleSort = (key) => {
          if (sortBy === key) {
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
              setSortBy(key);
              setSortOrder('asc');
          }
      };

      


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setToken(token);
            fetch('/verify-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    setIsLoggedIn(true);
                    setTokenFetched(true);
                } else {
                    setIsLoggedIn(false);
                    console.error('Invalid token');
                }
            })
            .catch(error => {
                console.error('Error verifying token:', error);
            });
        }
        else {
            console.error('Could not find the token, user not authenticated');
        }
    }, []);

    useEffect(() => {
        if (tokenFetched){

            const getUserData = async () => {
                try{
                    const response = await fetch("/user/data/info", {
                        method: "GET",
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    const data = await response.json();
            
                    if (response.ok && data){
                        setFormData(prevState => ({
                            ...prevState,
                            userData: {
                                ...prevState.userData,
                                username: data.userData.username,
                            }
                        }));
                    }
                    else{
                        console.error("Could not fetch the users data");
                    }
                }
                catch (error){
                    console.error("Run into an error while getting the users data: ", error);
                    throw error;
                }
            };

            getUserData();
        }
    }, [tokenFetched]);



    const sortedDataObjects = [...dataObjects].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        if (valueA < valueB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const renderSortIcon = (columnKey) => {
        if (sortBy === columnKey) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return '-';
    };

    return (
        <div className="profile-box-history">
            <Header isAuthenticated={isLoggedIn}/>
            <div className="photo-table-history">
                <div className="photo-username-section-history">
                    <label htmlFor="upload-photo">
                        <img src="https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg" alt="Descripción de la imagen"></img>
                    </label>
                    <ProfileNavBar/>
                </div>
                <div className="table-info-section">
                    <div className="username-section">
                        <h1>{formData.userData.username === null ? "username" : formData.userData.username}</h1>
                        <h2>{formData.userData.username === null ? "@username" : "@" + formData.userData.username}</h2>
                    </div>
                    <div className="tables-history">
                        <div className="basic-info-history information-box-history">
                            <h1>History</h1>
                            <FilterByTimeHistory/>
                            <div className="table-container-history">
                                <table>
                                    <thead>
                                        <tr>
                                        <th onClick={() => handleSort('date')}>
                                                Fecha {renderSortIcon('date')}
                                            </th>
                                            <th onClick={() => handleSort('value1')}>
                                                Kcal llegadas {renderSortIcon('value1')}
                                            </th>
                                            <th onClick={() => handleSort('value2')}>
                                                Kcal quemadas {renderSortIcon('value2')}
                                            </th>
                                            <th onClick={() => handleSort('value3')}>
                                                Carbs llegados {renderSortIcon('value3')}
                                            </th>
                                            <th onClick={() => handleSort('value4')}>
                                                Proteínas llegadas {renderSortIcon('value4')}
                                            </th>
                                            <th onClick={() => handleSort('value5')}>
                                                Grasas llegadas {renderSortIcon('value5')}
                                            </th>
                                            <th onClick={() => handleSort('measurement1')}>
                                                Agua {renderSortIcon('measurement1')}
                                            </th>
                                            <th onClick={() => handleSort('measurement2')}>
                                                Peso {renderSortIcon('measurement2')}
                                            </th>
                                            <th onClick={() => handleSort('measurement3')}>
                                                Pulsaciones {renderSortIcon('measurement3')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedDataObjects.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.date}</td>
                                                <td>{data.value1}</td>
                                                <td>{data.value2}</td>
                                                <td>{data.value3}</td>
                                                <td>{data.value4}</td>
                                                <td>{data.value5}</td>
                                                <td>{data.measurement1}</td>
                                                <td>{data.measurement2}</td>
                                                <td>{data.measurement3}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHistory;