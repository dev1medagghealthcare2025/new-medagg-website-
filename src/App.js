import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Chatbot from './components/internal_components/chatbot';
import PAE_Treatmentpage from './pages/PAE_Treatmentpage';
import GAE_Treatmentpage from './pages/GAE_Treatmentpage';
import Thyroid_Nodule_Ablation_Treatmentpage from './pages/Thyroid_Nodule_Ablation_Treatmentpage';
import About from './pages/About';

function App() {
  return (
    <div className='min-h-screen bg-pink-50 flex flex-col'>
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prostate-artery-embolization-pae' element={<PAE_Treatmentpage />} />
          <Route path='/pae' element={<Navigate to='/prostate-artery-embolization-pae' replace />} />
          <Route path='/genicular-artery-embolization-gae' element={<GAE_Treatmentpage />} />
          <Route path='/gae' element={<Navigate to='/genicular-artery-embolization-gae' replace />} />
          <Route path='/thyroid-nodule-ablation' element={<Thyroid_Nodule_Ablation_Treatmentpage />} />
          <Route path='/thyroid' element={<Navigate to='/thyroid-nodule-ablation' replace />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
