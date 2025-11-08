import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import About_herosection from '../components/About_us/About_herosection';
import About_Founder from '../components/About_us/About_Founder';
import Type_of_paients_about from '../components/About_us/Type_of_paients_about';
import What_We_Do_Differently from '../components/About_us/What_We_Do_Differently';
import The_Story_of_Our_Transformation from '../components/About_us/The_Story_of_Our_Transformation';
import Trusted_by_Patients_Across_India from '../components/About_us/Trusted_by_Patients_Across_India';

const About = () => (
  <div className='min-h-screen bg-white'>
    <Navbar />
    <Treatmentnavbar />
    <About_herosection />
    <div className='bg-pink-50'>
      <About_Founder />
      <Type_of_paients_about />
      <What_We_Do_Differently />
      <The_Story_of_Our_Transformation />
      <Trusted_by_Patients_Across_India />
    </div>
  </div>
);

export default About;
