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
import BreastNoduleFaq from '../components/Treatment_Pages/breast_nodule_faq';
import PageMeta from '../components/PageMeta';
import BreastNoduleWhySurgeries from '../components/Treatment_Pages/Breast_Nodule_Why_Surgeries';

const BreastNoduleVAEMadurai = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='Breast Nodule Treatment in Madurai | Vacuum Assisted Excision (VAE)'
        description='Scar-free Vacuum Assisted Excision (VAE) for benign breast lumps in Madurai. Consult experts and get minimally invasive breast nodule treatment.'
      />
      <Navbar />
      <Treatmentnavbar />
      <BreastNoduleVAEHeroSection city='Madurai' variant='madurai' />
      <WhyChooseVAE />
      <HowVAEWorks />
      <AreYouExperiencingVAE />
      <BreastNoduleWhySurgeries city='Madurai' variant='madurai' />
      <BookAnAppointmentVAE city='Madurai' variant='madurai' />
      <CompareTreatmentVAE />
      <WhatHappensInVAE videoUrl='https://youtube.com/shorts/xniZMciljic?si=d4HK5sNyGO2ndjfU' />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor city='Madurai' variant='madurai' />
      <BreastNoduleFaq city='Madurai' variant='madurai' />
    </div>
  );
};

export default BreastNoduleVAEMadurai;
