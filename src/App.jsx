import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import { initGA, trackPageView } from './lib/analytics';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Chatbot from './components/internal_components/chatbot';
import BackToTop from './components/BackToTop';
import CallFab from './components/common/CallFab';
import FloatingWhatsApp from './components/internal_components/FloatingWhatsApp';
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
import UAEPage from './pages/UAE';
import CareerPage from './pages/career';
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
import PolicyPage from './pages/policy';
import TermsConditionPage from './pages/terms_condition';
import DiabeticFootPage from './pages/Diabetic _Foot';
import FrozenShoulderPage from './pages/frozen_shoulder';
import Hemorrhoidal from './pages/Hemorrhoidal';
import Cursor from './components/ui/Cursor';
import ImageCursorStyle from './components/ui/ImageCursorStyle';
import { UI_ENHANCEMENTS_ENABLED, IMAGE_CURSOR_ENABLED } from './config/uiEnhancements';
import ButtonInteractions from './components/ui/ButtonInteractions';

function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    try {
      trackPageView(location.pathname, location.search);
    } catch {}
  }, [location.pathname, location.hash, location.search]);
  return null;
}

function CanonicalUrlUpdater() {
  const location = useLocation();
  React.useEffect(() => {
    try {
      const { origin } = window.location;
      let canonicalPath = location.pathname;

      const aliasToCanonical = {
        '/pae': '/prostate-artery-embolization-pae',
        '/gae': '/genicular-artery-embolization-gae',
        '/thyroid': '/thyroid-nodule-ablation',
        '/fte': '/fallopian-tube-recanalization-ftr',
        '/uae': '/uterine-artery-embolization-uae',
        '/pfe': '/plantar-fascial-embolization',
        '/privacy-policy': '/policy',
      };

      if (aliasToCanonical[canonicalPath]) {
        canonicalPath = aliasToCanonical[canonicalPath];
      }

      if (canonicalPath.length > 1 && canonicalPath.endsWith('/')) {
        canonicalPath = canonicalPath.slice(0, -1);
      }

      const canonicalUrl = `${origin}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    } catch {}
  }, [location.pathname]);
  return null;
}
function App() {
  // Initialize Google Analytics 4 once
  React.useEffect(() => {
    try {
      const gaId = import.meta.env && import.meta.env.VITE_GA_ID;
      if (gaId) initGA(gaId);
    } catch {}
  }, []);
  return (
    <div className='min-h-screen bg-pink-50 flex flex-col isolate'>
      <main className='flex-grow'>
        <ScrollToTop />
        <CanonicalUrlUpdater />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prostate-artery-embolization-pae' element={<PAE_Treatmentpage />} />
          <Route path='/pae' element={<Navigate to='/prostate-artery-embolization-pae' replace />} />
          <Route path='/genicular-artery-embolization-gae' element={<GAE_Treatmentpage />} />
          <Route path='/gae' element={<Navigate to='/genicular-artery-embolization-gae' replace />} />
          <Route path='/thyroid-nodule-ablation' element={<Thyroid_Nodule_Ablation_Treatmentpage />} />
          <Route path='/thyroid' element={<Navigate to='/thyroid-nodule-ablation' replace />} />
          <Route path='/about' element={<About />} />
          <Route path='/varicocele-embolization' element={<Varicocele_embolization />} />
          <Route path='/varicose-vein' element={<VaricoseVeinPage />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/fallopian-tube-recanalization-ftr' element={<FTE />} />
          <Route path='/fte' element={<Navigate to='/fallopian-tube-recanalization-ftr' replace />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/career' element={<CareerPage />} />
          <Route path='/contact-us' element={<ContactUsPage />} />
          {/* Alias routes for legacy/CTA links */}
          <Route path='/book-an-appointment' element={<ContactUsPage />} />
          <Route path='/book-appointment' element={<ContactUsPage />} />
          <Route path='/uterine-artery-embolization-uae' element={<UAEPage />} />
          <Route path='/uae' element={<Navigate to='/uterine-artery-embolization-uae' replace />} />
          <Route path='/breast-nodule-vae' element={<BreastNoduleVAEPage />} />
          <Route path='/breast-nodule-cryoablation' element={<BreastNoduleCryoablationPage />} />
          <Route path='/plantar-fascial-embolization' element={<Planter />} />
          <Route path='/pfe' element={<Navigate to='/plantar-fascial-embolization' replace />} />
          <Route path='/transcatheter-aortic-valve-replacement' element={<Transcatheter_aortic_valve_implantation />} />
          <Route path='/cto' element={<CTO_treatmentpage />} />
          <Route path='/rfa' element={<RFA_treatmentpage />} />
          <Route path='/endovascular-coiling' element={<Endovascular_Coiling_treatment />} />
          <Route path='/radiofrequency-ablation-for-avm' element={<RadiofrequencyAblationAVM />} />
          <Route path='/investor' element={<Become_an_investor />} />
          <Route path='/breast-nodule-rfa' element={<BreastNoduleRadiofrequencyAblation />} />
          <Route path='/join-with-us' element={<JoinWithUs />} />
          <Route path='/testimonials' element={<Testiominal />} />
          <Route path='/diabetic-foot' element={<DiabeticFootPage />} />
          <Route path='/frozen-shoulder' element={<FrozenShoulderPage />} />
          <Route path='/hemorrhoidal' element={<Hemorrhoidal />} />
          {/* Policy page routes */}
          <Route path='/policy' element={<PolicyPage />} />
          <Route path='/privacy-policy' element={<PolicyPage />} />
          {/* Terms & Conditions route */}
          <Route path='/terms' element={<TermsConditionPage />} />
          {/* Catch-all route for 404 - must be last */}
          <Route path='*' element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
      <CallFab position='right' phone='+919363656010' />
      <FloatingWhatsApp phone='+918925928840' position='left' />
      {IMAGE_CURSOR_ENABLED && <ImageCursorStyle />}
      <ButtonInteractions />
      {UI_ENHANCEMENTS_ENABLED && (
        <>
          <Cursor />
          <style>{`@media (pointer: fine) { body { cursor: none; } a,button,[role="button"], input, textarea, select { cursor: none; } }`}</style>
        </>
      )}
    </div>
  );
}

export default App;
