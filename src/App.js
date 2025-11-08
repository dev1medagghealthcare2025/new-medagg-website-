import { Routes, Route } from 'react-router-dom';
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
          <Route path='/pae' element={<PAE_Treatmentpage />} />
          <Route path='/gae' element={<GAE_Treatmentpage />} />
          <Route path='/thyroid' element={<Thyroid_Nodule_Ablation_Treatmentpage />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
