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
    const [editedGender, setEditedGender] = useState("Male"); // Valor predeterminado
    const [editedSystem, setEditedSystem] = useState("Metric");

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

    const TableRow = ({ title, value, isSelector = false, options = [], onChange }) => {
        const [editMode, setEditMode] = useState(false);
        const [editedValue, setEditedValue] = useState(value);

        const showEditButton = title !== "x";

        const handleEditClick = () => {
            setEditMode(true);
        };

        const handleSaveClick = () => {
            setEditMode(false);
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
                        <h1>username</h1>
                        <h2>@username</h2>
                    </div>

                    <div className="tables-profile">
                        <div className="basic-info information-box-profile">
                            <h1>Basic Info</h1>
                            <div className="table-container-profile">
                                <table>
                                    <tbody>
                                        <TableRow title="UserName" value="TuNombreAquí" />
                                        <TableRow title="Mail" value="mail@gmail.com" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="other-info information-box-profile">
                            <h1>Other Info</h1>
                            <div className="table-container-profile">
                                <table>
                                    <tbody>
                                        <TableRow title="Weight" value="XX" />
                                        <TableRow title="Height" value="XX" />
                                        <TableRow title="Age" value="20" />
                                        <TableRow title="Kcals Goal" value="xxxx" />
                                        <TableRow
                                            title="Gender"
                                            value={editedGender}
                                            isSelector={true}
                                            options={[
                                                "Male",
                                                "Female",
                                                "Other",
                                                "Transgender Male",
                                                "Transgender Female",
                                                "Genderqueer",
                                                "Non-binary",
                                                "Agender",
                                                "Bigender",
                                                "Genderfluid",
                                                "Two-Spirit",
                                                "Questioning",
                                                "Prefer not to say",
                                                "Androgynous",
                                                "Neutrois",
                                                "Demiboy",
                                                "Demigirl",
                                                "Multigender",
                                                "Pangender",
                                                "Intergender",
                                                "Femandrogyne",
                                                "Mascanine",
                                                "Femuline",
                                                "Androgyne",
                                                "Epicene",
                                                "Ambigender",
                                                "Quoigender",
                                                "Libragender",
                                                "Exgender",
                                                "Ceterogender",
                                                "Novigender",
                                                "Fluxgender",
                                                "Nebulagender",
                                                "Aliengender",
                                                "Voidgender",
                                                "Galaxygender",
                                                "Stargender",
                                                "Mythogender",
                                                "Aerogender",
                                                "Hydrogender",
                                                "Pyrogender",
                                                "Terragender",
                                                "Lunagender",
                                                "Solargender",
                                                "Chronogender",
                                                "Technogender",
                                                "Robogender",
                                                "Pixelgender",
                                                "Cybergender",
                                                "Glowgender",
                                                "Toxicgender",
                                                "Cosmicgender",
                                                "Cryptogender",
                                                "Frostgender",
                                                "Flamegender",
                                                "Sparklegender",
                                                "Glitchgender",
                                                "Fantasygender",
                                                "Wondergender",
                                                "Dreamgender",
                                                "Mirrorgender",
                                                "Infinitygender",
                                                "Plasmagender",
                                                "Spectragender",
                                                "Radiogender",
                                                "Ultravioletgender",
                                                "Infraredgender",
                                                "Diamogender",
                                                "Crystalgender",
                                                "Marblegender",
                                                "Lavagender",
                                                "Crystallogender",
                                                "Vortexgender",
                                                "Echoicgender",
                                                "Sonogender",
                                                "Cacogender",
                                                "Aerogender",
                                                "Oceangender",
                                                "Meteorogender",
                                                "Zephyrgender",
                                                "Cyclonegender",
                                                "Monsoongender",
                                                "Tornadogender",
                                                "Hurricanegender",
                                                "Blizzardgender",
                                                "Avalanchegender",
                                                "Arcticgender",
                                                "Glaciergender",
                                                "Alpengender",
                                                "Polarisgender",
                                                "Auroragender",
                                                "Quasargender",
                                                "Nebulagender",
                                                "Supernovagender",
                                                "Blackholegender",
                                                "Neutrongender",
                                                "Photonogender",
                                                "Waviclegender",
                                                "Cosmogender",
                                                "Astrogender",
                                                "Starlightgender",
                                                "Galaxiagender",
                                                "Moonlightgender",
                                                "Sunlightgender",
                                                "Starburstgender",
                                                "Asteroidgender",
                                                "Nebulagender",
                                                "Milkywaygender",
                                                "Spacegender",
                                                "Aliengender",
                                                "Exoplanetgender",
                                                "Meteoritegender",
                                                "Saturngender",
                                                "Jupitergender",
                                                "Marsgender",
                                                "Earthgender",
                                                "Venusgender",
                                                "Plutogender",
                                                "Uranusgender",
                                                "Neptunegender",
                                                "Interstellargender",
                                                "Cosmicagender",
                                                "Cosmofluid",
                                                "Stellargender",
                                                "Galacticgender",
                                                "Meteorogender",
                                                "Meteoritogender",
                                                "Solarisgender",
                                                "Solgender",
                                                "Solargender",
                                                "Celestialgender",
                                                "Cometgender",
                                                "Spacestationgender",
                                                "Cosmonautgender",
                                                "Astronautgender",
                                                "Sputnikgender",
                                                "Lunargender",
                                                "Orbitgender",
                                                "Blackholegender",
                                                "Darkmattergender",
                                                "Supernovagender",
                                                "Quasargender",
                                                "Astrologender",
                                                "Telescopogender",
                                                "Observatorygender",
                                                "Galaxgender",
                                                "Planetarygender",
                                                "Constellationgender",
                                                "Cosmicgender",
                                                "Multiversegender",
                                                "Dimensiongender",
                                                "Extragalacticgender",
                                                "Nebulogender",
                                                "Voidgender",
                                                "Interdimensiongender",
                                                "Singularitygender",
                                                "Interplanetarygender",
                                                "Astrogender",
                                                "Supergender",
                                                "Hypergender"
                                            ]}
                                            

                                            onChange={setEditedGender}
                                        />
                                        <TableRow
                                            title="System"
                                            value={editedSystem}
                                            isSelector={true}
                                            options={["Metric", "Imperial"]}
                                            onChange={setEditedSystem}
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
