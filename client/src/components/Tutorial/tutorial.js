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

  const getOverlayPosition = () => {
    switch (step) {
      case 1:
        return { top: '38%', left: '31%' };
      case 2:
        return { top: '40%', left: '40%' };
      case 3:
        return { top: '60%', left: '60%' };
      case 4:
        return { top: '80%', left: '80%' };
      default:
        return { top: '20%', left: '20%' };
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false); // Cierra el tutorial al saltarlo
  };

  return (
    showTutorial ? (
      <div className="tutorial-overlay" style={getOverlayPosition()}>
        <div className="tutorial-popup">
          {step === 1 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso1'>
                <h2>Bienvenido a la aplicación</h2>
                <p>Te vamos a enseñar brevemente como empezar.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso2'>
                <h2>Paso 2: Funcionalidad principal</h2>
                <p>Esta es la funcionalidad principal de la aplicación.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso3'>
                <h2>Paso 3: Configuración</h2>
                <p>Aquí puedes configurar diferentes opciones según tus preferencias.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso4'>
                <h2>Paso 4: ¡Listo para empezar!</h2>
                <p>¡Felicidades! Ahora estás listo para comenzar a usar nuestra aplicación.</p>
              </div>
            </div>
          )}

          <div className="tutorial-buttons">
            {step !== 1 && (
              <button className="flechaVolver" onClick={prevStep}>&larr;</button>
            )}
            {step !== 4 && (
              <button onClick={skipTutorial}>Saltar Tutorial</button>
            )}
            {step === 4 && (
              <button className="checkMark" onClick={skipTutorial}>&#10003;</button>
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
