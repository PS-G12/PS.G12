import React, { useState, useEffect } from "react";
import ProfileNavBar from "../../components/profileNavBar/profileNavBar.js";
import Header from "../../components/Header/header.js";
import "./history.css";

const ProfileHistory = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [tokenFetched, setTokenFetched] = useState(false);

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


    return (
        <div className="profile-box">
            <Header isAuthenticated={isLoggedIn}/>

            <div className="photo-table">
                <div className="photo-username-section">
                    <label htmlFor="upload-photo">
                        <img src="https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg" alt="Descripción de la imagen"></img>
                    </label>

                    <ProfileNavBar/>
                
                </div>
                
                <div className="tables-history">
                    <div className="basic-info information-box-history">
                        <h1>History</h1>
                        <div className="table-container-history">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Kcal llegadas</th>
                                        <th>Kcal quemadas</th>
                                        <th>Carbs llegados</th>
                                        <th>Proteínas llegadas</th>
                                        <th>Grasas llegadas</th>
                                        <th>Agua</th>
                                        <th>Peso</th>
                                        <th>Pulsaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01/04/2024</td>
                                        <td>2000</td>
                                        <td>300</td>
                                        <td>250</td>
                                        <td>100</td>
                                        <td>80</td>
                                        <td>2L</td>
                                        <td>70kg</td>
                                        <td>80</td>
                                    </tr>
                                    <tr>
                                        <td>01/04/2024</td>
                                        <td>2000</td>
                                        <td>300</td>
                                        <td>250</td>
                                        <td>100</td>
                                        <td>80</td>
                                        <td>2L</td>
                                        <td>70kg</td>
                                        <td>80</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHistory;
