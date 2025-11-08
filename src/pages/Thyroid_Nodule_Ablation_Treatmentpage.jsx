import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import Thyroid_Herosection from '../components/Treatment_Pages/Thyroid_herosection';
import WhyChooseThyroidAblation from '../components/Treatment_Pages/why_choice_Thyroid_ablation';
import HowThyroidWork from '../components/Treatment_Pages/How_thyroid_work';
import CompareTreatmentOptionThyroid from '../components/Treatment_Pages/Compare_treatment_option_Thyroid';
import Thyroid_bookappoinment from '../components/Treatment_Pages/Thyroid_bookappoinment';
import WhatHappensThyroidAblation from '../components/Treatment_Pages/What_Happens_Thyroid_Ablation';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import FAQ_Home from '../components/home/FAQ_Home';

const Thyroid_Nodule_Ablation_Treatmentpage = () => (
  <>
    <Navbar />
    <Treatmentnavbar />
    <Thyroid_Herosection />
    <WhyChooseThyroidAblation />
    <HowThyroidWork />
    <Thyroid_bookappoinment />
    <CompareTreatmentOptionThyroid />
    <WhatHappensThyroidAblation videoUrl="https://youtube.com/shorts/0OJM9PpKc0E?si=QfoaSsFNcqCXIPGq" />
    <OurDoctor />
    <OurTestimonial />
    <Consultourdoctor />
    <FAQ_Home />
  </>
);

export default Thyroid_Nodule_Ablation_Treatmentpage;
