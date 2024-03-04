import React from 'react';


const BodyPart = ({ label, imageName, altText }) => {
  return (
    <div className="body-part">
      <p><span>{label}</span></p>
      <img src={require(`../../images/${imageName}.png`)} alt={altText} />
      <p><span>{label.toUpperCase()}</span></p>
    </div>
  );
};

export default BodyPart;
