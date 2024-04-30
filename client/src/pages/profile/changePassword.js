import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Header from "../../components/Header/header.js";
import "./changePassword.css";
import ProfileNavBar from "../../components/profileNavBar/profileNavBar.js";

const ChangePassword = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [tokenFetched, setTokenFetched] = useState(false);
    const [error, setError] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const [formData, setFormData] = useState(
        {
            userData:{
                username: "",
                passwordIn:"",
                passwordDb: "",
                passwordRepeat: "",
                pfp: "",
            }
        }
    );

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
                                pfp: data.userData.pfp
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



    const handlePreviousPasswordChange = (e) => {
        setPreviousPassword(e.target.value);

    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);



    };

    const handleRepeatNewPasswordChange = (e) => {
        setRepeatNewPassword(e.target.value);

    };


    
    const handleSaveClick = () => {
        setShowMessage(true);

        if( previousPassword && newPassword && repeatNewPassword ){

            formData.userData.passwordIn = newPassword;
            formData.userData.passwordDb = previousPassword;
            formData.userData.passwordRepeat = repeatNewPassword;


            const upDatePassword = async() => {
                try{
                    const response = await fetch("/user/data/update/info/pass", {
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                        body: JSON.stringify({formData})
                    });
            
                    const data = await response.json();
                    console.log(data);
            
                    if (response.ok && data){
                        console.log("Password updated correctly")
                        setCorrect("Password updated correctly");
                        return
                    }
                    else{
                        console.error("Could not fetch the users data");
                        setError("Password error");
                    }
                }
                catch (error){
                    console.error("Run into an error while getting the users data: ", error);
                    setError("Password error");
                    throw error;
                }
            }

            upDatePassword();

        }

    };

    return (
        <div className="profile-box">
            <Header isAuthenticated={isLoggedIn}/>

            <div className="photo-table">
                <div className="photo-username-section">
                    <label htmlFor="upload-photo">
                        <img src={formData.userData.pfp === '' ? "https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg" : formData.userData.pfp} alt="Descripción de la imagen"></img>
                    </label>

                    <ProfileNavBar/>
                
                </div>

                <div className="table-info-section">

                    <div className="username-section">
                        <h1>{formData.userData.username === null ? "username" : formData.userData.username}</h1>
                        <h2>{formData.userData.username === null ? "@username" : "@" + formData.userData.username}</h2>
                    </div>

                    <div className="tables-profile">
                        <div className="basic-info information-box-profile">
                            <h1>Reset Password</h1>
                            <div className="table-container-profile">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Previous Password</th>
                                            <td>
                                                <input 
                                                    type="password" 
                                                    value={previousPassword} 
                                                    onChange={(e) => handlePreviousPasswordChange(e)} 
                                                    className="value-resetPassword" 
                                                    />
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th>New Password</th>
                                            <td>
                                                <input 
                                                    type="password" 
                                                    value={newPassword} 
                                                    onChange={(e) => handleNewPasswordChange(e)} 
                                                    className="value-resetPassword" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Repeat New Password</th>
                                            <td>
                                                <input 
                                                    type="password" 
                                                    value={repeatNewPassword} 
                                                    onChange={(e) => handleRepeatNewPasswordChange(e)} 
                                                    className="value-resetPassword" 
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {showMessage && (
                            correct ? (
                                <p className="correct">
                                    <i className="success-icon fas fa-check-circle"></i>
                                    Password updated correctly
                                </p>
                            ) : (
                                <p className="error">
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    The previous password does not match or the proposed passwords do not match
                                </p>
                            )
                        )}

                        <button className="save-changePassword" onClick={handleSaveClick}>
                            <span className="icon-margin">
                                <FontAwesomeIcon icon={faSave} />
                            </span>
                            SAVE
                        </button>

                    </div>


                </div>
            </div>
        </div>

    );
}

export default ChangePassword;