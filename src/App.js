import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Rutinas from './pages/rutina/rutinas';
import Inicio from './pages/inicio/inicio';
import SearchResultsPage from './pages/resultadosBusqueda/resultadosBusqueda';
import ExercisePage from './pages/exercise/exercise';
import FoodSearch from './pages/buscarAlimento/buscarAlimento';
import CalculoIMCPage from './pages/imc';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/resultados" element={<SearchResultsPage />} /> 
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/calculoIMC" element={<CalculoIMCPage />} />
        <Route path="/buscarAlimento" element={<FoodSearch />} />
      </Routes>
    </Router>

  );
}

export default App;
