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
import BookAppointmentFrozen from '../components/Treatment_Pages/book_appoinment_frozen';
import FrozenShoulderWhySurgeries from '../components/Treatment_Pages/frozen shoulder_why_surgeries';
import FrozenFaq from '../components/Treatment_Pages/frzon_faq.jsx';
import PageMeta from '../components/PageMeta';

const FrozenShoulderPage = ({ city = '', variant = '' }) => {
  return (
    <>
      <PageMeta
        title='Frozen Shoulder Treatment | An Alternative Treatment for Frozen Shoulder'
        description='Restore shoulder mobility with our non-surgical embolization treatment. A fast and effective alternative to surgery for frozen shoulder relief.'
      />
      <Navbar />
      <Treatmentnavbar />
      <FrozenShoulderHero city={city} variant={variant} />
      <WhyChooseFrozenShoulder />
      <HowWorkFrozen />
      <AreYouExperiencingFrozen />
      <FrozenShoulderWhySurgeries city={city} variant={variant} />
      <BookAppointmentFrozen city={city} variant={variant} />
      <CompareFrozen />
      {/* <WhatHappensFrozen /> */}
      <OurDoctor />
      <OurTestimonial />
      <ConsultOurDoctor city={city} variant={variant} />
      <FrozenFaq city={city} variant={variant} />

    </>
  );
};

export default FrozenShoulderPage;