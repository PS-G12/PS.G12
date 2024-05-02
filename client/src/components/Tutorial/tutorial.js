import React, { useState } from 'react';
import './tutorial.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

const Tutorial = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const nextStep = () => {
    if (step < 7) {
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
      case 0:
        return { top: '50%', left: '27%' };
      case 1:
        return { top: '50%', left: '4%' };
      case 2:
        return { top: '50%', left: '35%' };
      case 3:
        return { top: '49%', left: '57.5%' };
      case 4:
        return { top: '35%', left: '28%' };
      case 5:
        return { top: '15%', left: '25%' };
      case 6:
        return { top: '14%', left: '56.8%' };
      case 7:
        return { top: '50%', left: '32%' };
      default:
        return { top: '20%', left: '20%' };
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false); 
  };

  return (
    showTutorial ? (
      <div className="tutorial-overlay" style={getOverlayPosition()}>
        <div className="tutorial-popup">
        {step === 0 && (
            <div className='paso0'>
              <h2>Welcome to Fitness Coach!</h2>
              <p>This is your home page. Here you can track your daily progress (Kcal, Macros, Weight, Heart rate).</p>
              <p>Click on the arrow below to check about the features in your homepage.</p>
            </div>
          )} 
          {step === 1 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso1'>
                <h2>Track your daily kilocalories objective</h2>
                <p>Here you can keep an eye on your daily progression for your Kcal consumed.</p>
                <p>By clicking on this graphic you will be able to see how balanced are your Kcal per meal.</p>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso2'>
                <h2>Track your daily Macronutrients objectives</h2>
                  <p>Keep tabs on your daily macronutrient goals here.</p>
                  <p>Explore this section to understand how well-balanced your meals are in terms of macros.</p>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso3'>
                <h2>Track your daily water consumed</h2>
                <p>Stay hydrated and regiter your water intake throughout the day by cliking into the glass.</p>
                <p>Remember, water is essential for optimal performance!</p>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div className="arrow-down"></div>
              <div className='paso4'>
                <h2>Register and watch your own progression!</h2>
                <p>Ready to see your journey unfold? Register now and witness your fitness evolution firsthand.</p>
                <p>Don't forget to click on the weight and heart rate graphs below.</p>
                <p>You can add your weight/heart rate along with the date you measured by clicking on them,<br></br> and then see those data points reflected on the graph.</p>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso5'>
                <h2>Check other features!</h2>
                <p>You can check other of our FitnessCoach features like the routines or BMI and your Necessary Macros.</p>
                <p>Be sure to check the food section so you can add your daily food consumption to reach your objective</p>
              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <div className="arrow-up"></div>
              <div className='paso6'>
                <h2>Manage your profile and goals</h2>
                <p>In the profile section, represented by a circle icon,<br></br> you can fine-tune your fitness journey.</p>
                <p>Here, you can update your objectives, tweak your personal data, <br></br>and keep your information up-to-date.</p>
                <p>It's your space to tailor your experience and <br></br>keep your fitness goals in check!</p>
              </div>
            </div>
          )}
          {step === 7 && (
            <div className='paso7'>
              <h2>Ready to hit the ground running!</h2>
              <p>You are now primed to go full throttle and unleash your inner fitness beast.<br></br> Remember to stick to your routines and keep an eye on our app for updates!</p>
              <p>Just like CBUM, let's power up and conquer those fitness goals!</p>
            </div>
          )}
          <div className="tutorial-buttons">
            {step !== 1 && step !== 0 &&(
                 <button className="flechaVolver" onClick={prevStep}>&larr;</button>
            )}
            {step !== 7 && (
                 <button onClick={skipTutorial}>Skip Tutorial</button>
            )}
            {step === 7 && (
                <button className="checkMark" onClick={skipTutorial}>&#10003;</button>
            )}
            {step !== 7 && (
                 <button className="flechaAvanzar" onClick={nextStep}>&rarr;</button>
            )}
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Tutorial;
