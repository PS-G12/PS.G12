import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './footerPages.css';

const Introduction = () => {
  return (
    <div>
      <h2 className='footer-link-section'>APIs</h2>
      <p className='footer-link-text'>
      At FitnessCoach, we utilize APIs to enhance our users' experience and provide seamless integration with our 
      platform. Our APIs enable access to a variety of features and functionalities, including user data management 
      and integration with third-party services such as MongoDB for user databases and activity tracking, as well 
      as APIs associated with displaying exercise demonstration gifs. </p>
    </div>
  )
}

const MongoDBIntegration = () => {
  return (
      <div>
          <h2 className='footer-link-section'>MongoDB Integration</h2>
          <p className='footer-link-text'>
          Our MongoDB integration allows us to securely store and manage user data, including profile information, 
          activity logs, and preferences. By leveraging MongoDB's flexible and scalable database solutions, we ensure 
          that our platform can handle large volumes of data efficiently while maintaining the highest standards of 
          security and privacy.</p>
      </div>
  )
}


const ExerciseDemonstration = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Exercise Demonstration APIs</h2>
          <p className='footer-link-text'>We also utilize APIs to access and display exercise demonstration gifs, 
          providing users with visual guidance on how to perform various exercises correctly. These APIs enable 
          us to offer a rich and interactive experience, helping users improve their workout routines and achieve 
          their fitness goals safely and effectively.</p>
      </div>
  )
};


const DeveloperResources = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Developer Resources</h2>
          <p className='footer-link-text'>
          For developers interested in integrating with FitnessCoach or accessing our APIs, we provide comprehensive 
          documentation and developer resources to facilitate seamless integration. Our API documentation includes 
          detailed guides, code samples, and reference materials to help developers quickly get up to speed and 
          start building innovative fitness applications.</p>
      </div>
  )
};

const GetStarted = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Get Started</h2>
          <p className='footer-link-text'>
          If you're a developer interested in leveraging our APIs or partnering with FitnessCoach, we'd love to 
          hear from you! Contact our developer relations team to learn more about our APIs, request access, or 
          discuss potential collaboration opportunities.</p>
      </div>
  )
};

function footerLinkPage() {
  return (
    <div className="footer-page">
      <Header />
      <div className='content'>
        <h1 className='title'>API</h1>
        <Introduction />
        <MongoDBIntegration />
        <ExerciseDemonstration />
        <DeveloperResources />
        <GetStarted />
      </div>
      <Footer />
    </div>
  );
}

export default footerLinkPage;