import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './footerPages.css';

const Introduction = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Introduction</h2>
      <p className='footer-link-text'>
      Welcome to FitnessCoach! This Cookies Policy explains how FitnessCoach ("we", "us", or "our") uses cookies 
      and similar technologies to recognize you when you visit our website at [yourwebsite.com] ("Website"). It 
      explains what these technologies are and why we use them, as well as your rights to control our use of them. </p>
    </div>
  )
}

const WhatAreCookies = () => {
  return (
      <div>
          <h2 className='footer-link-section'>What Are Cookies</h2>
          <p className='footer-link-text'> Cookies are small text files that are stored on your computer or mobile 
          device when you visit a website. They are widely used to make websites work, or work more efficiently, 
          as well as to provide information to the owners of the site.</p>
      </div>
  )
}


const HowWeUseCookies = () => {
  return (
      <div>
          <h2 className='footer-link-section'>How We Use Cookies</h2>
          <p className='footer-link-text'>We use cookies for several purposes. Some cookies are required for technical 
          reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. 
          Other cookies also enable us to track and target the interests of our users to enhance the experience on 
          our Website.</p>
      </div>
  )
};


const YourChoicesRegardingCookies = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Your Choices Regarding Cookies</h2>
          <p className='footer-link-text'>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences 
          by clicking on the appropriate opt-out links provided in the cookie banner when you visit our Website.
          </p>
      </div>
  )
};

const ChangesToOurCookiesPolicy = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Changes To Our Cookies Policy</h2>
          <p className='footer-link-text'>
          We may update our Cookies Policy from time to time. Any changes we make to our Cookies Policy in the future 
          will be posted on this page and, where appropriate, notified to you by email.
          </p>
      </div>
  )
};

const ContactUs = () => {
  return (
    <div>
        <h2 className='footer-link-section'>Contact Us</h2>
        <p className='footer-link-text'>
        If you have any questions about our use of cookies or this Cookies Policy, please contact us at contact@fitnesscoach.com.
        </p>
    </div>
)
}

function footerLinkPage() {
  return (
    <div className="footer-page">
      <Header />
      <div className='footer_pages_content'>
        <h1 className='footer_pages_title'>COOKIES POLICY</h1>
        <Introduction />
        <WhatAreCookies />
        <HowWeUseCookies />
        <YourChoicesRegardingCookies />
        <ChangesToOurCookiesPolicy />
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
}

export default footerLinkPage;