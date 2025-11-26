import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import CareerHeroSection from '../components/Career/Career_herosection';
import CareerWhyJoinUs from '../components/Career/career_why_join_us';
import CareerOpening from '../components/Career/career_opening';
import CareerGrowth from '../components/Career/career_growth';
const CareerPage = () => {
  return (
    <main className="w-full">
      <Navbar />
      <Treatmentnavbar />
      <CareerHeroSection />
      <CareerWhyJoinUs />
      <CareerOpening />
      <CareerGrowth />
      {/* Add more career sections here as needed */}
    </main>
  );
};

export default CareerPage;