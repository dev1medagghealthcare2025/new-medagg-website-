import React, { useMemo, useState } from 'react';
import { motion, useAnimation } from "framer-motion";
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

  // Mobile-only swipe pairs (problem -> solution)
  function MobileSwipePairs() {
    const pairs = useMemo(() => problems.map((p, i) => ({
      problem: p,
      solution: solutions[i]
    })), []);

    const [index, setIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const controls = useAnimation();

    const activePair = pairs[index];
    const ProblemIcon = activePair.problem.icon;

    const onDragEnd = async (_e, info) => {
      const threshold = 60; // easier to trigger on mobile
      const absX = Math.abs(info.offset.x);
      if (!showSolution && absX > threshold) {
        // Reveal solution but keep draggable layer present to capture next swipe (both directions)
        await controls.start({ x: 0, opacity: 0.01, transition: { duration: 0.2 } });
        setShowSolution(true);
      } else if (showSolution && absX > threshold) {
        // Solution visible: swiping either direction goes to next (loop)
        goNext();
      } else {
        // Snap back depending on state
        controls.start({
          x: 0,
          opacity: showSolution ? 0.01 : 1,
          transition: { type: 'spring', stiffness: 300, damping: 25 }
        });
      }
    };

    const goNext = () => {
      const next = (index + 1) % pairs.length;
      setIndex(next);
      setShowSolution(false);
      controls.set({ x: 0, opacity: 1 });
    };

    return (
      <div className="block lg:hidden">
        <div className="text-center mb-2">
          <h3 className="text-xl lg:text-2xl font-semibold" style={{ color: '#E9296A' }}>How Medagg Improves IR</h3>
          <p className="text-sm lg:text-base text-gray-600">Swipe the card to reveal the solution</p>
        </div>

        <div className="relative mx-auto max-w-sm w-full">
          {/* Solution card underneath */}
          <motion.div
            initial={{ opacity: 0.6, scale: 0.96 }}
            animate={{ opacity: showSolution ? 1 : 0.6, scale: showSolution ? 1 : 0.96 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-4 shadow-xl bg-white"
            style={{ borderLeft: `4px solid ${activePair.solution.color}` }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(233,41,106,0.1)' }}>
                <ProblemIcon className="w-6 h-6" style={{ color: '#E9296A' }} />
              </div>
              <p className="text-base text-gray-700">{activePair.problem.text}</p>
            </div>
            <h4 className="text-lg lg:text-xl font-semibold mb-1" style={{ color: activePair.solution.color }}>{activePair.solution.title}</h4>
            <p className="text-sm lg:text-base text-gray-600">{activePair.solution.description}</p>
          </motion.div>

          {/* Draggable problem card on top */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            animate={controls}
            className="absolute inset-0 rounded-3xl p-4 bg-white shadow-lg cursor-pointer touch-pan-x"
            style={{ zIndex: 10 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(233,41,106,0.1)' }}>
                <ProblemIcon className="w-6 h-6" style={{ color: '#E9296A' }} />
              </div>
              <p className="text-base lg:text-lg font-medium" style={{ color: '#2B3445' }}>{activePair.problem.text}</p>
            </div>
            <div className="text-gray-500 text-sm lg:text-base">Swipe to reveal</div>
            {/* subtle right arrow indicator */}
            <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="mt-4 inline-flex items-center gap-2 text-pink-600">
              <ArrowRight className="w-5 h-5" />
              <span className="text-sm">Swipe</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Controls (dots only) */}
        <div className="mt-2 flex items-center justify-center gap-2 max-w-sm mx-auto w-full">
          {problems.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === index ? 'bg-pink-600' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-24 px-4 lg:px-12" style={{ background: "#F5F5F7" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="text-2xl lg:text-5xl mb-2 lg:mb-4 tracking-tight font-semibold" style={{ color: "#2B3445" }}>
            The Problem and the <span style={{ color: '#E9296A' }}>Response</span>
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming challenges into structured opportunities for interventional radiology
          </p>
        </motion.div>

        {/* Mobile swipe experience */}
        <MobileSwipePairs />

        {/* Desktop/large layout remains unchanged */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Column Titles */}
          <div className="inline-block px-4 py-2 rounded-full mb-4 justify-self-center" style={{ background: "rgba(43, 52, 69, 0.1)" }}>
            <span className="font-bold text-lg" style={{ color: "#2B3445" }}>Current Challenges</span>
          </div>
          <div className="hidden lg:block"></div> {/* Spacer for the arrow column*/}
          <div className="inline-block px-4 py-2 rounded-full mb-4 justify-self-center" style={{ background: "#FCE8F0" }}>
            <span className="font-bold text-lg" style={{ color: "#E9296A" }}>Our Response</span>
          </div>

          {/* Paired Items */}
          {problems.map((problem, index) => {
            const solution = solutions[index];
            const Icon = problem.icon;
            return (
              <React.Fragment key={index}>
                {/* Left - Problem Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm h-full"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(233, 41, 106, 0.1)" }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "#E9296A" }} />
                  </div>
                  <p className="text-lg text-gray-700">{problem.text}</p>
                </motion.div>

                {/* Center - Arrow */}
                <div className="hidden lg:flex items-center justify-center h-full">
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                    >
                        <ArrowRight className="w-12 h-12" style={{ color: "#E9296A" }} />
                    </motion.div>
                </div>

                {/* Right - Solution Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full"
                  style={{
                    borderLeft: `4px solid ${solution.color}`
                  }}
                >
                  {/* Mobile: keep original solution color; Desktop: force pink */}
                  <h3 className="text-2xl mb-3 lg:hidden" style={{ color: solution.color }}>
                    {solution.title}
                  </h3>
                  <h3 className="hidden lg:block text-2xl mb-3" style={{ color: '#E9296A' }}>
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>
                </motion.div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default ProblemResponse;
