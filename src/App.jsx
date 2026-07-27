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
import PAE_Treatmentpage_chennai from './pages/PAE_Treatmentpage_chennai';
import PAE_Treatmentpage_madurai from './pages/PAE_Treatmentpage_madurai';
import PAE_Treatmentpage_coimbatore from './pages/PAE_Treatmentpage_coimbatore';
import PAE_Treatmentpage_bangalore from './pages/PAE_Treatmentpage_bangalore';
import PAE_Treatmentpage_mangalore from './pages/PAE_Treatmentpage_mangalore';
import PAE_Treatmentpage_delhi from './pages/PAE_Treatmentpage_delhi';
import GAE_Treatmentpage from './pages/GAE_Treatmentpage';
import GAE_Treatmentpage_chennai from './pages/GAE_Treatmentpage_chennai';
import GAE_Treatmentpage_madurai from './pages/GAE_Treatmentpage_madurai';
import GAE_Treatmentpage_coimbatore from './pages/GAE_Treatmentpage_coimbatore';
import GAE_Treatmentpage_bangalore from './pages/GAE_Treatmentpage_bangalore';
import GAE_Treatmentpage_mangalore from './pages/GAE_Treatmentpage_mangalore';
import GAE_Treatmentpage_delhi from './pages/GAE_Treatmentpage_delhi';
import Thyroid_Nodule_Ablation_Treatmentpage from './pages/Thyroid_Nodule_Ablation_Treatmentpage';
import Thyroid_Nodule_Ablation_Treatmentpage_chennai from './pages/Thyroid_Nodule_Ablation_Treatmentpage_chennai';
import Thyroid_Nodule_Ablation_Treatmentpage_madurai from './pages/Thyroid_Nodule_Ablation_Treatmentpage_madurai';
import Thyroid_Nodule_Ablation_Treatmentpage_coimbatore from './pages/Thyroid_Nodule_Ablation_Treatmentpage_coimbatore';
import Thyroid_Nodule_Ablation_Treatmentpage_bangalore from './pages/Thyroid_Nodule_Ablation_Treatmentpage_bangalore';
import Thyroid_Nodule_Ablation_Treatmentpage_mangalore from './pages/Thyroid_Nodule_Ablation_Treatmentpage_mangalore';
import Thyroid_Nodule_Ablation_Treatmentpage_delhi from './pages/Thyroid_Nodule_Ablation_Treatmentpage_delhi';
import About from './pages/About';
import Varicocele_embolization from './pages/Varicocele_embolization';
import Varicocele_embolization_chennai from './pages/Varicocele_embolization_chennai';
import Varicocele_embolization_madurai from './pages/Varicocele_embolization_madurai';
import Varicocele_embolization_coimbatore from './pages/Varicocele_embolization_coimbatore';
import Varicocele_embolization_bangalore from './pages/Varicocele_embolization_bangalore';
import Varicocele_embolization_mangalore from './pages/Varicocele_embolization_mangalore';
import Varicocele_embolization_delhi from './pages/Varicocele_embolization_delhi';
import VaricoseVeinPage from './pages/varicosevein';
import VaricoseVeinChennai from './pages/varicose_vein_chennai';
import VaricoseVeinMadurai from './pages/varicose_vein_madurai';
import VaricoseVeinCoimbatore from './pages/varicose_vein_coimbatore';
import VaricoseVeinBangalore from './pages/varicose_vein_bangalore';
import VaricoseVeinMangalore from './pages/varicose_vein_mangalore';
import VaricoseVeinDelhi from './pages/varicose_vein_delhi';
import Blog from './pages/Blog';
import BlogPost from './components/blog/BlogPost';
import FTE from './pages/FTE';
import FTE_chennai from './pages/FTE_chennai';
import FTE_madurai from './pages/FTE_madurai';
import FTE_coimbatore from './pages/FTE_coimbatore';
import FTE_bangalore from './pages/FTE_bangalore';
import FTE_mangalore from './pages/FTE_mangalore';
import FTE_delhi from './pages/FTE_delhi';
import ContactUsPage from './pages/contact_us_page';
import UAEPage from './pages/UAE';
import UAE_chennai from './pages/UAE_chennai';
import UAE_madurai from './pages/UAE_madurai';
import UAE_coimbatore from './pages/UAE_coimbatore';
import UAE_bangalore from './pages/UAE_bangalore';
import UAE_mangalore from './pages/UAE_mangalore';
import UAE_delhi from './pages/UAE_delhi';
import CareerPage from './pages/career';
import BreastNoduleVAEPage from './pages/Breast_Nodule_VAE';
import BreastNoduleVAEChennai from './pages/Breast_Nodule_VAE_chennai';
import BreastNoduleVAEMadurai from './pages/Breast_Nodule_VAE_madurai';
import BreastNoduleVAECoimbatore from './pages/Breast_Nodule_VAE_coimbatore';
import BreastNoduleVAEBangalore from './pages/Breast_Nodule_VAE_bangalore';
import BreastNoduleVAEMangalore from './pages/Breast_Nodule_VAE_mangalore';
import BreastNoduleVAEDelhi from './pages/Breast_Nodule_VAE_delhi';
import BreastNoduleCryoablationPage from './pages/Breast_nodule_cryoablation';
import Planter from './pages/Planter';
import Planter_chennai from './pages/Planter_chennai';
import Planter_madurai from './pages/Planter_madurai';
import Planter_coimbatore from './pages/Planter_coimbatore';
import Planter_bangalore from './pages/Planter_bangalore';
import Planter_mangalore from './pages/Planter_mangalore';
import Planter_delhi from './pages/Planter_delhi';
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
import DiabeticFootChennai from './pages/Diabetic_Foot_chennai';
import DiabeticFootMadurai from './pages/Diabetic_Foot_madurai';
import DiabeticFootCoimbatore from './pages/Diabetic_Foot_coimbatore';
import DiabeticFootBangalore from './pages/Diabetic_Foot_bangalore';
import DiabeticFootMangalore from './pages/Diabetic_Foot_mangalore';
import FrozenShoulderPage from './pages/frozen_shoulder';
import FrozenShoulderChennai from './pages/frozen_shoulder_chennai';
import FrozenShoulderMadurai from './pages/frozen_shoulder_madurai';
import FrozenShoulderCoimbatore from './pages/frozen_shoulder_coimbatore';
import FrozenShoulderBangalore from './pages/frozen_shoulder_bangalore';
import FrozenShoulderMangalore from './pages/frozen_shoulder_mangalore';
import Hemorrhoidal from './pages/Hemorrhoidal';
import Y90_TAREPage from './pages/Y90_TARE';
import NuclearMedicinePage from './pages/Nuclear-medicine';
import Transarterial_Chemoembolization from './pages/Transarterial_Chemoembolization';
import Cursor from './components/ui/Cursor';
import ImageCursorStyle from './components/ui/ImageCursorStyle';
import { UI_ENHANCEMENTS_ENABLED, IMAGE_CURSOR_ENABLED } from './config/uiEnhancements';
import ButtonInteractions from './components/ui/ButtonInteractions';
import ThankYouModalHost from './components/common/ThankYouModalHost';
import TelecrmOtpGateHost from './components/common/TelecrmOtpGateHost';
import { TelecrmOtpGateProvider } from './lib/telecrmOtpGate';
import TaviChennai from './pages/tavi_chennai';
import TaviMadurai from './pages/tavi_madurai';
import TaviCoimbatore from './pages/tavi_coimbatore';
import TaviBangalore from './pages/tavi_bangalore';
import TaviMangalore from './pages/tavi_mangalore';
import CTOChennai from './pages/cto_chennai';
import CTOMadurai from './pages/cto_madurai';
import CTOCoimbatore from './pages/cto_coimbatore';
import CTOBangalore from './pages/cto_bangalore';
import CTOMangalore from './pages/cto_mangalore';
import PilesChennai from './pages/piles_chennai';
import PilesMadurai from './pages/piles_madurai';
import PilesCoimbatore from './pages/piles_coimbatore';
import Y90Chennai from './pages/y90_chennai';
import Y90Madurai from './pages/y90_madurai';
import Y90Coimbatore from './pages/y90_coimbatore';
import Y90Bangalore from './pages/y90_bangalore';
import Y90Mangalore from './pages/y90_mangalore';
import TACEChennai from './pages/tace_chennai';
import TACEMadurai from './pages/tace_madurai';
import TACECoimbatore from './pages/tace_coimbatore';
import EndovascularCoilingChennai from './pages/endovascular_coiling_chennai';
import EndovascularCoilingMadurai from './pages/endovascular_coiling_madurai';
import EndovascularCoilingCoimbatore from './pages/endovascular_coiling_coimbatore';
import EndovascularCoilingBangalore from './pages/endovascular_coiling_bangalore';
import EndovascularCoilingMangalore from './pages/endovascular_coiling_mangalore';
import PVCPage from './pages/pvc';
import PVCChennai from './pages/pvc_chennai';
import PVCMadurai from './pages/pvc_madurai';
import PVCCoimbatore from './pages/pvc_coimbatore';
import PVCBangalore from './pages/pvc_bangalore';
import PVCMangalore from './pages/pvc_mangalore';

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
        '/hemorrhoidal': '/piles-hemorrhoids',
        '/privacy-policy': '/policy',
        '/pvc': '/pelvic-vein-embolization',
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

function Irpreneur2025Page() {
  React.useEffect(() => {
    const { pathname, search, hash } = window.location;
    if (pathname === '/irpreneur2025') {
      window.location.replace(`/irpreneur2025/${search || ''}${hash || ''}`);
    }
  }, []);

  return (
    <div className='w-full' style={{ height: '100vh' }}>
      <iframe
        src='/irpreneur2025/'
        title='IRpreneur 2025'
        style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      />
    </div>
  );
}
function App() {
  // Initialize Google Analytics 4 once
  React.useEffect(() => {
    try {
      const gaId = import.meta.env && import.meta.env.VITE_GA_ID;
      if (gaId) initGA(gaId);
    } catch {}
  }, []);
  const location = useLocation();
  const isIrpreneur2025 = (location.pathname || '').startsWith('/irpreneur2025');
  return (
    <TelecrmOtpGateProvider>
    <div className='min-h-screen bg-pink-50 flex flex-col isolate'>
      <main className='flex-grow'>
        <ScrollToTop />
        <CanonicalUrlUpdater />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/thank-you' element={<Home />} />
          <Route path='/irpreneur2025/*' element={<Irpreneur2025Page />} />
          <Route path='/prostate-artery-embolization-pae' element={<PAE_Treatmentpage />} />
          <Route path='/prostate-artery-embolization-pae-chennai' element={<PAE_Treatmentpage_chennai />} />
          <Route path='/prostate-artery-embolization-pae-madurai' element={<PAE_Treatmentpage_madurai />} />
          <Route path='/prostate-artery-embolization-pae-coimbatore' element={<PAE_Treatmentpage_coimbatore />} />
          <Route path='/prostate-artery-embolization-pae-bangalore' element={<PAE_Treatmentpage_bangalore />} />
          <Route path='/prostate-artery-embolization-pae-mangalore' element={<PAE_Treatmentpage_mangalore />} />
          <Route path='/prostate-artery-embolization-pae-delhi' element={<PAE_Treatmentpage_delhi />} />
          <Route path='/pae' element={<Navigate to='/prostate-artery-embolization-pae' replace />} />
          <Route path='/genicular-artery-embolization-gae' element={<GAE_Treatmentpage />} />
          <Route path='/genicular-artery-embolization-gae-chennai' element={<GAE_Treatmentpage_chennai />} />
          <Route path='/genicular-artery-embolization-gae-madurai' element={<GAE_Treatmentpage_madurai />} />
          <Route path='/genicular-artery-embolization-gae-coimbatore' element={<GAE_Treatmentpage_coimbatore />} />
          <Route path='/genicular-artery-embolization-gae-bangalore' element={<GAE_Treatmentpage_bangalore />} />
          <Route path='/genicular-artery-embolization-gae-mangalore' element={<GAE_Treatmentpage_mangalore />} />
          <Route path='/genicular-artery-embolization-gae-delhi' element={<GAE_Treatmentpage_delhi />} />
          <Route path='/gae' element={<Navigate to='/genicular-artery-embolization-gae' replace />} />
          <Route path='/thyroid-nodule-ablation' element={<Thyroid_Nodule_Ablation_Treatmentpage />} />
          <Route path='/thyroid-nodule-ablation-chennai' element={<Thyroid_Nodule_Ablation_Treatmentpage_chennai />} />
          <Route path='/thyroid-nodule-ablation-madurai' element={<Thyroid_Nodule_Ablation_Treatmentpage_madurai />} />
          <Route path='/thyroid-nodule-ablation-coimbatore' element={<Thyroid_Nodule_Ablation_Treatmentpage_coimbatore />} />
          <Route path='/thyroid-nodule-ablation-bangalore' element={<Thyroid_Nodule_Ablation_Treatmentpage_bangalore />} />
          <Route path='/thyroid-nodule-ablation-mangalore' element={<Thyroid_Nodule_Ablation_Treatmentpage_mangalore />} />
          <Route path='/thyroid-nodule-ablation-delhi' element={<Thyroid_Nodule_Ablation_Treatmentpage_delhi />} />
          <Route path='/thyroid' element={<Navigate to='/thyroid-nodule-ablation' replace />} />
          <Route path='/about' element={<About />} />
          <Route path='/varicocele-embolization' element={<Varicocele_embolization />} />
          <Route path='/varicocele-embolization-chennai' element={<Varicocele_embolization_chennai />} />
          <Route path='/varicocele-embolization-madurai' element={<Varicocele_embolization_madurai />} />
          <Route path='/varicocele-embolization-coimbatore' element={<Varicocele_embolization_coimbatore />} />
          <Route path='/varicocele-embolization-bangalore' element={<Varicocele_embolization_bangalore />} />
          <Route path='/varicocele-embolization-mangalore' element={<Varicocele_embolization_mangalore />} />
          <Route path='/varicocele-embolization-delhi' element={<Varicocele_embolization_delhi />} />
          <Route path='/varicose-vein' element={<VaricoseVeinPage />} />
          <Route path='/varicose-vein-chennai' element={<VaricoseVeinChennai />} />
          <Route path='/varicose-vein-madurai' element={<VaricoseVeinMadurai />} />
          <Route path='/varicose-vein-coimbatore' element={<VaricoseVeinCoimbatore />} />
          <Route path='/varicose-vein-bangalore' element={<VaricoseVeinBangalore />} />
          <Route path='/varicose-vein-mangalore' element={<VaricoseVeinMangalore />} />
          <Route path='/varicose-vein-delhi' element={<VaricoseVeinDelhi />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/fallopian-tube-recanalization-ftr' element={<FTE />} />
          <Route path='/fallopian-tube-recanalization-ftr-chennai' element={<FTE_chennai />} />
          <Route path='/fallopian-tube-recanalization-ftr-madurai' element={<FTE_madurai />} />
          <Route path='/fallopian-tube-recanalization-ftr-coimbatore' element={<FTE_coimbatore />} />
          <Route path='/fallopian-tube-recanalization-ftr-bangalore' element={<FTE_bangalore />} />
          <Route path='/fallopian-tube-recanalization-ftr-mangalore' element={<FTE_mangalore />} />
          <Route path='/fallopian-tube-recanalization-ftr-delhi' element={<FTE_delhi />} />
          <Route path='/fte' element={<Navigate to='/fallopian-tube-recanalization-ftr' replace />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/career' element={<CareerPage />} />
          <Route path='/contact-us' element={<ContactUsPage />} />
          {/* Alias routes for legacy/CTA links */}
          <Route path='/book-an-appointment' element={<ContactUsPage />} />
          <Route path='/book-appointment' element={<ContactUsPage />} />
          <Route path='/uterine-artery-embolization-uae' element={<UAEPage />} />
          <Route path='/uterine-artery-embolization-uae-chennai' element={<UAE_chennai />} />
          <Route path='/uterine-artery-embolization-uae-madurai' element={<UAE_madurai />} />
          <Route path='/uterine-artery-embolization-uae-coimbatore' element={<UAE_coimbatore />} />
          <Route path='/uterine-artery-embolization-uae-bangalore' element={<UAE_bangalore />} />
          <Route path='/uterine-artery-embolization-uae-mangalore' element={<UAE_mangalore />} />
          <Route path='/uterine-artery-embolization-uae-delhi' element={<UAE_delhi />} />
          <Route path='/uae' element={<Navigate to='/uterine-artery-embolization-uae' replace />} />
          <Route path='/breast-nodule-vae' element={<BreastNoduleVAEPage />} />
          <Route path='/breast-nodule-vae-chennai' element={<BreastNoduleVAEChennai />} />
          <Route path='/breast-nodule-vae-madurai' element={<BreastNoduleVAEMadurai />} />
          <Route path='/breast-nodule-vae-coimbatore' element={<BreastNoduleVAECoimbatore />} />
          <Route path='/breast-nodule-vae-bangalore' element={<BreastNoduleVAEBangalore />} />
          <Route path='/breast-nodule-vae-mangalore' element={<BreastNoduleVAEMangalore />} />
          <Route path='/breast-nodule-vae-delhi' element={<BreastNoduleVAEDelhi />} />
          <Route path='/breast-nodule-cryoablation' element={<BreastNoduleCryoablationPage />} />
          <Route path='/plantar-fascial-embolization' element={<Planter />} />
          <Route path='/plantar-fascial-embolization-chennai' element={<Planter_chennai />} />
          <Route path='/plantar-fascial-embolization-madurai' element={<Planter_madurai />} />
          <Route path='/plantar-fascial-embolization-coimbatore' element={<Planter_coimbatore />} />
          <Route path='/plantar-fascial-embolization-bangalore' element={<Planter_bangalore />} />
          <Route path='/plantar-fascial-embolization-mangalore' element={<Planter_mangalore />} />
          <Route path='/plantar-fascial-embolization-delhi' element={<Planter_delhi />} />
          <Route path='/pfe' element={<Navigate to='/plantar-fascial-embolization' replace />} />
          <Route path='/transcatheter-aortic-valve-replacement' element={<Transcatheter_aortic_valve_implantation />} />
          <Route path='/transcatheter-aortic-valve-replacement-chennai' element={<TaviChennai />} />
          <Route path='/transcatheter-aortic-valve-replacement-madurai' element={<TaviMadurai />} />
          <Route path='/transcatheter-aortic-valve-replacement-coimbatore' element={<TaviCoimbatore />} />
          <Route path='/transcatheter-aortic-valve-replacement-bangalore' element={<TaviBangalore />} />
          <Route path='/transcatheter-aortic-valve-replacement-mangalore' element={<TaviMangalore />} />
          <Route path='/cto' element={<CTO_treatmentpage />} />
          <Route path='/cto-chennai' element={<CTOChennai />} />
          <Route path='/cto-madurai' element={<CTOMadurai />} />
          <Route path='/cto-coimbatore' element={<CTOCoimbatore />} />
          <Route path='/cto-bangalore' element={<CTOBangalore />} />
          <Route path='/cto-mangalore' element={<CTOMangalore />} />
          <Route path='/rfa' element={<RFA_treatmentpage />} />
          <Route path='/endovascular-coiling' element={<Endovascular_Coiling_treatment />} />
          <Route path='/endovascular-coiling-chennai' element={<EndovascularCoilingChennai />} />
          <Route path='/endovascular-coiling-madurai' element={<EndovascularCoilingMadurai />} />
          <Route path='/endovascular-coiling-coimbatore' element={<EndovascularCoilingCoimbatore />} />
          <Route path='/endovascular-coiling-bangalore' element={<EndovascularCoilingBangalore />} />
          <Route path='/endovascular-coiling-mangalore' element={<EndovascularCoilingMangalore />} />
          <Route path='/radiofrequency-ablation-for-avm' element={<RadiofrequencyAblationAVM />} />
          <Route path='/investor' element={<Become_an_investor />} />
          <Route path='/breast-nodule-rfa' element={<BreastNoduleRadiofrequencyAblation />} />
          <Route path='/join-with-us' element={<JoinWithUs />} />
          <Route path='/testimonials' element={<Testiominal />} />
          <Route path='/diabetic-foot' element={<DiabeticFootPage />} />
          <Route path='/diabetic-foot-chennai' element={<DiabeticFootChennai />} />
          <Route path='/diabetic-foot-madurai' element={<DiabeticFootMadurai />} />
          <Route path='/diabetic-foot-coimbatore' element={<DiabeticFootCoimbatore />} />
          <Route path='/diabetic-foot-bangalore' element={<DiabeticFootBangalore />} />
          <Route path='/diabetic-foot-mangalore' element={<DiabeticFootMangalore />} />
          <Route path='/frozen-shoulder' element={<FrozenShoulderPage />} />
          <Route path='/frozen-shoulder-chennai' element={<FrozenShoulderChennai />} />
          <Route path='/frozen-shoulder-madurai' element={<FrozenShoulderMadurai />} />
          <Route path='/frozen-shoulder-coimbatore' element={<FrozenShoulderCoimbatore />} />
          <Route path='/frozen-shoulder-bangalore' element={<FrozenShoulderBangalore />} />
          <Route path='/frozen-shoulder-mangalore' element={<FrozenShoulderMangalore />} />
          <Route path='/nuclear-medicine' element={<NuclearMedicinePage />} />
          <Route path='/y90-radioembolization-tare' element={<Y90_TAREPage />} />
          <Route path='/y90-radioembolization-tare-chennai' element={<Y90Chennai />} />
          <Route path='/y90-radioembolization-tare-madurai' element={<Y90Madurai />} />
          <Route path='/y90-radioembolization-tare-coimbatore' element={<Y90Coimbatore />} />
          <Route path='/y90-radioembolization-tare-bangalore' element={<Y90Bangalore />} />
          <Route path='/y90-radioembolization-tare-mangalore' element={<Y90Mangalore />} />
          <Route path='/transarterial-chemoembolization-tace' element={<Transarterial_Chemoembolization />} />
          <Route path='/transarterial-chemoembolization-tace-chennai' element={<TACEChennai />} />
          <Route path='/transarterial-chemoembolization-tace-madurai' element={<TACEMadurai />} />
          <Route path='/transarterial-chemoembolization-tace-coimbatore' element={<TACECoimbatore />} />
          <Route path='/piles-hemorrhoids' element={<Hemorrhoidal />} />
          <Route path='/piles-hemorrhoids-chennai' element={<PilesChennai />} />
          <Route path='/piles-hemorrhoids-madurai' element={<PilesMadurai />} />
          <Route path='/piles-hemorrhoids-coimbatore' element={<PilesCoimbatore />} />
          <Route path='/hemorrhoidal' element={<Navigate to='/piles-hemorrhoids' replace />} />
          <Route path='/pelvic-vein-embolization' element={<PVCPage />} />
          <Route path='/pelvic-vein-embolization-chennai' element={<PVCChennai />} />
          <Route path='/pelvic-vein-embolization-madurai' element={<PVCMadurai />} />
          <Route path='/pelvic-vein-embolization-coimbatore' element={<PVCCoimbatore />} />
          <Route path='/pelvic-vein-embolization-bangalore' element={<PVCBangalore />} />
          <Route path='/pelvic-vein-embolization-mangalore' element={<PVCMangalore />} />
          <Route path='/pvc' element={<Navigate to='/pelvic-vein-embolization' replace />} />
          {/* Policy page routes */}
          <Route path='/policy' element={<PolicyPage />} />
          <Route path='/privacy-policy' element={<PolicyPage />} />
          {/* Terms & Conditions route */}
          <Route path='/terms' element={<TermsConditionPage />} />
          {/* Catch-all route for 404 - must be last */}
          <Route path='*' element={<Home />} />
          </Routes>
        </main>
        {!isIrpreneur2025 && (
          <>
            <Footer />
            <Chatbot />
            <ThankYouModalHost />
            <TelecrmOtpGateHost />
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
          </>
        )}
      </div>
    </TelecrmOtpGateProvider>
  );
}

export default App;
