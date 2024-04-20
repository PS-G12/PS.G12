import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './footerPages.css';

const WhoWeAre = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Introduction</h2>
      <p className='footer-link-text'>
      At FitnessCoach, Inc. ("FitnessCoach"), we are dedicated to helping individuals achieve their fitness 
      and wellness goals. Our mission is to provide a comprehensive platform that empowers users to lead healthier 
      lifestyles through exercise, nutrition, and overall well-being. </p>
    </div>
  )
}

const OurCommitment = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Our Commitment</h2>
          <p className='footer-link-text'>
          FitnessCoach is committed to providing high-quality services that prioritize the privacy and security of our 
          users' personal information. We adhere to strict privacy practices and policies to ensure that your data is 
          handled responsibly and in accordance with applicable laws and regulations.</p>
      </div>
  )
}


const OurTeam = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Our Team</h2>
          <p className='footer-link-text'>Our team consists of dedicated professionals with expertise in fitness, 
          nutrition, technology, and customer service. We are passionate about helping our users succeed on their 
          fitness journeys and are here to support you every step of the way.</p>
      </div>
  )
};


const HowWeHelp = () => {
  return (
      <div>
          <h2 className='footer-link-section'>How We Help</h2>
          <p className='footer-link-text'>
          Through our website, mobile applications, and other services, we offer a range of tools, resources, and 
          support to help you reach your fitness goals. From personalized workout plans and nutrition guidance to 
          community forums and expert advice, we strive to provide everything you need to succeed.
          </p>
      </div>
  )
};

function footerLinkPage() {
  return (
    <div className="footer-page">
      <Header />
      <div className='footer_pages_content'>
        <h1 className='footer_pages_title'>WHO WE ARE</h1>
        <WhoWeAre />
        <OurCommitment />
        <OurTeam />
        <HowWeHelp />
      </div>
      <Footer />
    </div>
  );
}

export default footerLinkPage;