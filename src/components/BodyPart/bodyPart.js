import React, { useState } from 'react';
import './bodyPart.css';

const BodyPart = ({ label, imageName, altText, src}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="body-part" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
        <img className="image" src={require(`../../images/${imageName}.png`)} alt={altText} />
        <div className="description">
          <p style={{ fontSize: '18px', color: '#4a90e2', fontWeight: 'bold', margin: '10px 0' }}>{label}:</p>
          <p style={{ fontSize: '18px', color: 'black', margin: '10px 0' }}>{src}</p>
        </div>
      </div>
    </div>
  );
};

export default BodyPart;
