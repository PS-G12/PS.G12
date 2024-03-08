import React from 'react';
import './tarjeta.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { faFlag, faUtensils, faRunning } from '@fortawesome/free-solid-svg-icons';

function Tarjeta({ tipo, icono, icono2, icono3, texto, prueba, prueba2, prueba3, progreso, progresoMaximo, text, text2, colorProgreso }) {
    return (
        <div className='container-tarjeta'>
            <div className='objetivos'>
                <div className='kcal'>
                    <span>{texto}</span>
                </div>
            </div>

            <div className='progresoCircular'>
                <CircularProgressbar
                    className={`c${tipo}`}
                    value={(progreso/progresoMaximo)*100}
                    text={`${text} ${text2}`}
                    styles={buildStyles({
                        textSize: '12px',
                        pathTransitionDuration: 0.5,
                        pathColor: colorProgreso,
                        textColor: 'black',
                        trailColor: '#d6d6d6',
                        
                    })}
                />
            </div>

            <div className='text-container'>
                <span>{prueba}</span> <FontAwesomeIcon icon={icono} className='icon' />
                <span>{prueba2}</span> <FontAwesomeIcon icon={icono2} className='icon' />
                <span>{prueba3}</span> <FontAwesomeIcon icon={icono3} className='icon' />

            </div>
        </div>
    );
}

function TarjetaObjetivo() {
    return (
        <div className="contenedor-kcal">
            <Tarjeta
                tipo="Objetivo"
                icono={faFlag}
                icono2={faFlag}
                icono3={faFlag}
                valor={2542}
                progreso={1502}
                text = {`${1502} Kcal`}
                text2 = "Restantes"
                prueba="Objetivo Kcal"
                prueba2="Objetivo Kcal"
                prueba3="Objetivo Kcal"
                progresoMaximo={2542}
                colorProgreso="red"
            />
        </div>
    );
}

function TarjetaMacros() {
    return (
        <div className="contenedor-macros">
            <Tarjeta
                tipo="Carbo"
                texto="Carbohidratos"
                progreso={81}
                text = {`${81}/${165}`}
                progresoMaximo={165}
                text2=""
                progresoTexto="50"
                colorProgreso="#0066EE"
            />
            <Tarjeta
                tipo="Grasas"
                texto="Grasas"
                progreso={50}
                text2=""
                text = {`${50}/${65}`}
                progresoMaximo={65}
                progresoTexto="50"
                colorProgreso="#EEBD0E"
            />
            <Tarjeta
                tipo="Prote"
                texto="Proteínas"
                text2=""
                progreso={32}
                text = {`${32}/${85}`}
                progresoMaximo={85}
                progresoTexto="32"
                colorProgreso="#179D7D"
            />
        </div>
    );
}

export { TarjetaObjetivo, TarjetaMacros };
