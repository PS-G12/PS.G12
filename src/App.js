import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Routines from './pages/routines/routines.js';
import HomePage from './pages/homePage/homePage.js';
import SearchResultsPage from './pages/searchResults/searchResults.js';
import ExercisePage from './pages/exercise/exercise';
import FoodSearch from './pages/searchFood/Foodsearch.js'
import BMICalculatorPage from './pages/bmi/bmi.js';
import MacrosCalculator from './pages/MacrosCalculator/macrosCalculation.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/results" element={<SearchResultsPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/BMIcalculation" element={<BMICalculatorPage />} />
        <Route path="/searchFood" element={<FoodSearch />} />
        <Route path="/MacrosCalculation" element={<MacrosCalculator />} />
      </Routes>
    </Router>

  );
}

export default App;
