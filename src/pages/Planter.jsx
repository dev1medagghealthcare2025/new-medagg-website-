import React from 'react';
import PlanterHeroSection from '../components/Treatment_Pages/Planter_herosection.jsx';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import WhyChoosePlantar from '../components/Treatment_Pages/Why_choose_plantar.jsx';
import HowPlantarWork from '../components/Treatment_Pages/How_Plantar_work.jsx';
import AreYouExperiencingPlanter from '../components/Treatment_Pages/Are_You_Experiencing_Planter.jsx';
import CompareTreatmentPlanter from '../components/Treatment_Pages/Compare_treatment_Planter.jsx';
import WhatHappensInPlantar from '../components/Treatment_Pages/What_Happens_in_Plantar.jsx';
import BookappoinmentPlanter from '../components/Treatment_Pages/Bookappoinment_planter.jsx';
import PlanterWhySurgeries from '../components/Treatment_Pages/Planter_why_surgeries.jsx';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial.jsx';
import PlantarFaq from '../components/Treatment_Pages/Planter-faq.jsx';
import PageMeta from '../components/PageMeta';

const Planter = ({ city = '', variant = '' }) => {
  return (
    <>
      <PageMeta
        title='Plantar Fasciitis Non Surgery | Plantar Fascial Embolization Treatment in Chennai'
        description='End chronic heel pain with Plantar Fascial Embolization in Chennai. A revolutionary non-surgical solution for persistent Plantar Fasciitis.'
      />
      <Navbar />
      <Treatmentnavbar />
      <PlanterHeroSection city={city} variant={variant} />
      <WhyChoosePlantar />
      <HowPlantarWork />
      <AreYouExperiencingPlanter />
      <PlanterWhySurgeries city={city} variant={variant} />
      <BookappoinmentPlanter city={city} variant={variant} />
      <CompareTreatmentPlanter />
      {/* <WhatHappensInPlantar /> */}
      <OurDoctor />
      <OurTestimonial/>
      <Consultourdoctor city={city} variant={variant} />
      <PlantarFaq city={city} variant={variant} />
      {/* You can add other components for the Planter page here */}
    </>
  );
};

export default Planter;
