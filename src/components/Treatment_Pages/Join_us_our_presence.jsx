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
    <section id="network" className="py-24 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #F5F5F7 0%, #FCE8F0 100%)" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4" style={{ color: "#2B3445" }}>
            From Isolated Excellence to Shared Momentum
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a connected network of interventional radiology across India
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {/* Simplified India map representation */}
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background shape representing India */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1546833998-07256bcc76ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMG1hcCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjY4MjQ1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="India Map"
                    className="w-full h-full object-contain opacity-20"
                  />
                </div>

                {/* Region markers */}
                {regions.map((region, index) => (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="absolute z-10"
                    style={region.position}
                  >
                    <div className="relative group cursor-pointer">
                      {/* Pulsing effect */}
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: "#E9296A" }}
                      />
                      
                      <div 
                        className="relative w-8 h-8 rounded-full flex items-center justify-center transform group-hover:scale-125 transition-transform"
                        style={{ background: "#E9296A" }}
                      >
                        <MapPin className="w-4 h-4 text-white" />
                      </div>

                      {/* Tooltip */}
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                        style={{ background: "#2B3445", color: "white" }}
                      >
                        {region.name}
                      </div>

                      {/* Connection lines */}
                      {index < regions.length - 1 && (
                        <svg className="absolute top-1/2 left-1/2 w-32 h-32 -z-10 overflow-visible pointer-events-none">
                          <motion.line
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            x1="0"
                            y1="0"
                            x2="64"
                            y2="32"
                            stroke="#E9296A"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            opacity="0.3"
                          />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full" style={{ background: "rgba(233, 41, 106, 0.1)" }}>
                <span style={{ color: "#E9296A" }}>Regional Coverage</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {regions.map((region, index) => (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-2 p-4 bg-white rounded-2xl shadow-sm"
                  >
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "#E9296A" }}
                    />
                    <span className="text-gray-700">{region.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl mb-4" style={{ color: "#2B3445" }}>
                Nationwide Network
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our ecosystem spans major healthcare hubs across India, connecting interventional radiologists, hospitals, and industry partners in a coordinated network.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Each region benefits from shared knowledge, standardized protocols, and collaborative innovation—transforming local expertise into national impact.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}