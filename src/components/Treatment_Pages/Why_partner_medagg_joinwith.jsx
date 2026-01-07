import { motion } from "framer-motion";
import { Stethoscope, Building2, Package, Heart } from "lucide-react";

// Helper component for the connecting lines with arrows
function ConnectingLine({ direction }) {
  const path = {
    up: "M 50 100 L 50 0",
    down: "M 50 0 L 50 100",
    left: "M 100 50 L 0 50",
    right: "M 0 50 L 100 50",
  }[direction];

  const arrow = {
    up: "M 45 5 L 50 0 L 55 5",
    down: "M 45 95 L 50 100 L 55 95",
    left: "M 5 45 L 0 50 L 5 55",
    right: "M 95 45 L 100 50 L 95 55",
  }[direction];

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute"
    >
      <motion.path
        d={path}
        stroke="#E9296A"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={arrow}
        fill="#E9296A"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
    </motion.svg>
  );
}

// Helper component for each role card
function RoleCard({ role, delay = 0 }) {
  const Icon = role.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="relative w-full max-w-[150px] lg:max-w-xs z-10"
    >
      <div 
        className="bg-white rounded-2xl lg:rounded-3xl p-3 lg:p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full"
        style={{ border: `2px solid ${role.color}20` }}
      >
        <div 
          className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl grid place-items-center shrink-0 mb-3 lg:mb-4 mx-auto"
          style={{ background: `#FCE8F0` }}
        >
          {role.image ? (
            <img src={role.image} alt={role.title} className="w-8 h-8 lg:w-12 lg:h-12 object-contain mx-auto block" />
          ) : (
            <Icon className="w-6 h-6 lg:w-8 lg:h-8 mx-auto block" style={{ color: role.color }} />
          )}
        </div>
        <h3 className="text-sm lg:text-xl mb-1 lg:mb-2" style={{ color: role.color }}>
          {role.title}
        </h3>
        <p className="text-xs lg:text-base text-gray-600 leading-relaxed">
          {role.description}
        </p>
      </div>
    </motion.div>
  );
}

// Helper component for the central image
function CentralImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col items-center justify-center mx-2 lg:mx-8 shrink-0"
    >
      <div className="relative w-28 h-28 lg:w-80 lg:h-80 flex items-center justify-center">
        <motion.div
          className="absolute inset-4 lg:inset-12 rounded-full border"
          style={{ borderColor: "#E9296A" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-6 lg:inset-16 rounded-full border"
          style={{ borderColor: "#E9296A" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.img
          src="/Standing_IRa.png"
          alt="IR Assistant"
          className="relative w-24 lg:w-72 h-auto object-contain"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

export function EcosystemFlow() {
  const roles = [
    {
      icon: Stethoscope,
      title: "Interventional Radiologists",
      description: "Clinical decision-makers whose early engagement shapes pathways and intent.",
      color: "#E9296A"
    },
    {
      icon: Building2,
      title: "Hospitals & Centres",
      description: "Care environments where IR is delivered consistently within routine workflows.",
      color: "#E9296A"
    },
    {
      icon: Package,
      title: "IR Supply & Industry Partners",
      description: "Enablement partners aligning technology to established clinical direction.",
      color: "#E9296A"
    },
    {
      icon: Heart,
      title: "Patients",
      description: "Individuals supported with timely understanding of non-surgical care options.",
      color: "#E9296A",
      image: "/paients_joinwithus.png"
    }
  ];

  const MobileEcosystemView = () => {
    return (
      <div className="block lg:hidden relative mb-19 mt-11">
        <div className="w-full flex justify-center overflow-visible">
          <img 
            src="/ecosystem_medagg.png" 
            alt="Ecosystem Flow" 
            className="w-full h-auto max-w-2xl scale-125"
          />
        </div>
      </div>
    );
  };

  return (
    <section id="ecosystem" className="py-12 lg:py-24 px-4 lg:px-12 bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <h2 className="text-2xl lg:text-5xl mb-6 font-bold text-[#2B3445] text-center uppercase tracking-tight">
            HOW THE <span style={{ color: '#E9296A' }}>ECOSYSTEM</span> OPERATES
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto whitespace-normal lg:whitespace-nowrap">
            One Operating System. Multiple Interdependent Roles.
          </p>
        </motion.div>

        <MobileEcosystemView />

        <div className="hidden lg:flex flex-col items-center space-y-4 relative">
          
          {/* Top Card: Patients */}
          <div className="relative flex flex-col items-center">
            <RoleCard role={roles[3]} />
            <div className="absolute bottom-0 translate-y-full h-6 lg:h-12 w-12 lg:w-24">
              <ConnectingLine direction="down" />
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex items-center justify-center w-full">
            <div className="relative flex items-center">
              <RoleCard role={roles[0]} delay={0.2} />
              <div className="absolute right-0 translate-x-full h-12 lg:h-24 w-6 lg:w-12">
                <ConnectingLine direction="right" />
              </div>
            </div>
            <CentralImage />
            <div className="relative flex items-center">
              <RoleCard role={roles[2]} delay={0.4} />
              <div className="absolute left-0 -translate-x-full h-12 lg:h-24 w-6 lg:w-12">
                <ConnectingLine direction="left" />
              </div>
            </div>
          </div>

          {/* Bottom Card: Hospitals */}
          <div className="relative flex flex-col items-center">
             <div className="absolute top-0 -translate-y-full h-6 lg:h-12 w-12 lg:w-24">
              <ConnectingLine direction="up" />
            </div>
            <RoleCard role={roles[1]} delay={0.6} />
            <p className="text-sm lg:text-xl font-bold mt-4 lg:mt-12" style={{ color: "#2B3445" }}>Medagg Healthcare Platform</p>
          </div>

        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden lg:block text-center mt-12 lg:mt-20"
        >
          <div className="inline-block px-4 lg:px-6 py-2 lg:py-3 rounded-full" style={{ background: "#FCE8F0" }}>
            <p className="text-sm lg:text-lg" style={{ color: "#E9296A" }}>
              Continuous collaboration driving better patient outcomes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EcosystemFlow;
