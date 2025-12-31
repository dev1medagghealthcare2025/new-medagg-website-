import { motion } from "motion/react";
import { Clock, Activity, Lightbulb, Target, GitBranch, ArrowRight } from "lucide-react";

export function ProblemResponse() {
  const problems = [
    { icon: Clock, text: "Late consideration of IR" },
    { icon: Activity, text: "Underutilized hospital pathways" },
    { icon: Lightbulb, text: "Innovation outpacing adoption" }
  ];

  const solutions = [
    {
      title: "Early Reach",
      description: "Engaging patients and physicians at the earliest decision points in the care pathway.",
      color: "#E9296A"
    },
    {
      title: "Structured Flow",
      description: "Coordinated referral mechanisms ensuring IR is considered systematically, not sporadically.",
      color: "#2B3445"
    },
    {
      title: "Consistent Execution",
      description: "Training, support, and tools that ensure quality outcomes across the network.",
      color: "#E9296A"
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12" style={{ background: "#F5F5F7" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4" style={{ color: "#2B3445" }}>
            The Problem & The Response
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming challenges into structured opportunities for interventional radiology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ background: "rgba(43, 52, 69, 0.1)" }}>
              <span style={{ color: "#2B3445" }}>Current Challenges</span>
            </div>

            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(233, 41, 106, 0.1)" }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "#E9296A" }} />
                  </div>
                  <p className="text-lg text-gray-700">{problem.text}</p>
                </motion.div>
              );
            })}

            {/* Connector arrow */}
            <div className="hidden lg:flex items-center justify-end">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-12 h-12" style={{ color: "#E9296A" }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ background: "#FCE8F0" }}>
              <span style={{ color: "#E9296A" }}>Our Response</span>
            </div>

            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                style={{
                  borderLeft: `4px solid ${solution.color}`
                }}
              >
                <h3 className="text-2xl mb-3" style={{ color: solution.color }}>
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProblemResponse;
