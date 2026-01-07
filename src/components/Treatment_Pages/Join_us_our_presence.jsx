import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function GeographicPresence() {
  const regions = [
    { name: "Tamil Nadu", position: { top: "72%", left: "58%" } },
    { name: "Karnataka", position: { top: "65%", left: "48%" } },
    { name: "Telangana", position: { top: "58%", left: "52%" } },
    { name: "Gujarat", position: { top: "42%", left: "38%" } },
    { name: "Maharashtra", position: { top: "52%", left: "45%" } },
    { name: "Kerala", position: { top: "78%", left: "50%" } },
    { name: "West Bengal", position: { top: "38%", left: "68%" } }
  ];

  return (
    <section className="py-10 md:py-16 px-4 md:px-8 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-[#2B3445] text-left leading-tight">From Isolated <span className="text-[#E9296A]">Excellence</span> to Shared Momentum</h2>
        <p className="text-base md:text-lg text-gray-700 mb-3 text-left w-full">
          Our ecosystem is actively expanding across key healthcare hubs in India, connecting interventional radiologists, hospitals, and industry partners through a coordinated national network.
        </p>
        <p className="text-base md:text-lg text-gray-700 mb-8 text-left w-full">
          Each region contributes and benefits from shared knowledge, standardized pathways, and collaborative innovation—turning regional excellence into scalable, national impact.
        </p>
        {/* Map Image */}
        <div className="mb-4 -mx-4 md:mx-auto px-0 md:px-2 overflow-hidden md:overflow-x-auto">
          <img
            src="/medagg_presence.png"
            alt="Medagg Ecosystem Presence"
            className="block w-full max-w-full h-auto rounded-xl shadow-none md:min-w-0 md:w-full md:mx-auto"
          />
        </div>
        {/* Footer heading */}
        <div className="mt-8 text-center">
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
  <span className="relative align-bottom inline-block mr-2">
    <span className="text-[#E9296A] font-extrabold">Active Ecosystem</span>
    <span className="absolute left-0 -bottom-2 h-1 border-b-4 border-[#2B3445] w-20 sm:w-24 md:w-32"></span>
  </span>
  <span className="text-[#2B3445] font-extrabold">Presence</span>
</span>
        </div>
      </div>
    </section>
  );
}
