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

const BreastNoduleVAECoimbatore = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='Breast Nodule Treatment in Coimbatore | VAE - NoSurgeries'
        description='Advanced non-surgical Breast Nodule treatment in Coimbatore using Vacuum-Assisted Excision (VAE). Scar-free removal of benign breast lumps by Interventional Radiology specialists.'
      />
      <Navbar />
      <Treatmentnavbar />
      <BreastNoduleVAEHeroSection city='Coimbatore' variant='coimbatore' />
      <WhyChooseVAE />
      <HowVAEWorks />
      <AreYouExperiencingVAE />
      <BreastNoduleWhySurgeries city='Coimbatore' variant='coimbatore' />
      <BookAnAppointmentVAE city='Coimbatore' variant='coimbatore' />
      <CompareTreatmentVAE />
      <WhatHappensInVAE videoUrl='https://youtube.com/shorts/xniZMciljic?si=d4HK5sNyGO2ndjfU' />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor city='Coimbatore' variant='coimbatore' />
      <BreastNoduleFaq city='Coimbatore' variant='coimbatore' />
    </div>
  );
};

export default BreastNoduleVAECoimbatore;
