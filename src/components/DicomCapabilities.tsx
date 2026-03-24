'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DICOM_STATS, SUPPORTED_MODALITIES } from '@/lib/constants';
import { AnimatedCounter } from './ui/animated-counter';
import { sectionReveal, staggerContainer, staggerItem } from '@/lib/animations';
import { Scan, Brain, Bone, Radio, Atom, Heart, Activity, Image as ImageIcon, MonitorDot, Radiation } from 'lucide-react';

const MODALITY_ICONS: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Bone: <Bone className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  Atom: <Atom className="w-5 h-5" />,
  Radiation: <Radiation className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Image: <ImageIcon className="w-5 h-5" />,
  MonitorDot: <MonitorDot className="w-5 h-5" />,
};

export default function DicomCapabilities() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-sky-300 bg-sky-900/50 rounded-full uppercase tracking-widest border border-sky-100 mb-5">
            DICOM Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Industry-Leading{' '}
            <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              DICOM Support
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The widest DICOM compatibility in the market — receive images from any modality, any manufacturer.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {DICOM_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Supported Modalities */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-center mb-8">Supported Modalities</h3>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        >
          {SUPPORTED_MODALITIES.map((mod) => (
            <motion.div
              key={mod.name}
              variants={staggerItem}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                {MODALITY_ICONS[mod.icon] || <Scan className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{mod.name}</div>
                <div className="text-[10px] text-slate-500">{mod.fullName}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-lg font-bold text-center mb-6">DICOM Receive Pipeline</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
            {[
              { label: 'Modality', sub: 'C-STORE' },
              { label: 'SCP Receiver', sub: 'Port 11112' },
              { label: 'Validate SOP', sub: '120+ classes' },
              { label: 'Match Patient', sub: '4-priority' },
              { label: 'Store & Index', sub: 'Study UID' },
              { label: 'WebSocket', sub: 'Broadcast' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="text-center px-4 py-3 rounded-lg bg-white/5 border border-white/10 min-w-[100px]">
                  <div className="text-xs font-semibold text-white">{step.label}</div>
                  <div className="text-[10px] text-slate-500">{step.sub}</div>
                </div>
                {i < 5 && (
                  <div className="hidden sm:block text-slate-600">→</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
