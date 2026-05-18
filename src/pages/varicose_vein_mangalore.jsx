import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import VaricoseVeinHeroSection from '../components/Treatment_Pages/varicosevein_herosection';
import VvWhySurgeries from '../components/Treatment_Pages/Vv_why_surgeries';
import WhyChooseEndovenousAblation from '../components/Treatment_Pages/why_choose_endovenous_ablation';
import WhatHappensInEndovenousAblation from '../components/Treatment_Pages/What_Happens_in_Endovenous_ablation';
import VaricoseVeinWork from '../components/Treatment_Pages/varicosevein_work';
import AreYouExperiencingVaricocele from '../components/Treatment_Pages/Are_You_Experiencing_varicocele';
import CompareTreatmentOptions from '../components/Treatment_Pages/compare_treatment_option_varicosevein';
import Ourdoctor from '../components/home/Ourdoctor';
import ConsultOurDoctor from '../components/home/Consultourdoctor';
import VV_BookAnAppointment from '../components/Treatment_Pages/vv_bookanappoinment';
import OurTestimonial from '../components/home/our_testimonial';
import VvFaq from '../components/Treatment_Pages/vv_faq';
import PageMeta from '../components/PageMeta';

const VaricoseVeinMangalore = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='No-Surgery Varicose Veins Treatment in Mangalore | Endovenous Ablation'
        description='Advanced non-surgical varicose veins treatment in Mangalore. Consult interventional radiology specialists for minimally invasive vein-preserving care.'
      />
      <Navbar />
      <Treatmentnavbar />
      <VaricoseVeinHeroSection city='Mangalore' variant='mangalore' />
      <WhyChooseEndovenousAblation />
      <VaricoseVeinWork />
      <AreYouExperiencingVaricocele />
      <VvWhySurgeries city='Mangalore' variant='mangalore' />
      <VV_BookAnAppointment city='Mangalore' variant='mangalore' />
      <CompareTreatmentOptions />
      <WhatHappensInEndovenousAblation videoUrl='https://youtube.com/shorts/HKUDEpX8MPw?si=QhzEi3qij_1r_mcU' />
      <Ourdoctor />
      <OurTestimonial />
      <ConsultOurDoctor city='Mangalore' variant='mangalore' />
      <VvFaq city='Mangalore' variant='mangalore' />
    </div>
  );
};

export default VaricoseVeinMangalore;
