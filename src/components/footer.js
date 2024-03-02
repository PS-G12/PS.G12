import React from 'react';
import '../styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="contenedor-detalles">
                <p>Quienes somos</p>
                <p>Privacidad</p>
                <p>API</p>
                <p>Cookies</p>
                <p>Contacta con nosotros</p>
            </div>
            <p className="copyR">© 2024 Nombre App, Inc</p>
        </footer>
    );
}

export default Footer;
