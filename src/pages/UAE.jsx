import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import UAE_Herosection from '../components/Treatment_Pages/UAE_Herosection';
import WhyChooseUAE from '../components/Treatment_Pages/why_choose_UAE';
import HowUAEWorks from '../components/Treatment_Pages/How_UAE_work';
import WhatHappenUAE from '../components/Treatment_Pages/what_happen_UAE';
import AreYouExperiencingUAE from '../components/Treatment_Pages/Are_you_experience_UAE';
import ThinkYouMightNeedUAE from '../components/Treatment_Pages/Think_you_might_need_UAE';
import UAE_Compare from '../components/Treatment_Pages/UAE_Compare';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';

const UAEPage = () => {
  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <UAE_Herosection />
      <WhyChooseUAE />
      <HowUAEWorks />
      <AreYouExperiencingUAE />
      <ThinkYouMightNeedUAE />
      <UAE_Compare />
      <WhatHappenUAE videoUrl="https://youtube.com/shorts/iw5G9U2LMNI?si=ql6ur0THJoZDrlYe" />
      <OurDoctor />
      <Consultourdoctor />
    </>
  );
};

export default UAEPage;
