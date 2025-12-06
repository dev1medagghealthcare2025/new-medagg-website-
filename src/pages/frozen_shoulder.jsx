import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import FrozenShoulderHero from '../components/Treatment_Pages/frozen_shoulder_hersection';
import WhyChooseFrozenShoulder from '../components/Treatment_Pages/why_choose_frozen_shoulder';
import HowWorkFrozen from '../components/Treatment_Pages/how_work_forzen';
import AreYouExperiencingFrozen from '../components/Treatment_Pages/are_experience_frozen';
import CompareFrozen from '../components/Treatment_Pages/Compare_frozen';
import WhatHappensFrozen from '../components/Treatment_Pages/what_happen_frozen';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import ConsultOurDoctor from '../components/home/Consultourdoctor';
import FAQ_Home from '../components/home/FAQ_Home';
import BookAppointmentFrozen from '../components/Treatment_Pages/book_appoinment_frozen';
const FrozenShoulderPage = () => {
  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <FrozenShoulderHero />
      <WhyChooseFrozenShoulder />
      <HowWorkFrozen />
      <AreYouExperiencingFrozen />
      <BookAppointmentFrozen />
      <CompareFrozen />
      <WhatHappensFrozen />
      <OurDoctor />
      <OurTestimonial />
      <ConsultOurDoctor />
      <FAQ_Home />

    </>
  );
};

export default FrozenShoulderPage;