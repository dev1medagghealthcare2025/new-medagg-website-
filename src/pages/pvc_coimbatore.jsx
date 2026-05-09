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

const PVCCoimbatore = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='Pelvic Vein Embolization in Coimbatore | Minimally Invasive Relief for Chronic Pelvic Pain'
        description='Advanced non-surgical Pelvic Vein Embolization treatment in Coimbatore. Minimally invasive relief for chronic pelvic pain caused by pelvic venous congestion.'
      />
      <Navbar />
      <Treatmentnavbar />
      <PVCHeroSection city='Coimbatore' variant='coimbatore' />
      <PVCWhyChooseNoSurgeries />
      <PVCHowItWorks />
      <PVCAreYouExperiencing />
      <PVCWhyChooseMedagg city='Coimbatore' variant='coimbatore' />
      <PVCBookAppointment city='Coimbatore' variant='coimbatore' />
      <PVCCompare />
      <OurDoctor />
      <OurTestimonial />
      <ConsultOurDoctor city='Coimbatore' variant='coimbatore' />
      <FAQHome />
    </div>
  );
};

export default PVCCoimbatore;
