import React from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/layout/Footer';
import TestiominalHerosection from '../components/Testiominal/Testiominal_herosection';
import TestiominalMain from '../components/Testiominal/Testiominal_main';

const Testiominal = () => {
  return (
    <div>
      <Navbar />
      <TestiominalHerosection />
      <TestiominalMain />
      {/* Other testimonial components will go here */}
      
    </div>
  );
};

export default Testiominal;
