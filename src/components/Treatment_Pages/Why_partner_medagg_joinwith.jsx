import { motion } from "motion/react";
import { Stethoscope, Building2, Package } from "lucide-react";

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
          className="text-center mb-20"
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

        <div className="relative">
          {/* Center visual - IR Assistant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-16"
          >
            <div 
              className="w-48 h-48 rounded-full flex items-center justify-center shadow-2xl relative"
              style={{ background: "linear-gradient(135deg, #E9296A 0%, #C41F5A 100%)" }}
            >
              {/* Pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: "#E9296A" }}
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: "#E9296A" }}
              />
              
              <div className="text-center text-white z-10">
                <div className="text-5xl mb-2">🏥</div>
                <p className="text-sm font-semibold">IR Ecosystem</p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-lg" style={{ color: "#2B3445" }}>Medagg Healthcare Platform</p>
            </motion.div>
          </motion.div>

          {/* Circular flow of roles */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  {/* Connection line to center */}
                  <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-16">
                    <svg width="2" height="100%" className="mx-auto">
                      <motion.line
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="100%"
                        stroke={role.color}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>

                  <div 
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full"
                    style={{ border: `2px solid ${role.color}20` }}
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${role.color}15` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: role.color }} />
                    </div>
                    
                    <h3 className="text-xl mb-3" style={{ color: role.color }}>
                      {role.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Curved arrow indicator */}
                  {index < roles.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-full -translate-y-1/2">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg width="30" height="30" viewBox="0 0 30 30">
                          <path
                            d="M 5 15 Q 15 15 20 15"
                            fill="none"
                            stroke={role.color}
                            strokeWidth="2"
                            opacity="0.3"
                          />
                          <polygon
                            points="18,12 24,15 18,18"
                            fill={role.color}
                            opacity="0.3"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-block px-6 py-3 rounded-full" style={{ background: "#FCE8F0" }}>
              <p className="text-lg" style={{ color: "#E9296A" }}>
                Continuous collaboration driving better patient outcomes
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EcosystemFlow;