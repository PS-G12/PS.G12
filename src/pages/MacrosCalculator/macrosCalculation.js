import React from "react";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js"
import MacrosCalculator from "../../components/MacrosCalculator/macrosCalculator.js";

const MacrosCalculation = () => {
    return (
        <div className="macros-box">
            <Header />
            <MacrosCalculator />
            <Footer />
        </div>
    );
}

export default MacrosCalculation