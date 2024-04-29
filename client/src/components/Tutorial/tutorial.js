import React, { useState } from 'react';
import './tutorial.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

const Tutorial = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [showTutorial, setShowTutorial] = useState(true);

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false); // Cierra el tutorial al saltarlo
  };

  return (
    showTutorial ? (
      <div className="tutorial-overlay">
        <div className="tutorial-popup">
        {step === 0 && (
            <div className='paso0'>
              <h2>Bienvenido a la aplicación</h2>
              <p>Bienvenido a nuestra aplicación. Estamos encantados de tenerte aquí.</p>
            </div>
          )} 
          {step === 1 && (
            <div className='paso1'>
              <h2>Paso 1: Bienvenido a la aplicación</h2>
              <p>Bienvenido a nuestra aplicación. Estamos encantados de tenerte aquí.</p>
            </div>
          )}
          {step === 2 && (
            <div className='paso2'>
              <h2>Paso 2: Funcionalidad principal</h2>
              <p>Esta es la funcionalidad principal de la aplicación.</p>
            </div>
          )}
          {step === 3 && (
            <div className='paso3'>
              <h2>Paso 3: Configuración</h2>
              <p>Aquí puedes configurar diferentes opciones según tus preferencias.</p>
            </div>
          )}
          {step === 4 && (
            <div className='paso4'>
              <h2>Paso 4: ¡Listo para empezar!</h2>
              <p>¡Felicidades! Ahora estás listo para comenzar a usar nuestra aplicación.</p>
            </div>
          )}
          <div className="tutorial-buttons">
            {step !== 1 && (
                 <button className="flechaVolver" onClick={prevStep}>&larr;</button>
            )}
            <button onClick={skipTutorial}>Saltar Tutorial</button>
            {step === 4 && (
                <button className="flechaAvanzar" onClick={skipTutorial}>&#10003;</button>
            )}
            {step !== 4 && (
                 <button className="flechaAvanzar" onClick={nextStep}>&rarr;</button>
            )}
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Tutorial;
