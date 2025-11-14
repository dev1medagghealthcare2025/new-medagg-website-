import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import TermsHeroSection from '../components/Terms_and_condition/terms_herosection';
import TermsMain from '../components/Terms_and_condition/terms_main';

const TermsConditionPage = () => {
  return (
    <main className="bg-white">
      <Navbar />
      <Treatmentnavbar />
      <TermsHeroSection />
      <TermsMain />
    </main>
  );
};

export default TermsConditionPage;

