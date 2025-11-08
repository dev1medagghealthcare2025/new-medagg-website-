import React, { useRef } from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import InvestorHerosection from '../components/investor/Investor_herosection';
import WhyPartnerWithMedagg from '../components/investor/why_partner_with_medagg';
import InfoMedagg from '../components/investor/info_medagg';

const BecomeAnInvestor = () => {
  const infoSectionRef = useRef(null);

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <Treatmentnavbar />
      <InvestorHerosection scrollToInfoRef={infoSectionRef} />
      <WhyPartnerWithMedagg />
      <div ref={infoSectionRef}>
        <InfoMedagg />
      </div>
    </div>
  );
};

export default BecomeAnInvestor;