// Scroll to top (or to an in-page anchor) on every route change
function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    // If URL contains a hash (e.g., /#services), scroll that element into view
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Otherwise, scroll to very top
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash, location.search]);
  return null;
}
import { Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Chatbot from './components/internal_components/chatbot';
import BackToTop from './components/BackToTop';
import PAE_Treatmentpage from './pages/PAE_Treatmentpage';
import GAE_Treatmentpage from './pages/GAE_Treatmentpage';
import Thyroid_Nodule_Ablation_Treatmentpage from './pages/Thyroid_Nodule_Ablation_Treatmentpage';
import About from './pages/About';
import Varicocele_embolization from './pages/Varicocele_embolization';
import VaricoseVeinPage from './pages/varicosevein';
import Blog from './pages/Blog';
import BlogPost from './components/blog/BlogPost';
import FTE from './pages/FTE';
import ContactUsPage from './pages/contact_us_page';
import UAEPage from './pages/uae';
import BreastNoduleVAEPage from './pages/Breast_Nodule_VAE';
import BreastNoduleCryoablationPage from './pages/Breast_nodule_cryoablation';
import Planter from './pages/Planter';
import Transcatheter_aortic_valve_implantation from './pages/Transcatheter_aortic_valve_implantation';
import CTO_treatmentpage from './pages/CTO_treatmentpage';
import RFA_treatmentpage from './pages/RFA_treatmentpage';
import Endovascular_Coiling_treatment from './pages/Endovascular_Coiling_treatment';
import RadiofrequencyAblationAVM from './pages/RadiofrequencyAblationAVM';
import Become_an_investor from './pages/Become_an_investor';
import BreastNoduleRadiofrequencyAblation from './pages/Breast_nodule_ radiofrequency_ablation';
import JoinWithUs from './pages/Join_with_us';
import Testiominal from './pages/Testiominal';

function App() {
  return (
    <div className='min-h-screen bg-pink-50 flex flex-col isolate'>
      <main className='flex-grow'>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pae' element={<PAE_Treatmentpage />} />
          <Route path='/gae' element={<GAE_Treatmentpage />} />
          <Route path='/thyroid' element={<Thyroid_Nodule_Ablation_Treatmentpage />} />
          <Route path='/about' element={<About />} />
          <Route path='/varicocele-embolization' element={<Varicocele_embolization />} />
          <Route path='/varicose-vein' element={<VaricoseVeinPage />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/fte' element={<FTE />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/uae" element={<UAEPage />} />
          <Route path="/breast-nodule-vae" element={<BreastNoduleVAEPage />} />
          <Route path="/breast-nodule-cryoablation" element={<BreastNoduleCryoablationPage />} />
          <Route path="/pfe" element={<Planter />} />
          <Route path='/transcatheter-aortic-valve-replacement' element={<Transcatheter_aortic_valve_implantation />} />
          <Route path='/cto' element={<CTO_treatmentpage />} />
          <Route path='/rfa' element={<RFA_treatmentpage />} />
          <Route path='/endovascular-coiling' element={<Endovascular_Coiling_treatment />} />
          <Route path='/radiofrequency-ablation-for-avm' element={<RadiofrequencyAblationAVM />} />
          <Route path='/investor' element={<Become_an_investor />} />
          <Route path='/breast-nodule-rfa' element={<BreastNoduleRadiofrequencyAblation />} />
                    <Route path='/join-with-us' element={<JoinWithUs />} />
          <Route path='/testimonials' element={<Testiominal />} />
          {/* Catch-all route for 404 - must be last */}
          <Route path='*' element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
    </div>
  );
}

export default App;
