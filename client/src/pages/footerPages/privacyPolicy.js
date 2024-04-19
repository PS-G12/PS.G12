import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './footerPages.css';

const Notice = () => {
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

const Welcome = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Welcome to FitnessCoach!</h2>
          <p className='footer-link-text'>
          FitnessCoach ("we", "us", or "our") is committed to your privacy. This notice describes our Privacy
          Policy and how we treat data collected on our website and through the services we offer (“Site and
          Services”) accessible through mobile devices, computers, and tablets. The FitnessCoach Privacy Policy is
          intended to inform and advise you about how we collect, use, and protect the personal information
          you provide. By visiting this site, you are accepting the practices described in this Privacy Policy.
          When we refer to “you” or “your”, we are referring to visitors to the Sites and Services, users of the
          Sites and Services, and subscribers to the Sites and Services. </p>
      </div>
  )
}


const WhatWeCollect = () => {
  return (
      <div>
          <h2 className='footer-link-section'>WHAT INFORMATION WE COLLECT</h2>
          <p className='footer-link-text'>Our primary goals in collecting information are to provide and to improve the Site and Services and
          to administer your use of the Site and Services. Therefore, except as set forth below, we only collect
          information necessary to provide the services you use, and except as necessary to provide those
          services, we do not share your personal information with third parties.</p>
      </div>
  )
};


const PersonalInformation = () => {
  return (
      <div>
          <h2 className='footer-link-section'>Personal Information</h2>
          <p className='footer-link-text'>
              Your use of our Sites and Services is voluntary. However, if you wish to use the Sites and Services, we
              may ask you to provide us with, or grant us access to, or permission to obtain, certain personally
              identifiable information that can be used to contact or identify you ("Personal Information").
              Personal Information includes, but is not limited to, your full name, email address, personal photos,
              the city and state in which you reside, birthdate, the college you attend or attended, and brief
              biographical information. We use this information to confirm your identity, communicate with you
              regarding the Site and Services, and provide the Services you have requested. For example, Personal
              Information is your email address, which you provide to us on our website or when you contact us,
              and we use to communicate with you. Similarly, your brief biographical information or personal
              photo may be optionally included in your public FitnessCoach profile.
          </p>
          <p>
              Though our Site offers a payment mechanism for entering Story Contests, all information for
              processing such payments is stored with our payment processor, Stripe. Please refer to Stripe’s privacy
              policy to learn about their privacy practices.</p>
      </div>
  )
};

function footerLinkPage() {
  return (
    <div className="footer-page">
      <Header />
      <div className='content'>
        <h1 className='title'>PRIVACY POLICY</h1>
        <Welcome />
        <Notice />
        <WhatWeCollect />
        <PersonalInformation />
      </div>
      <Footer />
    </div>
  );
}

export default footerLinkPage;