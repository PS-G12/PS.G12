import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Header from "../../components/Header/header.js";
import "./profilePrueba.css";
import ProfileNavBar from "../../components/profileNavBar/profileNavBar.js";

const ProfilePrueba = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [selectedImage, setSelectedImage] = useState("");
    const [editedGender, setEditedGender] = useState("Male");
    //const [editedSystem, setEditedSystem] = useState("Metric");
    const [tokenFetched, setTokenFetched] = useState(false);

    const [formData, setFormData] = useState(
        {
            userData:{
                username: "",
                email: "",
                weight: "",
                height:"",
                kcalGoal:"",
                gender:"",
                age:"",
            }
        }
    );

    const [formDataUpdate, setFormDataUpdate] = useState(
        {
            userData:{
                username: "",
                email: "",
                weight: "",
                height:"",
                kcalGoal:"",
                gender:"",
                age:"",
            }
        }
    );

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file); 
        setSelectedImage(imageURL); 
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
            const getUserkcalGoal = async () => {
                try{
                    const response = await fetch("/user/data", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    const data = await response.json();
            
                    if (response.ok && data){
                        console.log(data);
                        setFormData(prevState => ({
                            ...prevState,
                            userData: {
                                ...prevState.userData,
                                kcalGoal: data.objectiveData.kcalObjective
                            }
                        }));
                    }
                    else{
                        console.error("Could not fetch the users kcal goal");
                    }
                }
                catch (error){
                    console.error("Run into an error while getting the user kcal goal: ", error);
                    throw error
                }
            };

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
                                email: data.userData.email,
                                weight: data.userData.weight,
                                height: data.userData.height,
                                gender: data.userData.gender,
                                age: data.userData.age
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

            getUserkcalGoal();
            getUserData();
        }
    }, [tokenFetched]);

    const updateUserData = async () => {
        try{
            const response = await fetch("/user/data/update/info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ formDataUpdate })
            });
    
            const data = await response.json();
    
            if (response.ok){
                console.log("Users data updated");
            }
            else{
                console.error("Could not update the users data");
            }
        }
        catch (error){
            console.error("Run into an error updating the data: ", error);
            throw error;
        }
    };

    const TableRow = ({ title, value, isSelector = false, options = [], onChange }) => {
        const [editMode, setEditMode] = useState(false);
        const [editedValue, setEditedValue] = useState(value);

        const showEditButton = title !== "x";

        const handleEditClick = () => {
            setEditMode(true);
        };

        const handleSaveClick = () => {
            setEditMode(false);
            switch (title) {
                case "UserName":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            username: editedValue
                        }
                    }));
                    break;
                case "Mail":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            email: editedValue
                        }
                    }));
                    break;
                case "Weight":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            weight: editedValue
                        }
                    }));
                    break;
                case "Height":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            height: editedValue
                        }
                    }));
                    break;
                case "Age":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            age: editedValue
                        }
                    }));
                    break;
                case "Kcals Goal":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            kcalGoal: editedValue
                        }
                    }));
                    break;
                case "Gender":
                    setFormDataUpdate(prevState => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            gender: editedValue
                        }
                    }));
                    break;
                default:
                    break;
            }
        };

        return (
<tr>
                <th>{title}</th>
                <td>
                    {editMode ? (
                        isSelector ? (
                            <select
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                className="input-edit-mode-input"
                            >
                                {options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                className="input-edit-mode"
                            />
                        )
                    ) : (
                        <p className="value">{value}</p>
                    )}

                    {showEditButton && (
                        editMode ? (
                            <button className="save" onClick={handleSaveClick}>
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        ) : (
                            <button className="edit" onClick={handleEditClick}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        )
                    )}
                </td>
            </tr>
        );
    };

    return (
        <div className="profile-box">
            <Header isAuthenticated={isLoggedIn}/>

            <div className="photo-table">
                <div className="photo-username-section">
                    <label htmlFor="upload-photo">
                        <img src={selectedImage ? selectedImage : "https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg"} alt="Descripción de la imagen"></img>
                    </label>
                    <input type="file" id="upload-photo" style={{display: "none"}} onChange={handleImageChange} />

                    <ProfileNavBar/>
                
                </div>

                <div className="table-info-section">

                    <div className="username-section">
                        <h1>{formData.userData.username === null ? "username" : formData.userData.username}</h1>
                        <h2>{formData.userData.username === null ? "@username" : "@" + formData.userData.username}</h2>
                    </div>

                    <div className="tables-profile">
                        <div className="basic-info information-box-profile">
                            <h1>Basic Info</h1>
                            <div className="table-container-profile">
                                <table>
                                    <tbody>
                                        <TableRow title="UserName" value={formData.userData.username === null ? "username" : formData.userData.username} />
                                        <TableRow title="Mail" value={formData.userData.email === null ? "mail@gmail.com" : formData.userData.email} />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="other-info information-box-profile">
                            <h1>Other Info</h1>
                            <div className="table-container-profile">
                                <table>
                                    <tbody>
                                        <TableRow title="Weight" value={formData.userData.weight === null ? "XX" : formData.userData.weight + " kg"} />
                                        <TableRow title="Height" value={formData.userData.height === null ? "XX" : formData.userData.height + " cm"} />
                                        <TableRow title="Age" value={formData.userData.age === null ? "XX" : formData.userData.age} />
                                        <TableRow title="Kcals Goal" value={formData.userData.kcalGoal === null ? "xxxx" : formData.userData.kcalGoal + " Kcal"} />
                                        <TableRow
                                            title="Gender"
                                            value={editedGender}
                                            isSelector={true}
                                            options={[
                                                "Male",
                                                "Female"]}
                                            onChange={setEditedGender}
                                        />
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

export default ProfilePrueba;
