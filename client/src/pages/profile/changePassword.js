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
    const [updateTookPlace, setUpdateTookPlace] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

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

    const [formDataUpdate, setFormDataUpdate] = useState({
        userData: {
          pfp: "",
        },
    });

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        try {
          const compressedFile = await compressImage(file, 800, 600, 0.8);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = function () {
            setSelectedImage(reader.result);
          };
          reader.onerror = function (error) {
            console.error(
              "Run into an error converting the image to base64: ",
              error
            );
          };
        } catch (error) {
          console.error("Error compressing the image:", error);
        }
    };

    const compressImage = (file, maxWidth, maxHeight, quality) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }

                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    "image/jpeg",
                    quality
                    );
                };
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    };

    useEffect(() => {
        if (selectedImage) {
          setFormDataUpdate((prevState) => ({
            ...prevState,
            userData: {
              ...prevState.userData,
              pfp: selectedImage,
            },
          }));
        }
    }, [selectedImage]);

    useEffect(() => {
        if (formDataUpdate.userData.pfp) {
          console.log("si entra al if de pfp");
          changePfp();
        }
    }, [formDataUpdate.userData.pfp]);
    
    const changePfp = async () => {
        try {
            const response = await fetch("/user/data/pfp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ formDataUpdate }),
            });

            const data = await response.json();

            if (response.ok && data) {
                console.log("Users profile picture updated");
                setUpdateTookPlace(true);
            }
            else {
                console.error("Could not update the users profile picture");
            }
        }
        catch (error) {
            console.error("Run into an error while changing the users profile picture", error);
            throw error;
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
    }, [tokenFetched, updateTookPlace]);



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
                    <label htmlFor="upload-photo" className="upload-photo-section-pass">
                        <img src={formData.userData.pfp === '' 
                            ? "https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg" 
                            : formData.userData.pfp} alt="Descripción de la imagen">
                        </img>
                        <img
                            src="edit.png"
                            alt="Editar"
                            className="edit-icon-pass"
                        />
                    </label>

                    <input
                        type="file"
                        id="upload-photo"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
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