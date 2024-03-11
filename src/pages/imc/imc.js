import React from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer"
import BMICalculator from "../../components/BMICalculator/BMIcalculator.js";

const CalculoIMCPage = () => {
    return (
        <div>
            <Header />
            <BMICalculator />
            <Footer />
        </div>
    );
}

export default CalculoIMCPage;