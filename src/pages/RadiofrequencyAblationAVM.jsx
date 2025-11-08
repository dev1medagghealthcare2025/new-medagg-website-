import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import RfaForAvmHeroSection from '../components/Treatment_Pages/Rfa_for_avm_herosection';
import WhyChooseRFAForAVM from '../components/Treatment_Pages/Why_choose_RFA_for_AVM';
import HowRFAForAVMWorks from '../components/Treatment_Pages/How_RFA_for_AVM_works';
import AreYouExperiencingRFAForAVM from '../components/Treatment_Pages/Are_You_Experiencing_rfa_for_AVM';
import BookAppointmentRFAForAVM from '../components/Treatment_Pages/Bookanappoinment_rfa_for_avm';
import CompareYourTreatmentRFAAVM from '../components/Treatment_Pages/Compare_Your_Treatment_rfa_avm';
import WhatHappensInRFAForAVM from '../components/Treatment_Pages/What_Happens_in_RFA_for_AVM';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import Consultourdoctor from '../components/home/Consultourdoctor';
import FAQ_Home from '../components/home/FAQ_Home';

const RadiofrequencyAblationAVM = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Treatmentnavbar />
      <RfaForAvmHeroSection />
      <WhyChooseRFAForAVM />
      <HowRFAForAVMWorks />
      <AreYouExperiencingRFAForAVM />
      <BookAppointmentRFAForAVM />
      <CompareYourTreatmentRFAAVM />
      <WhatHappensInRFAForAVM />
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor />
      <FAQ_Home />
      {/* Additional AVM-specific sections can be added here */}
    </div>
  );
};

export default RadiofrequencyAblationAVM;