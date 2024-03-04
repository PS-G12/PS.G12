import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Rutinas from './pages/rutinas';
import CalculoIMCPage from './pages/imc';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/rutinas" element={<Rutinas />} />
        </Routes>
      </Router>
      <CalculoIMCPage />
    </div>
    //Lo de <CalculoIMCPage/> se puede quitar sin problema, era para ver como quedaba
  );
}

export default App;
