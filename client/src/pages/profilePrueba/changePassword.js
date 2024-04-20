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
        handlePreviousPasswordChange();
        handleNewPasswordChange();
        handleRepeatNewPasswordChange();
    };

    return (
        <div className="profile-box">
            <Header isAuthenticated={isLoggedIn}/>

            <div className="photo-table">
                <div className="photo-username-section">
                    <label htmlFor="upload-photo">
                        <img src={ "x" } alt="Descripción de la imagen"></img>
                    </label>

                    <ProfileNavBar/>
                
                </div>

                <div className="table-info-section">

                    <div className="username-section">
                        <h1>username</h1>
                        <h2>@username</h2>
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
                                                    onChange={handlePreviousPasswordChange} 
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
                                                    onChange={handleNewPasswordChange} 
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
                                                    onChange={handleRepeatNewPasswordChange} 
                                                    className="value-resetPassword" 
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

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
