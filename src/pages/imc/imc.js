import React from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer"
import CalculadoraIMC from "../CalculadoraIMC/calculadoraIMC";

const CalculoIMCPage = () => {
    return (
        <div>
            <Header />
            <CalculadoraIMC />
            <Footer />
        </div>
    );
}

export default CalculoIMCPage;
