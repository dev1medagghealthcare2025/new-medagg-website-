import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import GAE_HeroSection from '../components/Treatment_Pages/GAE_Herosection';
import GAE_Treatment_Why_Choose_us from '../components/Treatment_Pages/GAE_Treatment_Why_Choose_us';
import HowGAEWork from '../components/Treatment_Pages/HowGAEWork';
import GAE_Are_you_experience from '../components/Treatment_Pages/GAE_Are_you_experience';
import GAE_Bookanappoinment from '../components/Treatment_Pages/GAE_Bookanappoinment';
import GAE_Compare_treatment_option from '../components/Treatment_Pages/GAE_Compare_treatment_option';
import What_happen_in_GAE from '../components/Treatment_Pages/what_happen_in_GAE';
import Ourdoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import GaeFaq from '../components/Treatment_Pages/gae_faq';
import PageMeta from '../components/PageMeta';
import GAEWhySurgeries from '../components/Treatment_Pages/GAE_Why_Surgeries';

const GAE_Treatmentpage_mangalore = () => (
  <>
    <PageMeta
      title='Genicular Artery Embolization Non Surgical Treatment With GAE in Mangalore'
      description='Relieve chronic knee pain without surgery. Genicular Artery Embolization (GAE) in Mangalore offers effective, non-invasive knee pain treatment. Book today!'
    />
    <Navbar />
    <Treatmentnavbar />
    <GAE_HeroSection city='Mangalore' variant='mangalore' />
    <GAE_Treatment_Why_Choose_us />
    <HowGAEWork />
    <GAE_Are_you_experience />
    <GAEWhySurgeries city='Mangalore' variant='mangalore' />
    <GAE_Bookanappoinment city='Mangalore' variant='mangalore' />
    <GAE_Compare_treatment_option />
    <What_happen_in_GAE
      videoUrl='https://youtube.com/shorts/vM5o0rX3lag?si=OX06gQBB8iRG9EhM'
      orientation="portrait"
    />
    <Ourdoctor />
    <OurTestimonial />
    <Consultourdoctor city='Mangalore' variant='mangalore' />
    <GaeFaq city='Mangalore' variant='mangalore' />
  </>
);

export default GAE_Treatmentpage_mangalore;
