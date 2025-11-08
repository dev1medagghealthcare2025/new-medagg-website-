import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import CTO_Herosection from '../components/Treatment_Pages/CTO_Herosection';
import Why_choose_CTO from '../components/Treatment_Pages/Why_choose_CTO';
import How_CTO_works from '../components/Treatment_Pages/How_CTO_works';
import What_Happens_in_CTO_treatment from '../components/Treatment_Pages/What_Happens_in_CTO_treatment';
import Are_You_Experiencing_CTO from '../components/Treatment_Pages/Are_You_Experiencing_CTO';
import Compare_treatment_cto from '../components/Treatment_Pages/compare_treatment_cto';
import Bookanappoinment_cto from '../components/Treatment_Pages/bookanappoinment_cto';
import Ourdoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import FAQ_Home from '../components/home/FAQ_Home';


const CTO_treatmentpage = () => {
  return (
    <div>
      <Navbar />
      <Treatmentnavbar />
      <CTO_Herosection />
      <Why_choose_CTO />
      <How_CTO_works />
      <Are_You_Experiencing_CTO />
      <Bookanappoinment_cto />
      <Compare_treatment_cto />
      <What_Happens_in_CTO_treatment />
      <Ourdoctor />
      <OurTestimonial/>
      <Consultourdoctor />
      <FAQ_Home/>
    </div>
  );
};

export default CTO_treatmentpage;