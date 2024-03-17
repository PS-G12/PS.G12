import React from "react";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"
import BMICalculator from "../../components/BMICalculator/BMIcalculator.js";

const BMICalculationPage = () => {
    return (
        <div className="bmi-box">
            <Header />
            <BMICalculator />
            <Footer />
        </div>
    );
}

export default BMICalculationPage;