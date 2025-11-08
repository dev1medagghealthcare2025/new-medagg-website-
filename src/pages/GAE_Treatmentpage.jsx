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
import FAQ_Home from '../components/home/FAQ_Home';
const GAE_Treatmentpage = () => (
  <>
    <Navbar />
    <Treatmentnavbar />
    <GAE_HeroSection />
    <GAE_Treatment_Why_Choose_us />
    <HowGAEWork />
    <GAE_Are_you_experience />
    <GAE_Bookanappoinment />
    <GAE_Compare_treatment_option />
    <What_happen_in_GAE videoUrl="https://youtube.com/shorts/vM5o0rX3lag?si=OX06gQBB8iRG9EhM" />
    <Ourdoctor />
    <OurTestimonial />
    <Consultourdoctor />
    <FAQ_Home />
  </>
);

export default GAE_Treatmentpage;
