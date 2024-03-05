import React from "react";
import './crearAlimento.css'

function CrearAlimento(){
    return (
        <div className="contenedor-creaAlimento">
            <div className="titulo-alimento">
                <h1>Crear Alimento</h1>
            </div>
            <div className="ingresar-alimento">
                <h1>Ingresar información nutricional</h1>
                <div className="formularios-ingresar">
                    <form className="procedencia">
                        <label>Marca/Restaurante</label>
                        <input type="text" className="input-procedencia"></input>
                    </form>
                    <form className="descripcion">
                        <label>Descripción del Alimento</label>
                        <input type="text"></input>
                    </form>
                </div>
            </div>
            <div className="detalles-ingresar">
                <div className="columna-iz">
                    <form className="calorias">
                        <label>Calorías</label>
                        <input type="text"></input>
                    </form>
                    <div className="formularios-grasas">
                        <form className="grasas-totales">
                            <label>Grasas Totales</label>
                            <input type="text"></input>
                        </form>
                        <div className="sub-grasas">
                            <form className="saturadas">
                                <label>Saturadas</label>
                                <input type="text"></input>
                            </form>
                            <form className="polinisaturadas">
                                <label>Polinisaturadas</label>
                                <input type="text"></input>
                            </form>
                            <form className="monoinsaturadas">
                                <label>Monoinsaturadas</label>
                                <input type="text"></input>
                            </form>
                            <form className="trans">
                                <label>Trans</label>
                                <input type="text"></input>
                            </form>
                        </div>
                    </div>
                    <form className="colesterol">
                        <label>Colesterol</label>
                        <input type="text"></input>
                    </form>
                </div>
                <div className="columna-de">
                    <form className="potasio">
                        <label>Potasio</label>
                        <input type="text"></input>
                    </form>
                    <div className="formularios-carbos">
                        <form className="carbos-totales">
                            <label>Carbohidratos totales</label>
                            <input type="text"></input>
                        </form>
                        <div className="sub-carbo">
                            <form className="fuerza-dietetica">
                                <label>Fuerza dietética</label>
                                <input type="text"></input>
                            </form>
                            <form className="azucar">
                                <label>Azúcares</label>
                                <input type="text"></input>
                            </form>
                        </div>
                    </div>
                    <form className="prote">
                        <label>Proteínas</label>
                        <input type="text"></input>
                    </form>
                </div>
            </div>
            <button className="crear-alimento" type="submit">Crear alimento</button>
        </div>
    );
}

export default CrearAlimento
