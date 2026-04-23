
import React from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import Hemorrhoidal_herosection from '../components/Treatment_Pages/Hemorrhoidal_herosection';
import WhyChooseHemorrhoidal from '../components/Treatment_Pages/why_choose_Hemorrhoidal';
import Hemorrhoids_Work from '../components/Treatment_Pages/Hemorrhoids_Work';
import What_Happens_Hemorrhoids from '../components/Treatment_Pages/What_Happens_Hemorrhoids';
import AreYouExperiencingHemorrhoids from '../components/Treatment_Pages/Are_You_Experiencing_Hemorrhoids';
import GAEWhySurgeries from '../components/Treatment_Pages/why_choose_medagg_Hemorrhoids';
import Hemorrhoids_compare from '../components/Treatment_Pages/Hemorrhoids_compare';
import Book_appoinment_Hemorrhoids from '../components/Treatment_Pages/Book_appoinment_Hemorrhoids';
import OurDoctor from '../components/home/Ourdoctor';
import OurTestimonial from '../components/home/our_testimonial';
import Consultourdoctor from '../components/home/Consultourdoctor';
import Hemorrhoids_faq from '../components/Treatment_Pages/Hemorrhoids_faq';

const Hemorrhoidal = ({ city = '', variant = '' }) => (
  <>
    <Navbar />
    <Treatmentnavbar />
    <Hemorrhoidal_herosection city={city} variant={variant} />
    <WhyChooseHemorrhoidal />
    <Hemorrhoids_Work />
    <AreYouExperiencingHemorrhoids />
    <GAEWhySurgeries city={city} variant={variant} />
    <Book_appoinment_Hemorrhoids city={city} variant={variant} />
    <Hemorrhoids_compare />
    <What_Happens_Hemorrhoids />
    <OurDoctor />
    <OurTestimonial />
    <Consultourdoctor city={city} variant={variant} />
    <Hemorrhoids_faq city={city} variant={variant} />
  </>
);

export default Hemorrhoidal;
