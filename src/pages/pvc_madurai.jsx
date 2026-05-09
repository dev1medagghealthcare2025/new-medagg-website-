import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import PageMeta from '../components/PageMeta';
import PVCHeroSection from '../components/Treatment_Pages/pvc_herosection';
import PVCWhyChooseNoSurgeries from '../components/Treatment_Pages/pvc_whychoose_nosurgeries';
import PVCHowItWorks from '../components/Treatment_Pages/pvc_how_work';
import PVCAreYouExperiencing from '../components/Treatment_Pages/pvc_Are_You_Experiencing';
import PVCWhyChooseMedagg from '../components/Treatment_Pages/pcv_why_choose_medagg';
import PVCBookAppointment from '../components/Treatment_Pages/pvc_bookappoinment';
import PVCCompare from '../components/Treatment_Pages/pvc_compare';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import ConsultOurDoctor from '../components/home/Consultourdoctor';
import FAQHome from '../components/home/FAQ_Home';

const PVCMadurai = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='Pelvic Vein Embolization in Madurai | Minimally Invasive Relief for Chronic Pelvic Pain'
        description='Advanced non-surgical Pelvic Vein Embolization treatment in Madurai. Minimally invasive relief for chronic pelvic pain caused by pelvic venous congestion.'
      />
      <Navbar />
      <Treatmentnavbar />
      <PVCHeroSection city='Madurai' variant='madurai' />
      <PVCWhyChooseNoSurgeries />
      <PVCHowItWorks />
      <PVCAreYouExperiencing />
      <PVCWhyChooseMedagg city='Madurai' variant='madurai' />
      <PVCBookAppointment city='Madurai' variant='madurai' />
      <PVCCompare />
      <OurDoctor />
      <OurTestimonial />
      <ConsultOurDoctor city='Madurai' variant='madurai' />
      <FAQHome />
    </div>
  );
};

export default PVCMadurai;
