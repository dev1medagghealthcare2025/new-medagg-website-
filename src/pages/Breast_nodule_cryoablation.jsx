import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import CryoablationHeroSection from '../components/Treatment_Pages/cryoablation_herosection';
import WhyChooseCryoablation from '../components/Treatment_Pages/whychoosecryoablations';
import HowCryoablationWorks from '../components/Treatment_Pages/how_cryoablation_work';
import AreYouExperiencingCryoablation from '../components/Treatment_Pages/Are_You_Experiencing_cryoablation';
import WhatHappensInCryoablation from '../components/Treatment_Pages/What_Happens_in_Cryoablation';
import CompareTreatmentCryoablation from '../components/Treatment_Pages/compare_treatment_cryoablation';
import OurDoctor from '../components/home/Ourdoctor';
import BookAnAppointmentCryo from '../components/Treatment_Pages/BookAnAppointmentCryo';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import FAQ_Home from '../components/home/FAQ_Home';

const BreastNoduleCryoablationPage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Treatmentnavbar />
      <CryoablationHeroSection />
      <WhyChooseCryoablation />
      <HowCryoablationWorks />
      <AreYouExperiencingCryoablation />
      <BookAnAppointmentCryo />
      <CompareTreatmentCryoablation />
      <WhatHappensInCryoablation videoUrl="https://youtube.com/shorts/xniZMciljic?si=d4HK5sNyGO2ndjfU" />
      <OurDoctor />
      <OurTestimonial/>
      <Consultourdoctor />
      <FAQ_Home/>
    </div>
  );
};

export default BreastNoduleCryoablationPage;
