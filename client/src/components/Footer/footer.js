import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
    <div className="container-footer">
      <div className="details-container-footer">
        <p><a href="/WhoWeAre">Who we are</a></p>
        <p><a href="/PrivacyPolicy">Privacy</a></p>
        <p><a href="/API">API</a></p>
        <p><a href="/Cookies">Cookies</a></p>
        <p><a href="/GetInTouchWithUs">Get in touch with us</a></p>
      </div>
      <p className="copyR">© 2024 App Name, Inc</p>
      </div>
    </footer>
  );
}

export default Footer;
