import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section 
      id="partner"
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2B3445 0%, #1a1f2e 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(233, 41, 106, 0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(233, 41, 106, 0.1) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full" style={{ background: "rgba(233, 41, 106, 0.2)" }}>
                <span style={{ color: "#FCE8F0" }}>Join the Ecosystem</span>
              </div>

              <h2 className="text-4xl lg:text-5xl text-white leading-tight">
                Be part of the IR ecosystem shaping the future of non-surgical care.
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Connect with us to explore partnership opportunities and become part of India's leading interventional radiology network.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl text-lg group"
              style={{ background: "linear-gradient(135deg, #E9296A 0%, #C41F5A 100%)", color: "white" }}
              onClick={() => navigate('/investor')}
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right content removed as requested */}
          {/* Previously: QR card with scan-to-connect */}
        </div>

        {/* Bottom stats or info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          {[
            { label: "Healthcare Professionals", value: "500+" },
            { label: "Partner Hospitals", value: "100+" },
            { label: "Procedures Enabled", value: "10K+" },
            { label: "Cities Covered", value: "25+" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl mb-2" style={{ color: "#E9296A" }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}