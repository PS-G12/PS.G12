import React, { useEffect, useState } from "react";
import './profile.css';
import UserStats from '../../components/ChangeUserStats/userDataRegister.js';
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"

const Profile = () => {
    const [fileSelected, setFileSelected] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [username, setUsername] = useState();
    const [formData, setFormData] = useState(
        {
            userData:{
                username: "",
                email: "",
                email_dup: "",
                password_old: "",
                password: "",
                password_dup: "",
            }
        }
    );

    useEffect(() => {
        const handleClick = () => {
            document.getElementById('file-input').click();
        };

        const handleChange = () => {
            var file = document.getElementById('file-input').files[0];
            if (file){
                console.log('Image selected');
                setFileSelected(true);
            }
            else{
                console.log('No image selected');
            }
        };

        document.getElementById('file-button').addEventListener('click', handleClick);
        document.getElementById('file-input').addEventListener('change', handleChange);

        return () => {
            document.getElementById('file-button').removeEventListener('click', handleClick);
            document.getElementById('file-input').removeEventListener('change', handleChange);
        };

    }, []);

    useEffect(() => {
        const userToken = sessionStorage.getItem('token');
        if (userToken){
          setLoggedIn(true);
          setToken(userToken);
        }
        else{
          setLoggedIn(false);
        }
    }, []);

    const handleChangeUsername = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                username: value
            }
        }));
    };

    const handleChangePasswordOld = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                password_old: value
            }
        }));
    };

    const handleChangePasswordNew = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                password: value
            }
        }));
    };

    const handleChangePasswordDup = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                password_dup: value
            }
        }));
    };

    const handleChangeNewEmail = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                email: value
            }
        }));
    };

    const handleChangeNewEmailDup = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                email_dup: value
            }
        }));
    };

    const changeUserData = async () => {
        try{
            const response = await fetch("/user/data/change", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ formData })
            });
    
            const data = await response.json();

            if (response.ok){
                console.log("Data sended correctly to the db: ", data);
                if (data.usernameChanged){
                    updateToken();
                    //window.location.reload();
                }
            }
            else{
                console.error("An error ocurred while sending the data: ", data);
            }
        }
        catch (error){
            console.error("An error ocurred while updating the users data: ", error);
            throw error;
        }
    };

    const updateToken = async () => {
        try{
            sessionStorage.removeItem('token');
            const response = await fetch("/user/data/update/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData })
            });

            const data = await response.json();

            if (response.ok){
                console.log("New token generated: ", data);
                sessionStorage.setItem("token", data.token);
            }
            else{
                console.error("An error ocurred while sending the data: ", data);
            }

        }
        catch (error){
            console.error('Run into an error updating the token: ', error);
        }
    }

    /*useEffect(() => {
        const getUsername = async () => {
            try{
                const response = await fetch("/user/data/username", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    },
                });
            
                const data = await response.json();
    
                if (response.ok && data){
                    const { username } = data;
                    setUsername(username);
                    return true;
                }
                else{
                    console.error('Could not fetch the username');
                    return false;
                }
            }
            catch (error){
                console.error('Run into an error while getting the users data:', error);
                throw error;
            }
        };
        getUsername();
    });*/

    return (
        <div className="profile-container">
            <Header isAuthenticated={isLoggedIn} />
            <div className="profile-data-container">
                <div className="profile-image-container">
                    <div className="profile-image"></div>
                    <h1>{username ? username : "Username"}</h1>
                    <div className="new-image">
                        <div className="img-buttons">
                            <button id='file-button'> Select image</button>
                            <span>{fileSelected === true ? 'Image selected' : ''}</span>
                            <button id='save-img' onClick={() => {setFileSelected(false);}}> Save image</button>
                        </div>
                        <input type="file" className="new-image-input" accept="image/*" id="file-input"></input>
                    </div>
                </div>
                <div className="forms-and-stats">
                    <div className="profile-forms">
                        <div className="change-nickname">
                            <form className="form-new-nickname">
                                <label>Introduce your new username</label>
                            </form>
                            <input type="text" placeholder="Username" value={formData.userData.username} onChange={handleChangeUsername}></input>
                        </div>
                        <div className="change-password">
                            <div className="old-password">
                                <form className="form-old-password">
                                    <label>Introduce the previous password</label>
                                </form>
                                <input type="password" placeholder="Old Password" pass value={formData.userData.password_old} onChange={handleChangePasswordOld}></input>
                            </div>
                            <div className="new-password">
                                <form className="form-new-password">
                                    <label>Introduce the new password</label>
                                </form>
                                <input type="password" placeholder="New Password" pass value={formData.userData.password} onChange={handleChangePasswordNew}></input>
                            </div>
                            <div className="repeat-new-password">
                                <form className="form-repeat-new-password">
                                    <label>Repeat the new password</label>
                                </form>
                                <input type="password" placeholder="New Password" pass value={formData.userData.password_dup} onChange={handleChangePasswordDup}></input>
                            </div>
                        </div>
                        <div className="change-email">
                            <div className="new-email">
                                <form className="form-new-email">
                                    <label>Introduce the new email</label>
                                </form>
                                <input type="email" placeholder="New Email" value={formData.userData.email} onChange={handleChangeNewEmail}></input>
                            </div>
                            <div className="repeat-new-email">
                                <form className="form-repeat-new-email">
                                    <label>Repeat the new email</label>
                                </form>
                                <input type="email" placeholder="New Email" value={formData.userData.email_dup} onChange={handleChangeNewEmailDup}></input>
                            </div>
                        </div>
                        <button className="applay-changes-button" onClick={changeUserData}>Applay Changes</button>
                    </div>
                    <UserStats className='user-stats'/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
