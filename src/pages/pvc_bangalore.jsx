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
import PVC_FAQ from '../components/Treatment_Pages/pvc_faq';

const PVCBangalore = () => {
  return (
    <div className='bg-white'>
      <PageMeta
        title='Pelvic Vein Embolization in Bangalore | Minimally Invasive Relief for Chronic Pelvic Pain'
        description='Advanced non-surgical Pelvic Vein Embolization treatment in Bangalore. Minimally invasive relief for chronic pelvic pain caused by pelvic venous congestion.'
      />
      <Navbar />
      <Treatmentnavbar />
      <PVCHeroSection city='Bangalore' variant='bangalore' />
      <PVCWhyChooseNoSurgeries />
      <PVCHowItWorks />
      <PVCAreYouExperiencing />
      <PVCWhyChooseMedagg city='Bangalore' variant='bangalore' />
      <PVCBookAppointment city='Bangalore' variant='bangalore' />
      <PVCCompare />
      <OurDoctor />
      <OurTestimonial />
      <ConsultOurDoctor city='Bangalore' variant='bangalore' />
      <PVC_FAQ city='Bangalore' variant='bangalore' />
    </div>
  );
};

export default PVCBangalore;
