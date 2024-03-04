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
      <CalculoIMCPage /> //Esto se puede quitar
    </div>
  );
}

export default App;
