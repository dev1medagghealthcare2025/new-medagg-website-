import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import DiabeticHeroSection from '../components/Treatment_Pages/Diabetic_herosection';
import DiabeticFootWhySurgeries from '../components/Treatment_Pages/Diabetic_Foot_why_surgeries';
import WhyChooseDiabeticFoot from '../components/Treatment_Pages/why_choose_diabetic_foot';
import HowWorkDiabetic from '../components/Treatment_Pages/how_work_diabetic';
import AreYouExperiencingDiabetic from '../components/Treatment_Pages/are_ experence_diabetic';
import BookAppointmentDiabetic from '../components/Treatment_Pages/book_appoinment_diabetic';
import CompareDiabetic from '../components/Treatment_Pages/Compare_diabetic';
import WhatHappenDiabetic from '../components/Treatment_Pages/what_happen_diabetic';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import Consultourdoctor from '../components/home/Consultourdoctor';
import DiabeticFootFaq from '../components/Treatment_Pages/Diabetic_foot_faq.jsx';
import PageMeta from '../components/PageMeta';

const DiabeticFootPage = () => {
  return (
    <>
      <PageMeta
        title='Endovascular Treatment For Diabetic Foot - MEDAGG'
        description='Prevent amputation with endovascular treatment for diabetic foot at MEDAGG. Restore blood flow and promote healing without major surgery.'
      />
      <Navbar />
      <Treatmentnavbar />
      <DiabeticHeroSection />
      <WhyChooseDiabeticFoot />
      <HowWorkDiabetic />
      <AreYouExperiencingDiabetic />
      <DiabeticFootWhySurgeries />
      <BookAppointmentDiabetic />
      <CompareDiabetic />
      <WhatHappenDiabetic />
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor />
      <DiabeticFootFaq />
      {/* Add additional sections for the Diabetic Foot page here */}
    </>
  );
};

export default DiabeticFootPage;