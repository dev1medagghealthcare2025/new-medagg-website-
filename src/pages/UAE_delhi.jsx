import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import UAE_Herosection from '../components/Treatment_Pages/UAE_Herosection';
import WhyChooseUAE from '../components/Treatment_Pages/why_choose_UAE';
import UAEWhySurgeries from '../components/Treatment_Pages/UAE_Why_surgeries';
import HowUAEWorks from '../components/Treatment_Pages/How_UAE_work';
import WhatHappenUAE from '../components/Treatment_Pages/what_happen_UAE';
import AreYouExperiencingUAE from '../components/Treatment_Pages/Are_you_experience_UAE';
import ThinkYouMightNeedUAE from '../components/Treatment_Pages/Think_you_might_need_UAE';
import UAE_Compare from '../components/Treatment_Pages/UAE_Compare';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import UaeFaq from '../components/Treatment_Pages/UAE_faq';
import PageMeta from '../components/PageMeta';

const UAE_delhi = () => {
  return (
    <>
      <PageMeta
        title='No-Surgery Uterine Fibroid Treatment in Delhi | Uterine Artery Embolization (UAE)'
        description='Advanced non-surgical uterine fibroid treatment in Delhi with Uterine Artery Embolization (UAE). Consult IR specialists for uterus-preserving care.'
      />
      <Navbar />
      <Treatmentnavbar />
      <UAE_Herosection city='Delhi' variant='delhi' />
      <WhyChooseUAE />
      <HowUAEWorks />
      <AreYouExperiencingUAE />
      <UAEWhySurgeries city='Delhi' variant='delhi' />
      <ThinkYouMightNeedUAE city='Delhi' variant='delhi' />
      <UAE_Compare />
      <WhatHappenUAE
        videoUrl='https://youtu.be/js7-2vuNCo4?si=eUjQWFpGPOAx0SIy'
        orientation='portrait'
      />
      <OurDoctor />
      <Consultourdoctor city='Delhi' variant='delhi' />
      <UaeFaq city='Delhi' variant='delhi' />
    </>
  );
};

export default UAE_delhi;
