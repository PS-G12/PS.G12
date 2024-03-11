import React from "react";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"
import MacrosCalculator from "../../components/macrosCalculator/macrosCalculator.js";

const BMICalculationPage = () => {
    return (
        <div>
            <Header />
            <MacrosCalculator />
            <Footer />
        </div>
    );
}

export default BMICalculationPage