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

    const [formData, setFormData] = useState(
        {
            userData: {
                username: "",
                passwordIn: "",
                passwordDb: "",
                passwordRepeat: "",
                pfp: "",
                weight: "",
                kcalConsumed: "",
                carbsConsumed: "",
                proteinsConsumed: "",
                fatsConsumed: "",
                waterAmount: "",
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
    const [classBtn, setClassBtn] = useState("");
    

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Historial");

        setClassBtn("downloaded");

        // Agregar encabezados de columnas y anchos de columna
        worksheet.columns = [
            { header: "Fecha", key: "date", width: 15 },
            { header: "Kcal llegadas", key: "value1", width: 15 },
            { header: "Kcal quemadas", key: "value2", width: 15 },
            { header: "Carbs llegados", key: "value3", width: 15 },
            { header: "Proteínas llegadas", key: "value4", width: 15 },
            { header: "Grasas llegadas", key: "value5", width: 15 },
            { header: "Agua", key: "measurement1", width: 15 },
            { header: "Peso", key: "measurement2", width: 15 },
            { header: "Pulsaciones", key: "measurement3", width: 15 }
        ];

        // Agregar datos
        dataObjects.forEach(data => {
            worksheet.addRow(data);
        });

        // Aplicar formato estético al encabezado
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D0D0D0' } // Color de gris 
            };
            cell.font = {
                bold: true,
                color: { argb: '000000' } // Color de texto negro
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Aplicar formato estético a los datos
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
                        setFormData(prevState => ({
                            ...prevState,
                            userData: {
                                ...prevState.userData,
                                kcalConsumed: data.userData.kcalConsumed,
                                carbsConsumed: data.userData.carbsConsumed,
                                proteinsConsumed: data.userData.proteinsConsumed,
                                fatsConsumed: data.userData.fatsConsumed,
                                waterAmount: data.userData.waterAmount
                            }
                        }));
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
            //getHistory();
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
            <Header isAuthenticated={isLoggedIn} />
            <div className="photo-table-history">
                <div className="photo-username-section-history">
                    <label htmlFor="upload-photo">
                        <img src={formData.userData.pfp === '' ? "https://previews.123rf.com/images/amitspro/amitspro1706/amitspro170600016/80099376-mandala-de-flor-abstracta-patr%C3%B3n-decorativo-fondo-azul-imagen-cuadrada-imagen-de-ilusi%C3%B3n-patr%C3%B3n.jpg" : formData.userData.pfp} alt="Descripción de la imagen"></img>
                    </label>
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
                                <FilterByTimeHistory />
                                <div className = {classBtn} id="btn-download" onClick={exportToExcel}>
                                <svg width="22px" height="16px" viewBox="0 0 22 16">
                                    <path d="M2,10 L6,13 L12.8760559,4.5959317 C14.1180021,3.0779974 16.2457925,2.62289624 18,3.5 L18,3.5 C19.8385982,4.4192991 21,6.29848669 21,8.35410197 L21,10 C21,12.7614237 18.7614237,15 16,15 L1,15" id="check"></path>
                                    <polyline points="4.5 8.5 8 11 11.5 8.5" class="svg-out"></polyline>
                                    <path d="M8,1 L8,11" class="svg-out"></path>
                                </svg>
                            </div>
                                <a class="credit" href="https://dribbble.com/shots/4570587-Download-micro-interaction" target="_blank"><img src="https://cdn.dribbble.com/assets/logo-footer-hd-a05db77841b4b27c0bf23ec1378e97c988190dfe7d26e32e1faea7269f9e001b.png" alt=""></img></a>
                            </div>
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