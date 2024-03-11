import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Rutinas from './pages/rutina/rutinas';
import Inicio from './pages/inicio/inicio';
import SearchResultsPage from './pages/resultadosBusqueda/resultadosBusqueda';
import ExercisePage from './pages/exercise/exercise';
import FoodSearch from './pages/buscarAlimento/buscarAlimento';
import BMICalculatorPage from './pages/imc/imc';
import CalculadoraMacros from './pages/CalculadoraMacros/calculadoraMacros';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/resultados" element={<SearchResultsPage />} /> 
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/BMIcalculation" element={<BMICalculatorPage />} />
        <Route path="/buscarAlimento" element={<FoodSearch />} />
        <Route path="/calculoMacros" element={<CalculadoraMacros />} />
      </Routes>
    </Router>

  );
}

export default App;
