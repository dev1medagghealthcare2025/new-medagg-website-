import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import EndovascularCoilingHeroSection from '../components/Treatment_Pages/Endovascular_coiling_herosection';
import ECWhySurgeries from '../components/Treatment_Pages/EC_Why_surgeries';
import WhyChooseEndovascularCoiling from '../components/Treatment_Pages/Why_choose_endovascular_coiling';
import HowECWorks from '../components/Treatment_Pages/HOW_EC_works';
import AreYouExperiencingEC from '../components/Treatment_Pages/Are_You_Experiencing_ec';
import EC_Book_Appointment from '../components/Treatment_Pages/EC_Book_Appointment';
import TreatmentCompareEC from '../components/Treatment_Pages/Treatment_compare_ec';
import WhatHappensInEndovascularCoiling from '../components/Treatment_Pages/What_Happens_in_Endovascular_coiling';
import Ourdoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import EC_FAQ from '../components/Treatment_Pages/EC_FAQ';
import PageMeta from '../components/PageMeta';

const Endovascular_Coiling_treatment = ({ city = '', variant = '' }) => {
  return (
    <div>
      <PageMeta
        title='Endovascular Coiling Surgery Treatment | Best Interventional Neurology Hospital in Chennai'
        description='Advanced non-surgical treatment for brain aneurysms. Our interventional neurology experts in Chennai provide life-saving endovascular coiling.'
      />
      <Navbar />
      <Treatmentnavbar />
      <EndovascularCoilingHeroSection city={city} variant={variant} />
      <WhyChooseEndovascularCoiling />
      <HowECWorks />
      <AreYouExperiencingEC />
      <ECWhySurgeries city={city} variant={variant} />
      <EC_Book_Appointment city={city} variant={variant} />
      <TreatmentCompareEC />
      <WhatHappensInEndovascularCoiling />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor city={city} variant={variant} />
      <EC_FAQ city={city} variant={variant} />
    </div>
  );
};

export default Endovascular_Coiling_treatment;
