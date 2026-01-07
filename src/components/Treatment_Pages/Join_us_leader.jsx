import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function LeadershipSection() {
  const leaders = [
    {
      name: "Ramesh Krishnan",
      title: "Founder & Managing Partner",
      description: "Brings decades of experience across international healthcare systems.",
      image: "/Ramesh Krishnan.png"
    },
    {
      name: "Sumitha Karthik",
      title: "Co-Founder & Partner",
      description: "Brings deep expertise in healthcare operations, patient journeys, and execution at scale.",
      image: "/sk_new-removebg-preview.png"
    }
  ];

  return (
    <section id="leadership" className="py-24 px-6 lg:px-12" style={{ background: "#FFF7F9" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: "#FCE8F0" }}>
            <Users className="w-5 h-5" style={{ color: "#E9296A" }} />
            <span style={{ color: "#E9296A" }}>Leadership</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl mb-4" style={{ color: "#2B3445" }}>
            Leadership & Stewardship
          </h2>
          
        </motion.div>

        {/* Leader profiles */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden" style={{ backgroundColor: "#FDF2F8" }}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  className={`w-full h-full object-contain ${leader.name === 'Ramesh Krishnan' ? 'object-bottom lg:object-top' : 'object-top'}`}
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl mb-2" style={{ color: "#2B3445" }}>
                  {leader.name}
                </h3>
                <p className="text-lg mb-4" style={{ color: "#E9296A" }}>
                  {leader.title}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {leader.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
        >
          <div 
            className="rounded-3xl p-12 shadow-xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2B3445 0%, #3d4a5e 100%)" }}
          >
            <div className="relative z-10">
              <p className="text-2xl lg:text-3xl text-white leading-relaxed italic text-center mb-6">
              Together, they steward Medagg and Nosurgeries with a unified intent:
              Advancing Interventional Radiology through structure, collaboration, and continuity.
              </p>
              
              <div className="flex justify-center">
                <div 
                  className="h-1 w-24 rounded-full"
                  style={{ background: "#E9296A" }}
                />
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(233, 41, 106, 0.2) 0%, transparent 70%)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}