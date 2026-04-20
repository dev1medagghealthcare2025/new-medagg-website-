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
import FtrFaq from '../components/Treatment_Pages/Ftr_faq';
import FTEWhySurgeries from '../components/Treatment_Pages/fte_why_surgeries';
import PageMeta from '../components/PageMeta';

const FTE_madurai = () => {
  return (
    <>
      <PageMeta
        title='Fallopian Tube Recanalization (FTR) Treatment in Madurai | NoSurgeries'
        description='Advanced non-surgical Fallopian Tube Recanalization (FTR) in Madurai by Interventional Radiology specialists. Book a consultation with NoSurgeries by Medagg.'
      />
      <Navbar />
      <Treatmentnavbar />
      <FTE_HeroSection city='Madurai' variant='madurai' />
      <WhyChooseFTE />
      <HowFTEWork />
      <AreYouExperienceFTE />
      <FTEWhySurgeries city='Madurai' variant='madurai' />
      <BookAppointmentFTE city='Madurai' variant='madurai' />
      <CompareTreatmentOptionFTE />
      <WhatHappensInFTE videoUrl='https://www.youtube.com/shorts/UdfJkfTMdz8' orientation='portrait' />
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor city='Madurai' variant='madurai' />
      <FtrFaq city='Madurai' variant='madurai' />
    </>
  );
};

export default FTE_madurai;
