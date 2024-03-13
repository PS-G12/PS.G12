import React from "react";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"
import BMICalculator from "../../components/BMICalculator/BMIcalculator.js";

const BMICalculationPage = () => {
    return (
        <div>
            <Header />
            <BMICalculator />
            <Footer />
        </div>
    );
}

export default BMICalculationPage;