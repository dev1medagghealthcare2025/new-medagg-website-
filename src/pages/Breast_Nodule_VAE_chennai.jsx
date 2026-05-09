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

const BreastNoduleVAEChennai = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='Breast Nodule Treatment in Chennai | VAE - NoSurgeries'
        description='Advanced non-surgical Breast Nodule treatment in Chennai using Vacuum-Assisted Excision (VAE). Scar-free removal of benign breast lumps by Interventional Radiology specialists.'
      />
      <Navbar />
      <Treatmentnavbar />
      <BreastNoduleVAEHeroSection city='Chennai' variant='chennai' />
      <WhyChooseVAE />
      <HowVAEWorks />
      <AreYouExperiencingVAE />
      <BreastNoduleWhySurgeries city='Chennai' variant='chennai' />
      <BookAnAppointmentVAE city='Chennai' variant='chennai' />
      <CompareTreatmentVAE />
      <WhatHappensInVAE videoUrl='https://youtube.com/shorts/xniZMciljic?si=d4HK5sNyGO2ndjfU' />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor city='Chennai' variant='chennai' />
      <BreastNoduleFaq city='Chennai' variant='chennai' />
    </div>
  );
};

export default BreastNoduleVAEChennai;
