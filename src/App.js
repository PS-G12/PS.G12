import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Rutinas from './pages/rutinas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rutinas" element={<Rutinas />} />
      </Routes>
    </Router>
  );
}

export default App;
