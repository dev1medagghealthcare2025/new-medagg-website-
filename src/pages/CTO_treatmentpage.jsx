import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import CTO_Herosection from '../components/Treatment_Pages/CTO_Herosection';
import CTOWhySurgeries from '../components/Treatment_Pages/CTO_Why_surgeries';
import Why_choose_CTO from '../components/Treatment_Pages/Why_choose_CTO';
import How_CTO_works from '../components/Treatment_Pages/How_CTO_works';
import What_Happens_in_CTO_treatment from '../components/Treatment_Pages/What_Happens_in_CTO_treatment';
import Are_You_Experiencing_CTO from '../components/Treatment_Pages/Are_You_Experiencing_CTO';
import Compare_treatment_cto from '../components/Treatment_Pages/compare_treatment_cto';
import Bookanappoinment_cto from '../components/Treatment_Pages/bookanappoinment_cto';
import Ourdoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import CtoFaq from '../components/Treatment_Pages/CTO_FAQ.jsx';
import PageMeta from '../components/PageMeta';

const CTO_treatmentpage = () => {
  return (
    <div>
      <PageMeta
        title='Chronic Total Occlusion | Interventional Cardiologist Treatment | No Surgeries'
        description='Expert interventional cardiology for Chronic Total Occlusion (CTO). We clear complete heart blockages using advanced non-surgical techniques.'
      />
      <Navbar />
      <Treatmentnavbar />
      <CTO_Herosection />
      <Why_choose_CTO />
      <How_CTO_works />
      <Are_You_Experiencing_CTO />
      <CTOWhySurgeries />
      <Bookanappoinment_cto />
      <Compare_treatment_cto />
      <What_Happens_in_CTO_treatment />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor />
      <CtoFaq />
      
    </div>
  );
};

export default CTO_treatmentpage;
