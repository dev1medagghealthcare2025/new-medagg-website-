import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const handleExploreClick = () => {
    const el = document.getElementById('ecosystem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#ecosystem';
    }
  };

  const handlePartnerClick = () => {
    const el = document.getElementById('join-with-us-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#join-with-us-section';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#F5F5F7] to-[#FCE8F0]">

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mt-6 lg:mt-0"
              >
                <span className="px-4 py-2 rounded-full text-sm" style={{ background: "#FCE8F0", color: "#E9296A" }}>
                  Medagg Healthcare – Nosurgeries Platform
                </span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl tracking-tight" style={{ color: "#2B3445" }}>
                The IR-Exclusive Ecosystem
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-xl">
                Positioning Interventional Radiology earlier within coordinated care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                style={{ background: "linear-gradient(135deg, #E9296A 0%, #C41F5A 100%)" }}
                onClick={handleExploreClick}
              >
                Explore the Ecosystem
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 flex items-center justify-center gap-2"
                style={{ borderColor: "#2B3445", color: "#2B3445" }}
                onClick={handlePartnerClick}
              >
                Partner with Us
              </motion.button>
            </div>
          </motion.div>

          {/* Right content - Highlight panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-transparent lg:bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-none lg:shadow-2xl border-0 lg:border lg:border-gray-100">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                <img
                  src="/Herosection_partner_with_us.png"
                  alt="IR Suite"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 rounded-full" style={{ background: "#FCE8F0" }}>
                  <span style={{ color: "#E9296A" }}>One Platform. One Focus.</span>
                </div>
                
                <h3 className="text-2xl" style={{ color: "#2B3445" }}>
                  Interventional Radiology
                </h3>
                
                <p className="text-gray-600">
                  A complete ecosystem dedicated to advancing minimally invasive procedures through coordinated care pathways.
                </p>
              </div>
            </div>

            {/* Decorative floating elements removed */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
