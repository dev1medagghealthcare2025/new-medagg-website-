import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import FrozenShoulderHero from '../components/Treatment_Pages/frozen_shoulder_hersection';
import WhyChooseFrozenShoulder from '../components/Treatment_Pages/why_choose_frozen_shoulder';
import HowWorkFrozen from '../components/Treatment_Pages/how_work_forzen';
import AreYouExperiencingFrozen from '../components/Treatment_Pages/are_experience_frozen';
import CompareFrozen from '../components/Treatment_Pages/Compare_frozen';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import ConsultOurDoctor from '../components/home/Consultourdoctor';
import BookAppointmentFrozen from '../components/Treatment_Pages/book_appoinment_frozen';
import FrozenShoulderWhySurgeries from '../components/Treatment_Pages/frozen shoulder_why_surgeries';
import FrozenFaq from '../components/Treatment_Pages/frzon_faq.jsx';
import PageMeta from '../components/PageMeta';

const FrozenShoulderChennai = () => {
  return (
    <>
      <PageMeta
        title='Frozen Shoulder Treatment in Chennai | Non-Surgical ACE'
        description='Get advanced non-surgical Frozen Shoulder treatment in Chennai. Adhesive Capsulitis Embolization (ACE) by Interventional Radiology specialists at MEDAGG.'
      />
      <Navbar />
      <Treatmentnavbar />
      <FrozenShoulderHero city='Chennai' variant='chennai' />
      <WhyChooseFrozenShoulder />
      <HowWorkFrozen />
      <AreYouExperiencingFrozen />
      <FrozenShoulderWhySurgeries city='Chennai' variant='chennai' />
      <BookAppointmentFrozen city='Chennai' variant='chennai' />
      <CompareFrozen />
      <OurDoctor />
      <OurTestimonial />
      <ConsultOurDoctor city='Chennai' variant='chennai' />
      <FrozenFaq city='Chennai' variant='chennai' />
    </>
  );
};

export default FrozenShoulderChennai;
