import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Routines from "./pages/routines/routines.js";
import HomePage from "./pages/homePage/homePage.js";
import SearchResultsPage from "./pages/searchResults/searchResults.js";
import ExercisePage from "./pages/exercise/exercise";
import RegisterFood from "./pages/registerFood/registerFood.js";
import SearchFood from "./pages/searchFood/searchFood.js";
import BMICalculatorPage from "./pages/bmi/bmi.js";
import MacrosCalculator from "./pages/MacrosCalculator/macrosCalculation.js";
import RegisterForm from "./pages/Authentication/registerPage.js";
import LoginForm from "./pages/Authentication/loginPage.js";
import UserProfile from './pages/profile/profile.js';
import MacrosSpecification from './pages/macrosSpecification/macrosSpecification.js';
import PrivacyPolicy from './pages/footerPages/privacyPolicy.js';
import Cookies from './pages/footerPages/cookies.js';
import API from './pages/footerPages/apis.js';
import WhoWeAre from './pages/footerPages/whoweare.js';
import GetInTouchWithUs from './pages/footerPages/getintouchwithus.js';
import ChangePassword from './pages/profile/changePassword.js';
import ProfileHistory from './pages/profile/history.js';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/results" element={<SearchResultsPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/BMIcalculation" element={<BMICalculatorPage />} />
        <Route path="/searchFood" element={<SearchFood />} />
        <Route path="/registerFood" element={<RegisterFood />} />
        <Route path="/MacrosCalculation" element={<MacrosCalculator />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/history" element={<ProfileHistory />} />
        <Route path="/calories" element={<MacrosSpecification specificationName="calories"/>} />
        <Route path="/carbs" element={<MacrosSpecification specificationName="carbs"/>} />
        <Route path="/fats" element={<MacrosSpecification specificationName="fats"/>} />
        <Route path="/proteins" element={<MacrosSpecification specificationName="proteins"/>} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Cookies" element={<Cookies />} />
        <Route path="/API" element={<API />} />
        <Route path="/WhoWeAre" element={<WhoWeAre />} />
        <Route path="/GetInTouchWithUs" element={<GetInTouchWithUs />} />
      </Routes>
    </Router>
  );
}

export default App;
