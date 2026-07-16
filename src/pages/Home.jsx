import React from 'react';
import Drmedagg from '../components/home/Drmedagg';
import PatientJourney from '../components/home/Paientsjurney';
import BookAnAppoinment from '../components/home/BookAnAppoinment';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import OurServiceSection from '../components/home/ourservice';
import WhyMedagg from '../components/home/whymedagg';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import FAQ_Home from '../components/home/FAQ_Home';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import RunningCity from '../components/home/running_city';
import MobileHomeActionGrid from '../components/home/MobileHomeActionGrid';
import PageMeta from '../components/PageMeta';

const Home = () => (
  <div className='w-full min-h-screen bg-pink-50'>
    <PageMeta
      title='Non - Surgical Solutions | Non-Surgical Treatments - MEDAGG | No Surgeries'
      description='Discover advanced non-surgical medical treatments at MEDAGG. We provide minimally invasive alternatives for various conditions. Get better without surgery.'
    />
    <Navbar />
    <Treatmentnavbar />
    <HeroSection />
    <MobileHomeActionGrid />
    <RunningCity />
    <ServicesSection />
    <OurServiceSection />
    <Drmedagg />
    <PatientJourney />
    <BookAnAppoinment />
    <WhyMedagg />
    <OurDoctor />
    <OurTestimonial />
    <Consultourdoctor />
    <FAQ_Home />
  </div>
);

export default Home;
