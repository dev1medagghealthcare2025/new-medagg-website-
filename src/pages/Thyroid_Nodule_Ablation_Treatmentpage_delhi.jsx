import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import ThyroidHerosection from '../components/Treatment_Pages/Thyroid_herosection';
import WhyChooseThyroid from '../components/Treatment_Pages/why_choice_Thyroid_ablation';
import HowThyroidWork from '../components/Treatment_Pages/How_thyroid_work';
import ThyroidWhySurgeries from '../components/Treatment_Pages/Thyroid_why_surgeries';
import ThyroidBookAppointment from '../components/Treatment_Pages/Thyroid_bookappoinment';
import CompareTreatmentThyroid from '../components/Treatment_Pages/Compare_treatment_option_Thyroid';
import WhatHappensThyroid from '../components/Treatment_Pages/What_Happens_Thyroid_Ablation';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import ConsultOurDoctor from '../components/home/Consultourdoctor';
import ThyroidFaq from '../components/Treatment_Pages/Thyroid_faq';
import PageMeta from '../components/PageMeta';

const Thyroid_Nodule_Ablation_Treatmentpage_delhi = () => (
  <>
    <PageMeta
      title='Thyroid Nodule Ablation Non Surgical Treatment in Delhi'
      description='Effective non-surgical thyroid nodule treatment in Delhi. Minimally invasive ablation procedure with quick recovery. Book today!'
    />
    <Navbar />
    <Treatmentnavbar />
    <ThyroidHerosection city='Delhi' variant='delhi' />
    <WhyChooseThyroid city='Delhi' variant='delhi' />
    <HowThyroidWork />
    <ThyroidWhySurgeries city='Delhi' variant='delhi' />
    <ThyroidBookAppointment city='Delhi' variant='delhi' />
    <CompareTreatmentThyroid />
    <WhatHappensThyroid videoUrl='https://youtube.com/shorts/0OJM9PpKc0E?si=QfoaSsFNcqCXIPGq' />
    <OurDoctor />
    <OurTestimonial />
    <ConsultOurDoctor city='Delhi' variant='delhi' />
    <ThyroidFaq city='Delhi' variant='delhi' />
  </>
);

export default Thyroid_Nodule_Ablation_Treatmentpage_delhi;
