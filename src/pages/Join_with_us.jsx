import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import JoinWithUsHero from '../components/Treatment_Pages/Joinwithus_herosection';
import Joinwithus_future from '../components/Treatment_Pages/Joinwithus_future';
import WhyPartnerMedagg from '../components/Treatment_Pages/Why_partner_medagg_joinwith';
import JoinWithLanding from '../components/Treatment_Pages/Joinwith_Landing';

const JoinWithUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Treatmentnavbar />
      <JoinWithUsHero />
      <Joinwithus_future />
      <WhyPartnerMedagg />
      <JoinWithLanding />
      {/* Other sections for this page can be added here */}
    </div>
  );
};

export default JoinWithUs;
