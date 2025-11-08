import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import EndovascularCoilingHeroSection from '../components/Treatment_Pages/Endovascular_coiling_herosection';
import WhyChooseEndovascularCoiling from '../components/Treatment_Pages/Why_choose_endovascular_coiling';
import HowECWorks from '../components/Treatment_Pages/HOW_EC_works';
import AreYouExperiencingEC from '../components/Treatment_Pages/Are_You_Experiencing_ec';
import EC_Book_Appointment from '../components/Treatment_Pages/EC_Book_Appointment';
import TreatmentCompareEC from '../components/Treatment_Pages/Treatment_compare_ec';
import WhatHappensInEndovascularCoiling from '../components/Treatment_Pages/What_Happens_in_Endovascular_coiling';
import Ourdoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import FAQ_Home from '../components/home/FAQ_Home';

const Endovascular_Coiling_treatment = () => {
  return (
    <div>
      <Navbar />
      <Treatmentnavbar />
      <EndovascularCoilingHeroSection />
      <WhyChooseEndovascularCoiling />
      <HowECWorks />
      <AreYouExperiencingEC />
      <EC_Book_Appointment />
      <TreatmentCompareEC />
      <WhatHappensInEndovascularCoiling />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor />
      <FAQ_Home/>
    </div>
  );
};

export default Endovascular_Coiling_treatment;