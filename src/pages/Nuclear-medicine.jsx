import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import PageMeta from '../components/PageMeta';
import NuclearMedicineHerosection from '../components/Treatment_Pages/Nuclear_medicine_herosection';
import WhyChooseMedaggNuclear from '../components/Treatment_Pages/why_choose_medagg_nuclear';
import HowNuclearWork from '../components/Treatment_Pages/How_nuclear_work';
import AreExperienceNuclear from '../components/Treatment_Pages/are_experence_nuclear';
import NosurgeriesTreatmentNuclear from '../components/Treatment_Pages/Nosurgeries_treatment_nuclear';
import BookAppoinmentNuclear from '../components/Treatment_Pages/Book_appoinment_nuclear';
import NuclearCompare from '../components/Treatment_Pages/Nuclear_Compare';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import ConsultOurDoctor from '../components/home/Consultourdoctor';
import FAQHome from '../components/home/FAQ_Home';

const NuclearMedicinePage = () => (
  <div className='min-h-screen bg-white'>
    <PageMeta
      title='Nuclear Medicine - MEDAGG | No Surgeries'
      description='Explore advanced nuclear medicine treatments at MEDAGG. Minimally invasive options for targeted therapy and diagnosis.'
    />
    <Navbar />
    <Treatmentnavbar />
    <NuclearMedicineHerosection />
    <WhyChooseMedaggNuclear />
    <HowNuclearWork />
    <AreExperienceNuclear />
    <NosurgeriesTreatmentNuclear />
    <BookAppoinmentNuclear />
    <NuclearCompare />
    <OurDoctor />
    <OurTestimonial />
    <ConsultOurDoctor />
    <FAQHome />
  </div>
);

export default NuclearMedicinePage;
