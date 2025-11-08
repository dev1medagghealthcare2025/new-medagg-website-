import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import FTE_HeroSection from '../components/Treatment_Pages/FTE_herosection';
import WhyChooseFTE from '../components/Treatment_Pages/why_choose_fte';
import HowFTEWork from '../components/Treatment_Pages/HOW_FTE_Work';
import AreYouExperienceFTE from '../components/Treatment_Pages/Are_you_experience_fte';
import BookAppointmentFTE from '../components/Treatment_Pages/Bookapoinment_fte';
import CompareTreatmentOptionFTE from '../components/Treatment_Pages/compare_treatment_option_fte';
import WhatHappensInFTE from '../components/Treatment_Pages/what_happen_in_fte';
import OurTestimonial from '../components/home/our_testimonial';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import FAQ_Home from '../components/home/FAQ_Home';

const FTE = () => {
  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <FTE_HeroSection />
      <WhyChooseFTE />
      <HowFTEWork />
      <AreYouExperienceFTE />
      <BookAppointmentFTE />
      <CompareTreatmentOptionFTE />
      <WhatHappensInFTE videoUrl="https://youtube.com/shorts/itpjmiyaLk0?si=R15ijYNu2yi1aRW8" />
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor />
      <FAQ_Home />
    </>
  );
};

export default FTE;
