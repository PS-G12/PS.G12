import React, { useState, useEffect } from "react";
import MacrosHeader from '../../components/macrosHeader/macrosHeader';
import Footer from "../../components/Footer/footer";
import MacrosSpecificationCard from '../../components/macrosSpecificationCard/macrosSpecificationCard';
import './macrosSpecification.css'

const MacrosSpecification = ({specificationName}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
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
    } else {
      console.error('Could not find the token, user not authenticated');
    }
  }, []);

  return (
    <div className="main-specifications">
      <MacrosHeader isAuthenticated={isLoggedIn} />
      
      <div className="all-components" id={`all-components-${specificationName}`}>
        <div className="card-component" id={`card-component-${specificationName}`}>
          <MacrosSpecificationCard specificationName={specificationName}/>
        </div>

        {specificationName === 'calories' && 
        
        <div className="add-burned-kcals-container">
          <h2>Do you want to add burned calories?</h2>
          <input type="number" placeholder="Burned Calories" />
          <button className="add-burned-kcals-button">Add burned calories</button>
        </div>}

      </div>

      <Footer />
    </div>
  );
};

export default MacrosSpecification;
