import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"
import MacrosCalculator from "../../components/MacrosCalculator/macrosCalculator.js";

const MacrosCalculation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();

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
    
    return (
        <div className="macros-box">
            <Header isAuthenticated={isLoggedIn}/>
            <MacrosCalculator />
            <Footer />
        </div>
    );
}

export default MacrosCalculation