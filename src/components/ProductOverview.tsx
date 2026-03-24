'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerItem, sectionReveal } from '@/lib/animations';
import { Scan, Cpu, Send } from 'lucide-react';

const STEPS = [
  {
    icon: <Scan className="w-7 h-7" />,
    title: 'Acquire',
    description: 'Receive DICOM images from CT, MRI, X-Ray, Ultrasound, and 120+ other modalities. Automatic patient matching and study indexing.',
    gradient: 'from-sky-500 to-blue-600',
    light: 'bg-sky-50',
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    title: 'Process',
    description: 'Server-side 3D rendering, MPR reconstruction, AI segmentation, measurements, and intelligent hanging protocols.',
    gradient: 'from-purple-500 to-violet-600',
    light: 'bg-purple-50',
  },
  {
    icon: <Send className="w-7 h-7" />,
    title: 'Deliver',
    description: 'Generate reports, print booklets, share via WhatsApp/Email/SMS, and manage billing — all in one seamless workflow.',
    gradient: 'from-emerald-500 to-teal-600',
    light: 'bg-emerald-50',
  },
];

export default function ProductOverview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white" id="overview">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-sky-700 bg-sky-50 rounded-full uppercase tracking-widest mb-5 border border-sky-100">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            One Platform, Every Step of the{' '}
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Diagnostic Workflow</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            DicoFlow unifies patient registration, DICOM acquisition, radiology reporting, billing, and report delivery into a single enterprise platform.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-sky-200 via-purple-200 to-emerald-200" />

          {STEPS.map((step, i) => (
            <motion.div key={step.title} variants={staggerItem} className="relative">
              <div className="card-hover bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center relative z-10">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 shadow-sm">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mx-auto mb-5 shadow-lg`}>
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow between steps (desktop only) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-24 -right-4 z-20">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
