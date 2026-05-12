import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import Varicocele_herosection from '../components/Treatment_Pages/Varicocele_herosection';
import WhyChooseVaricocele from '../components/Treatment_Pages/why_choice_ Varicocele';
import HowVaricoceleEmbolizationWork from '../components/Treatment_Pages/How_Varicocele_Embolization_Work';
import WhatHappensInVaricoceleEmbolization from '../components/Treatment_Pages/What_Happens_in_VaricoceleEmbolization';
import AreYouExperiencingVaricocele from '../components/Treatment_Pages/are_you_experience_varicocele';
import BookAppointmentVaricocele from '../components/Treatment_Pages/BookAppointmentVaricocele';
import CompareTreatmentOptionVaricocele from '../components/Treatment_Pages/Compare_treatment_option_Varicocele';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import VaricoceleFaq from '../components/Treatment_Pages/Varicocele.faq';
import PageMeta from '../components/PageMeta';
import VaricoceleWhySurgeries from '../components/Treatment_Pages/varicocele_why_surgeries';

const Varicocele_embolization_mangalore = () => {
  return (
    <>
      <PageMeta
        title='Best Specialists for Varicocele Embolization | Non-surgical Varicocele Treatment in Mangalore'
        description='Seek expert non-surgical varicocele treatment in Mangalore. Our embolization procedure offers quick recovery and solves infertility or pain issues.'
      />
      <Navbar />
      <Treatmentnavbar />
      <Varicocele_herosection city='Mangalore' variant='mangalore' />
      <WhyChooseVaricocele city='Mangalore' variant='mangalore' />
      <HowVaricoceleEmbolizationWork />
      <AreYouExperiencingVaricocele />
      <VaricoceleWhySurgeries city='Mangalore' variant='mangalore' />
      <BookAppointmentVaricocele city='Mangalore' variant='mangalore' />
      <CompareTreatmentOptionVaricocele />
      <WhatHappensInVaricoceleEmbolization videoUrl='https://youtube.com/shorts/3U_LMSCCdWI?si=PRGrCs4TpUB9gdXw' />
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor city='Mangalore' variant='mangalore' />
      <VaricoceleFaq city='Mangalore' variant='mangalore' />
    </>
  );
};

export default Varicocele_embolization_mangalore;
