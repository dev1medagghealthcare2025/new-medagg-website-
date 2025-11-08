import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import BreastNoduleVAEHeroSection from '../components/Treatment_Pages/Breast_Nodule_VAE_herosection';
import WhyChooseVAE from '../components/Treatment_Pages/Why_choose_vacuum_assisted_excision';
import CompareTreatmentVAE from '../components/Treatment_Pages/Compare_treatment_VAE';
import WhatHappensInVAE from '../components/Treatment_Pages/what_happen_in_VAE';
import HowVAEWorks from '../components/Treatment_Pages/how_VAE_works';
import AreYouExperiencingVAE from '../components/Treatment_Pages/Are_You_Experiencing_VAE';
import BookAnAppointmentVAE from '../components/Treatment_Pages/Bookanappoinment_vae';
import Ourdoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import FAQ_Home from '../components/home/FAQ_Home';

const BreastNoduleVAEPage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Treatmentnavbar />
      <BreastNoduleVAEHeroSection />
      <WhyChooseVAE />
      <HowVAEWorks />
      <AreYouExperiencingVAE />
      <BookAnAppointmentVAE />
      <CompareTreatmentVAE />
      <WhatHappensInVAE videoUrl="https://youtube.com/shorts/xniZMciljic?si=d4HK5sNyGO2ndjfU" />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor />
      <FAQ_Home/>
      {/* Other components for this page will go here */}
    </div>
  );
};

export default BreastNoduleVAEPage;
