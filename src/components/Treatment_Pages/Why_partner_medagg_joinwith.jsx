import { motion } from "motion/react";
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
      className="relative max-w-xs w-full z-10"
    >
      <div 
        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full"
        style={{ border: `2px solid ${role.color}20` }}
      >
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: `${role.color}15` }}
        >
          {role.image ? (
            <img src={role.image} alt={role.title} className="w-12 h-12 object-contain" />
          ) : (
            <Icon className="w-8 h-8" style={{ color: role.color }} />
          )}
        </div>
        <h3 className="text-xl mb-3" style={{ color: role.color }}>
          {role.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
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
      className="flex flex-col items-center justify-center mx-8"
    >
      <div className="relative w-80 sm:w-96 md:w-[24rem] h-80 sm:h-96 md:h-[24rem] flex items-center justify-center">
        <motion.div
          className="absolute inset-10 sm:inset-12 md:inset-14 rounded-full border"
          style={{ borderColor: "#E9296A" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-14 sm:inset-16 md:inset-20 rounded-full border"
          style={{ borderColor: "#E9296A" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.img
          src="/Standing_IRa.png"
          alt="IR Assistant"
          className="relative w-72 sm:w-80 md:w-96 h-auto object-contain"
          animate={{ y: [0, -8, 0] }}
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
      description: "Expert practitioners delivering minimally invasive care",
      color: "#E9296A"
    },
    {
      icon: Building2,
      title: "Hospitals & Centres",
      description: "Facilities enabling coordinated IR pathways",
      color: "#2B3445"
    },
    {
      icon: Package,
      title: "IR Supply & Industry Partners",
      description: "Technology and device manufacturers",
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

  return (
    <section id="ecosystem" className="py-24 px-6 lg:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4" style={{ color: "#2B3445" }}>
            One Operating System.
          </h2>
          <h3 className="text-3xl lg:text-4xl mb-6" style={{ color: "#E9296A" }}>
            Multiple Interdependent Roles.
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A unified ecosystem where every stakeholder contributes to advancing interventional radiology
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center space-y-4">
          
          {/* Top Card: Patients */}
          <div className="relative flex flex-col items-center">
            <RoleCard role={roles[3]} />
            <div className="absolute bottom-0 translate-y-full h-12 w-24">
              <ConnectingLine direction="down" />
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex items-center justify-center w-full">
            <div className="relative flex items-center">
              <RoleCard role={roles[0]} delay={0.2} />
              <div className="absolute right-0 translate-x-full h-24 w-12">
                <ConnectingLine direction="right" />
              </div>
            </div>
            <CentralImage />
            <div className="relative flex items-center">
              <RoleCard role={roles[2]} delay={0.4} />
              <div className="absolute left-0 -translate-x-full h-24 w-12">
                <ConnectingLine direction="left" />
              </div>
            </div>
          </div>

          {/* Bottom Card: Hospitals */}
          <div className="relative flex flex-col items-center">
            <div className="absolute top-0 -translate-y-full h-12 w-24">
              <ConnectingLine direction="up" />
            </div>
            <RoleCard role={roles[1]} delay={0.6} />
            <p className="text-xl font-extrabold mt-12" style={{ color: "#2B3445" }}>Medagg Healthcare Platform</p>
          </div>

        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-block px-6 py-3 rounded-full" style={{ background: "#FCE8F0" }}>
            <p className="text-lg" style={{ color: "#E9296A" }}>
              Continuous collaboration driving better patient outcomes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EcosystemFlow;