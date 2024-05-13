import React, { useState, useEffect } from "react";
import ProfileNavBar from "../../components/profileNavBar/profileNavBar.js";
import Header from "../../components/Header/header.js";
import FilterByTimeHistory from "../../components/filterByTimeHistory/filterByTimeHistory.js";
import { CSVLink } from "react-csv";
import "./history.css";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ProfileHistory = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [tokenFetched, setTokenFetched] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const [formData, setFormData] = useState(
        {
            userData: {
                username: "",
                pfp: "",
                weight: "",
            }
        }
    );

    const [formDataUpdate, setFormDataUpdate] = useState({
        userData: {
          pfp: "",
        },
    });

    const [history, setHistory] = useState([]);
    const [objetcLoaded, setObjectLoaded] = useState(false);
    const [dataObjects, setDataObjects] = useState([]);
    const [kcalObjective, setKcalObjective] = useState();

    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');
    const [classBtn, setClassBtn] = useState("");
    const [updateTookPlace, setUpdateTookPlace] = useState(false);
    
    const [filteredData, setFilteredData] = useState(dataObjects);

    const handleFilter = (filteredData) => {
        setFilteredData(filteredData);
    };

    const handleSort = (key) => {
        console.log(key)
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

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

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Historial");

        setClassBtn("downloaded");

        worksheet.columns = [
            { header: "Date", key: "userLastLogin", width: 15 },
            { header: "Kcal consumed", key: "kcalConsumed", width: 18 },
            { header: "Burned Kcal", key: "kcalBurned", width: 15 },
            { header: "Carbs consumed", key: "carbsConsumed", width: 18 },
            { header: "Proteínas consumed", key: "proteinsConsumed", width: 19 },
            { header: "Grasas consumed", key: "fatsConsumed", width: 18 },
            { header: "Water drank", key: "waterAmount", width: 15 },
            { header: "Weight", key: "weightProgression", width: 15 },
            { header: "Pulse", key: "pulseProgression", width: 15 }
        ];


        dataObjects.forEach(data => {
            const formattedData = {
                ...data,
                userLastLogin: data.userLastLogin === null ? 'XX/XX/XXXX' : new Date(data.userLastLogin).toLocaleDateString(),
                kcalBurned: data.kcalBurned === undefined ? 0 : data.kcalBurned,
                weightProgression: Object.keys(data.weightProgression).length === 0 
                    ? formData.userData.weight 
                    : data.weightProgression[Object.keys(data.weightProgression).reduce((a, b) => new Date(a) > new Date(b) ? a : b)] 
                    || 'XX',
                pulseProgression: Object.keys(data.pulseProgression).length === 0 
                    ? 'XX' 
                    : data.pulseProgression[Object.keys(data.pulseProgression).reduce((a, b) => new Date(a) > new Date(b) ? a : b)] 
                    || 'XX'
            };
            worksheet.addRow(formattedData);
        });


        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D0D0D0' } 
            };
            cell.font = {
                bold: true,
                color: { argb: '000000' } 
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            row.eachCell((cell) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });
        worksheet.eachRow({ includeEmpty: false }, (row) => {
            row.height = 20;
        });


        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "profile_history.xlsx");
        });

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setClassBtn("");
        }, 3000);
      
        
        return () => clearTimeout(timer);
    }, [classBtn]);

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
        if (tokenFetched) {

            const getUserData = async () => {
                try {
                    const response = await fetch("/user/data/info", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    const data = await response.json();

                    if (response.ok && data) {
                        setFormData(prevState => ({
                            ...prevState,
                            userData: {
                                ...prevState.userData,
                                username: data.userData.username,
                                pfp: data.userData.pfp,
                                weight: data.userData.weight
                            }
                        }));
                    }
                    else {
                        console.error("Could not fetch the users data");
                    }
                }
                catch (error) {
                    console.error("Run into an error while getting the users data: ", error);
                    throw error;
                }
            };

            const getHistory = async () => {
                try{
                    const response = await fetch("/user/data/history", {
                        method: "GET",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });
    
                    const data = await response.json();
    
                    if (response.ok && data){
                        const objectiveDataArray = data.map(item => item.objectiveData);
                        setHistory(objectiveDataArray);
                    }
                    else{
                        console.error("Could not fetch the users history");
                    }
                }
                catch (error){
                    console.error("Run into an error while getting the users history: ", error);
                    throw error;
                }
            };

            getUserData();
            getHistory();
        }
    }, [tokenFetched, updateTookPlace]);

    useEffect(() => {
        if (token){
          const getUserKcalGoal = async () => {
            try{
              const response = await fetch('/user/data/kcalGoal', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
        
              const data = await response.json();
        
              if (response.ok && data){
                setKcalObjective(data);
              }
              else{
                console.error('Could not get the users kcal goal');
              }
            }
            catch (error){
              console.error('The users kcal goal could not be obtained');
              throw error;
            }
          };
    
          getUserKcalGoal();
        }
    }, [token]);

    useEffect(() => {
        if (history.length > 0){
            //console.log("Aqui esta", history);
            setDataObjects(history);
        }
    }, [history]);

    useEffect(() => {
        if (dataObjects.length > 0){
            //console.log("susana", dataObjects);
            setObjectLoaded(true);
        }
    }, [dataObjects]);

    const sortedDataObjects = [...filteredData].sort((a, b) => {
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
            <Header isAuthenticated={isLoggedIn} />
            <div className="photo-table-history">
                <div className="photo-username-section-history">
                    <label htmlFor="upload-photo" className="upload-photo-section-history">
                        <img src={formData.userData.pfp === '' 
                            ? "https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg" 
                            : formData.userData.pfp} alt="Descripción de la imagen"
                        ></img>
                        <img
                            src="edit.png"
                            alt="Editar"
                            className="edit-icon-history"
                        />
                    </label>

                    <input
                        type="file"
                        id="upload-photo"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <ProfileNavBar />
                </div>
                <div className="table-info-section">
                    <div className="username-section">
                        <h1>{formData.userData.username === null ? "username" : formData.userData.username}</h1>
                        <h2>{formData.userData.username === null ? "@username" : "@" + formData.userData.username}</h2>
                    </div>
                    <div className="tables-history">
                        <div className="basic-info-history information-box-history">
                            <h1>History</h1>
                            <div className="botones-history">
                                {objetcLoaded && kcalObjective
                                    ? <FilterByTimeHistory data={dataObjects} kcalObjective={kcalObjective} onFilter={handleFilter}/> 
                                    : <p>Loading...</p>
                                }
                                <div className = {classBtn} id="btn-download" onClick={exportToExcel}>
                                <svg width="22px" height="16px" viewBox="0 0 22 16">
                                    <path d="M2,10 L6,13 L12.8760559,4.5959317 C14.1180021,3.0779974 16.2457925,2.62289624 18,3.5 L18,3.5 C19.8385982,4.4192991 21,6.29848669 21,8.35410197 L21,10 C21,12.7614237 18.7614237,15 16,15 L1,15" id="check"></path>
                                    <polyline points="4.5 8.5 8 11 11.5 8.5" className="svg-out"></polyline>
                                    <path d="M8,1 L8,11" className="svg-out"></path>
                                </svg>
                                
                            </div>
                                <a className="credit" href="https://dribbble.com/shots/4570587-Download-micro-interaction" target="_blank"><img src="https://cdn.dribbble.com/assets/logo-footer-hd-a05db77841b4b27c0bf23ec1378e97c988190dfe7d26e32e1faea7269f9e001b.png" alt=""></img></a>
                            </div>
                            <div className="table-container-history">
                                <table>
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleSort('userLastLogin')}>
                                                Date {renderSortIcon('userLastLogin')}
                                            </th>
                                            <th onClick={() => handleSort('kcalConsumed')}>
                                                Kcal consumed {renderSortIcon('kcalConsumed')}
                                            </th>
                                            <th onClick={() => handleSort('kcalBurned')}>
                                                Burned Kcal {renderSortIcon('kcalBurned')}
                                            </th>
                                            <th onClick={() => handleSort('carbsConsumed')}>
                                                Carbs consumed {renderSortIcon('carbsConsumed')}
                                            </th>
                                            <th onClick={() => handleSort('proteinsConsumed')}>
                                                Proteins consumed {renderSortIcon('proteinsConsumed')}
                                            </th>
                                            <th onClick={() => handleSort('fatsConsumed')}>
                                                Fats consumed {renderSortIcon('fatsConsumed')}
                                            </th>
                                            <th onClick={() => handleSort('waterAmount')}>
                                                Water drank {renderSortIcon('waterAmount')}
                                            </th>
                                            <th onClick={() => handleSort('weightProgression')}>
                                                Weight {renderSortIcon('weightProgression')}
                                            </th>
                                            <th onClick={() => handleSort('pulseProgression')}>
                                                Pulse {renderSortIcon('pulseProgression')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedDataObjects.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.userLastLogin === null ? 'XX/XX/XXXX' : new Date(data.userLastLogin).toLocaleDateString()}</td>
                                                <td>{data.kcalConsumed === null ? 'XX' : data.kcalConsumed}</td>
                                                <td>{data.kcalBurned === undefined ? 0 : data.kcalBurned}</td>
                                                <td>{data.carbsConsumed === null ? 'XX' : data.carbsConsumed}</td>
                                                <td>{data.proteinsConsumed === null ? 'XX' : data.proteinsConsumed}</td>
                                                <td>{data.fatsConsumed === null ? 'XX' : data.fatsConsumed}</td>
                                                <td>{data.waterAmount === null ? 'XX' : data.waterAmount / 1000}</td>
                                                <td>{Object.keys(data.weightProgression).length === 0 
                                                    ? formData.userData.weight 
                                                    : data.weightProgression[Object.keys(data.weightProgression).reduce((a, b) => new Date(a) > new Date(b) ? a : b)] 
                                                    || 'XX'}
                                                </td>
                                                <td>{Object.keys(data.pulseProgression).length === 0 
                                                    ? 'XX' 
                                                    : data.pulseProgression[Object.keys(data.pulseProgression).reduce((a, b) => new Date(a) > new Date(b) ? a : b)] 
                                                    || 'XX'}
                                                </td>
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