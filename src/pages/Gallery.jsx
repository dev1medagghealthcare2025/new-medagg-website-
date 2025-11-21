import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import GalleryHeroSection from '../components/gallery/gallery_herosection';
import GalleryMain from '../components/gallery/gallery_main';
export default function Gallery() {
  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <GalleryHeroSection />
      <GalleryMain />
    </>
  );
}