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

const DiabeticFootCoimbatore = () => {
  return (
    <>
      <PageMeta
        title='Diabetic Foot Treatment in Coimbatore | Non-Surgical Limb Care'
        description='Get advanced non-surgical Diabetic Foot treatment in Coimbatore. Endovascular recanalization & stenting by Interventional Radiology specialists at MEDAGG.'
      />
      <Navbar />
      <Treatmentnavbar />
      <DiabeticHeroSection city='Coimbatore' variant='coimbatore' />
      <WhyChooseDiabeticFoot />
      <HowWorkDiabetic />
      <AreYouExperiencingDiabetic />
      <DiabeticFootWhySurgeries city='Coimbatore' variant='coimbatore' />
      <BookAppointmentDiabetic city='Coimbatore' variant='coimbatore' />
      <CompareDiabetic />
      <WhatHappenDiabetic /> 
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor city='Coimbatore' variant='coimbatore' />
      <DiabeticFootFaq city='Coimbatore' variant='coimbatore' />
    </>
  );
};

export default DiabeticFootCoimbatore;
