import React from 'react';
import Navbar from '../components/home/Navbar';
import PrivacyPolicyHeroSection from '../components/Privacy Policy/privacy_policy_herosection';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import PrivacyMain from '../components/Privacy Policy/Privacy_main';


const PolicyPage = () => {
  return (
    <main className="bg-white">
      <Navbar />
      <Treatmentnavbar />
      <PrivacyPolicyHeroSection />
      <PrivacyMain />

      
    </main>
  );
};

export default PolicyPage;
