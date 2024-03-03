import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Rutinas from './pages/rutina/rutinas';
import SearchResultsPage from './pages/resultadosBusqueda/resultadosBusqueda';
import ExercisePage from './pages/exercise/exercise';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/resultados" element={<SearchResultsPage />} /> 
        <Route path="/exercise" element={<ExercisePage />} />
      </Routes>
    </Router>
  );
}

export default App;
