import React, { useEffect } from "react";
import './profile.css';
import UserStats from '../../components/ChangeUserStats/userDataRegister.js';
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"

const Profile = () => {
    useEffect(() => {
        const handleClick = () => {
            document.getElementById('file-input').click();
        };

        const handleChange = () => {
            var file = document.getElementById('file-input').files[0];
            if (file){
                console.log('Image selected');
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

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-data-container">
                <div className="profile-image-container">
                    <div className="profile-image"></div>
                    <h1>Username</h1>
                    <div className="new-image">
                        <button id='file-button'> Select image</button>
                        <input type="file" className="new-image-input" accept="image/*" id="file-input"></input>
                    </div>
                </div>
                <div className="forms-and-stats">
                    <div className="profile-forms">
                        <div className="change-nickname">
                            <form className="form-new-nickname">
                                <label>Introduce your new username</label>
                            </form>
                            <input type="text" placeholder="Username"></input>
                        </div>
                        <div className="change-password">
                            <div className="old-password">
                                <form className="form-old-password">
                                    <label>Introduce the previous password</label>
                                </form>
                                <input type="password" placeholder="Old Password" pass></input>
                            </div>
                            <div className="new-password">
                                <form className="form-new-password">
                                    <label>Introduce the new password</label>
                                </form>
                                <input type="password" placeholder="New Password"></input>
                            </div>
                            <div className="repeat-new-password">
                                <form className="form-repeat-new-password">
                                    <label>Repeat the new password</label>
                                </form>
                                <input type="password" placeholder="New Password"></input>
                            </div>
                            <button className="applay-changes-button">Applay Changes</button>
                        </div>
                    </div>
                    <UserStats className='user-stats'/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
