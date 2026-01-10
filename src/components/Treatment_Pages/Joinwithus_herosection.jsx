import { motion } from "framer-motion";
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
    <section className="w-full flex items-start justify-center bg-white md:min-h-[400px] md:items-center">
      <img
        src="/Join_herosection_mobile.png"
        alt="Join Us Hero"
        className="w-full h-auto object-contain md:hidden rounded-none"
        style={{ background: 'white' }}
      />
      <img
        src="/Joinus_hero_new.png"
        alt="Join Us Hero"
        className="hidden w-full h-auto object-contain max-h-[400px] md:max-h-[460px] lg:max-h-[500px] rounded-3xl md:block"
        style={{ background: 'white' }}
      />
    </section>
  );
}

export default HeroSection;
