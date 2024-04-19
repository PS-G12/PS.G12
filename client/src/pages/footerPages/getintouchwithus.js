import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './footerPages.css';

const ContactInformation = () => {
  return (
    <div>
      <h2 className='footer-link-section'>IMPORTANT NOTICE</h2>
      <p className='footer-link-text'>
      At FitnessCoach, Inc. (“FitnessCoach”), our mission is to help you along your fitness and wellness 
      journey and we want you to know how we collect and use the data that you provide to us over the 
      course of that journey. FitnessCoach is the fitnessCoach.com website (“Website”) and FitnessCoach 
      mobile applications (“Mobile App”) (which we collectively refer to in this Privacy Policy as the 
      “Services”). We encourage you to read this Privacy Policy as well as our terms and conditions of use 
      (referred to throughout as our “Terms”). </p>
    </div>
  )
}

const CustomerSupport = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Customer Support</h2>
      <p className='footer-link-text'>
      Our customer support team is available to assist you with any inquiries or issues you may have. 
      Feel free to reach out to us via email or phone, and we'll do our best to help you as quickly as 
      possible.</p>
    </div>
  )
}

const SocialMedia = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Social Media</h2>
      <p className='footer-link-text'>
      Connect with us on social media for the latest updates, fitness tips, and inspiration. 
      Follow us on Instagram, Facebook, and Twitter to join our community and stay connected.</p>
    </div>
  )
}

const FeedbackAndSuggestions = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Feedback And Suggestions</h2>
      <p className='footer-link-text'>
      We value your feedback and are always looking for ways to improve our services. If you have any 
      suggestions or ideas on how we can better serve you, please let us know. Your input is essential 
      to helping us enhance the FitnessCoach experience for all users.</p>
    </div>
  )
}

const PartnershipsAndCollaborations = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Partnerships And Collaborations</h2>
      <p className='footer-link-text'>
      Interested in partnering with FitnessCoach or collaborating on a project? We're open to new opportunities 
      and would love to explore how we can work together. Get in touch with our partnership team to discuss 
      potential collaborations.</p>
    </div>
  )
}

const StayConnected = () => {
  return (
    <div>
      <h2 className='footer-link-section'>Partnerships And Collaborations</h2>
      <p className='footer-link-text'>
      Sign up for our newsletter to receive exclusive offers, fitness tips, and updates straight to your inbox. 
      Don't miss out on the latest news from FitnessCoach – subscribe today!</p>
    </div>
  )
}

function footerLinkPage() {
  return (
    <div className="footer-page">
      <Header />
      <div className='content'>
        <h1 className='title'>GET IN TOUCH WITH US</h1>
        <ContactInformation />
        <CustomerSupport />
        <SocialMedia />
        <FeedbackAndSuggestions />
        <PartnershipsAndCollaborations />
        <StayConnected />
      </div>
      <Footer />
    </div>
  );
}

export default footerLinkPage;