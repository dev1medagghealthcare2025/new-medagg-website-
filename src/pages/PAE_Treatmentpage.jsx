import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import PAE_HeroSection from '../components/Treatment_Pages/PAE_Herosection';
import PAE_Treatment_About from '../components/Treatment_Pages/What_happens_in_PAE';
import PAE_Treatment_Procedure from '../components/Treatment_Pages/HowPAEWork';
import PAE_Treatment_Why_Choose_Us from '../components/Treatment_Pages/whychoosePAE';
import PAE_Treatment_FAQs from '../components/Treatment_Pages/Are_you_experience';
import OurTestimonial from '../components/home/our_testimonial';
import PAE_Treatment_Book_Appointment from '../components/Treatment_Pages/Compare_treatment_option_PAE';
import OurDoctor from '../components/home/Ourdoctor';
import Consultourdoctor from '../components/home/Consultourdoctor';
import PAE_Treatment_Testimonials from '../components/Treatment_Pages/Have_Postate';
import PaeFaq from '../components/Treatment_Pages/Pae_faq';
import PageMeta from '../components/PageMeta';
import PAEWhySurgeries from '../components/Treatment_Pages/PAE_Why_Surgeries';
const PAE_Treatmentpage = () => (
  <>
    <PageMeta
      title='Prostate Artery Embolization Non Surgical Treatment With PAE in Chennai'
      description='Effective BPH relief with Prostate Artery Embolization (PAE) in Chennai. A non-surgical, painless treatment for enlarged prostate. Book today!'
    />
    <Navbar />
    <Treatmentnavbar />
    <PAE_HeroSection />
    <PAE_Treatment_Why_Choose_Us />
    <PAE_Treatment_Procedure />
    <PAE_Treatment_FAQs />
    <PAEWhySurgeries />
    <PAE_Treatment_Testimonials />
    <PAE_Treatment_Book_Appointment />
    <PAE_Treatment_About
      videoUrl='https://www.youtube-nocookie.com/embed/c5DucffDYec?rel=0&modestbranding=1&autohide=1'
      orientation="portrait"
    />
    <OurDoctor />
    <OurTestimonial />
    <Consultourdoctor />
    <PaeFaq />
  </>
);

export default PAE_Treatmentpage;
