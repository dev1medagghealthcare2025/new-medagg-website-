import React from "react";

export default function JoinWithUsIra() {
  return (
    <div>
      {/* existing content */}
      <TimingChangesSection />
    </div>
  );
}

function TimingChangesSection() {
  return (
    <section className="py-8 md:py-12 px-4 md:px-8 lg:px-24 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-[#2B2545] text-left">
          Bringing <span className="text-[#E9296A]">Interventional Radiology</span> earlier within<br className="hidden md:inline" /> coordinated care.
        </h2>
        <p className="text-gray-700 text-lg md:text-xl text-left w-full mb-3">
        Interventional Radiology delivers its greatest impact when supported by a connected ecosystem—not isolated decisions.
        </p>
        <p className="text-gray-700 text-base md:text-lg text-left w-full mb-8">
        When clinical intent, care delivery, and procedural enablement align early in the care journey, non-surgical pathways gain clarity, continuity, and direction.
        </p>
        {/* Main Illustration */}
        <div className="mb-4">
          <img src="/timing_Changes.png" alt="Timing changes everything" className="block mx-auto md:mx-0 md:ml-12 lg:ml-24 w-full h-auto max-w-[95%] sm:max-w-[650px] md:max-w-[900px] rounded-xl shadow-none" />
        </div>
      </div>
    </section>
  );
}