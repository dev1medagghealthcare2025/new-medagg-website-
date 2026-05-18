import React from 'react';
import PlanterHeroSection from '../components/Treatment_Pages/Planter_herosection.jsx';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import WhyChoosePlantar from '../components/Treatment_Pages/Why_choose_plantar.jsx';
import HowPlantarWork from '../components/Treatment_Pages/How_Plantar_work.jsx';
import AreYouExperiencingPlanter from '../components/Treatment_Pages/Are_You_Experiencing_Planter.jsx';
import CompareTreatmentPlanter from '../components/Treatment_Pages/Compare_treatment_Planter.jsx';
import BookappoinmentPlanter from '../components/Treatment_Pages/Bookappoinment_planter.jsx';
import PlanterWhySurgeries from '../components/Treatment_Pages/Planter_why_surgeries.jsx';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial.jsx';
import PlantarFaq from '../components/Treatment_Pages/Planter-faq.jsx';
import PageMeta from '../components/PageMeta';

const Planter_mangalore = () => {
  return (
    <>
      <PageMeta
        title='Plantar Fasciitis Treatment in Mangalore | Non-Surgical Heel Pain Relief'
        description='Get advanced non-surgical Plantar Fasciitis treatment in Mangalore. Plantar Fascial Embolization (PFE) by Interventional Radiology specialists for chronic heel pain relief.'
      />
      <Navbar />
      <Treatmentnavbar />
      <PlanterHeroSection city='Mangalore' variant='mangalore' />
      <WhyChoosePlantar />
      <HowPlantarWork />
      <AreYouExperiencingPlanter />
      <PlanterWhySurgeries city='Mangalore' variant='mangalore' />
      <BookappoinmentPlanter city='Mangalore' variant='mangalore' />
      <CompareTreatmentPlanter />
      <OurDoctor />
      <OurTestimonial />
      <Consultourdoctor city='Mangalore' variant='mangalore' />
      <PlantarFaq city='Mangalore' variant='mangalore' />
    </>
  );
};

export default Planter_mangalore;
