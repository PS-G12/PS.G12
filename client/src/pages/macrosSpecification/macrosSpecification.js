import React, { useState, useEffect } from "react";
import MacrosHeader from '../../components/macrosHeader/macrosHeader';
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
      <div className="card-component">
        <MacrosSpecificationCard specificationName={specificationName}/>
      </div>
    </div>
  );
};

export default MacrosSpecification;
