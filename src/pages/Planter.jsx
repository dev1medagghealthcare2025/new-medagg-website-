import React from 'react';
import PlanterHeroSection from '../components/Treatment_Pages/Planter_herosection.jsx';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import WhyChoosePlantar from '../components/Treatment_Pages/Why_choose_plantar.jsx'
import HowPlantarWork from '../components/Treatment_Pages/How_Plantar_work.jsx';
import AreYouExperiencingPlanter from '../components/Treatment_Pages/Are_You_Experiencing_Planter.jsx';
import CompareTreatmentPlanter from '../components/Treatment_Pages/Compare_treatment_Planter.jsx';
import WhatHappensInPlantar from '../components/Treatment_Pages/What_Happens_in_Plantar.jsx';
import BookappoinmentPlanter from '../components/Treatment_Pages/Bookappoinment_planter.jsx';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial.jsx';
import FAQ_Home from '../components/home/FAQ_Home.jsx';
const Planter = () => {
  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <PlanterHeroSection />
      <WhyChoosePlantar />
      <HowPlantarWork />
      <AreYouExperiencingPlanter />
      <BookappoinmentPlanter />
      <CompareTreatmentPlanter />
      <WhatHappensInPlantar />
      <OurDoctor />
      <OurTestimonial/>
      <Consultourdoctor />
      <FAQ_Home/>
      
      {/* You can add other components for the Planter page here */}
    </>
  );
};

export default Planter;
