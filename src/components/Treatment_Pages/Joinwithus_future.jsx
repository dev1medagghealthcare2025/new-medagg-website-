import React from 'react';
import { motion } from "framer-motion";
import { Clock, Activity, Lightbulb, ArrowRight } from "lucide-react";

export function ProblemResponse() {
  const problems = [
    { icon: Clock, text: "Late consideration of IR" },
    { icon: Activity, text: "Underutilized hospital pathways" },
    { icon: Lightbulb, text: "Innovation outpacing adoption" }
  ];

  // Mobile-only comparison view (Updated)
  function MobileComparison() {
    return (
      <div className="block lg:hidden relative mb-8">
        <div className="w-full flex justify-center">
          <img 
            src="/new_1.png" 
            alt="Comparison Chart" 
            className="w-full h-auto max-w-lg"
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-xl font-bold tracking-wide text-[#2B3445]">PATHWAYS MATTER</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-24 px-4 lg:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="text-2xl lg:text-5xl mb-2 lg:mb-4 tracking-tight font-semibold" style={{ color: "#2B3445" }}>
          THE PROBLEM & <span style={{ color: '#E9296A' }}> THE RESPONSE</span>
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Interventional Radiology offers high clinical value, yet it is often introduced late and unevenly integrated into patient care pathways.
          </p>
        </motion.div>

        {/* Mobile swipe experience */}
        <MobileComparison />

        {/* Desktop/large layout remains unchanged */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Column Titles */}
          <div className="col-start-1 col-end-2 flex flex-col items-center">
            <span className="bg-[#FCE8F0] text-[#E9296A] font-semibold text-lg rounded-full px-8 py-2 mb-8">Current Problem</span>
          </div>
          <div className="col-start-2 col-end-3"></div>
          <div className="col-start-3 col-end-4 flex flex-col items-center">
            <span className="bg-[#C7D2C8] text-[#395A3A] font-semibold text-lg rounded-full px-8 py-2 mb-8">Medagg Solution</span>
          </div>

          {/* Paired Items */}
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            // Problem/solution card border color
            const borderColor = index === 1 ? '#2B3445' : '#E9296A';
            // Solution title color
            const solTitleColor = index === 1 ? '#2B3445' : '#E9296A';
            return (
              <React.Fragment key={index}>
                {/* Left - Problem Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm h-full border-l-4"
                  style={{ borderColor }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#FCE8F0]"
                  >
                    <Icon className="w-7 h-7" style={{ color: '#E9296A' }} />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
  {index === 0 && (<><span className="font-bold">Patients don’t reach IR early,</span> IR is often considered only after surgery is advised.</>)}
  {index === 1 && (<><span className="font-bold">Hospitals underutilise IR</span>, IR services exist, but lack structured referral pathways and visibility.</>)}
  {index === 2 && (<><span className="font-bold">Innovation outpaces adoption,</span> IR advances faster than real-world systems can deploy it.</>)}
</span>
                </motion.div>

                {/* Center - Arrow */}
                <div className="hidden lg:flex items-center justify-center h-full">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                  >
                    <ArrowRight className="w-10 h-10" style={{ color: '#E9296A' }} />
                  </motion.div>
                </div>

                {/* Right - Solution Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full border-l-4"
                  style={{ borderColor }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: solTitleColor }}>
                    {index === 0 && <span>Early Reach:</span>}
                    {index === 1 && <span>Structured Flow:</span>}
                    {index === 2 && <span>Consistent Execution:</span>}
                  </h3>
                  <span className="text-gray-700 text-base font-normal">
                    {index === 0 && 'IR enters the care journey before conventional surgical pathways are initiated.'}
                    {index === 1 && 'Referrals, case movement, and hospital integration — without friction.'}
                    {index === 2 && 'IR-led pathways delivered reliably at scale.'}
                  </span>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
        {/* Pathways Matter Footer */}
        <div className="hidden lg:block text-center mt-12">
          <span className="text-2xl font-bold tracking-wide text-[#2B3445]">PATHWAYS MATTER.</span>
        </div>
      </div>
    </section>
  );
}

export default ProblemResponse;
