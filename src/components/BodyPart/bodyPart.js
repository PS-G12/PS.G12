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

  const imageSrc = require(`../../images/${imageName}.png`);

  const styles = {
    label: {
      fontSize: '18px',
      color: '#4a90e2',
      fontWeight: 'bold',
      margin: '10px 0'
    },
    text: {
      fontSize: '18px',
      color: 'black',
      margin: '10px 0'
    }
  };

  return (
    <div className="body-part" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
        <img className="image" src={imageSrc} alt={altText} />
        <div className="description">
          <p style={styles.label}>{label}:</p>
          <p style={styles.text}>{src}</p>
        </div>
      </div>
    </div>
  );
};

export default BodyPart;
