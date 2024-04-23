import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"
import BMICalculator from "../../components/BMICalculator/BMIcalculator.js";

const BMICalculationPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        const tryToken = async () => {
          try {
            const token = sessionStorage.getItem('token');
            if (!token) {
              setIsLoggedIn(false);
              return;
            }
            else{
              setIsLoggedIn(true);
              setToken(token);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoggedIn(false);
          }
        };
    
        tryToken();
    }, []);

    return (
        <div className="bmi-box">
            <Header isAuthenticated={isLoggedIn}/>
            <BMICalculator />
            <Footer />
        </div>
    );
}

export default BMICalculationPage;