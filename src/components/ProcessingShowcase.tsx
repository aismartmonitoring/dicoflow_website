'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROCESSING_MODULES } from '@/lib/constants';
import { MockupFrame } from './ui/mockup-frame';
import { sectionReveal, staggerContainer, staggerItem } from '@/lib/animations';
import { Box, Layers, Scan, Ruler, Rotate3d, Brain } from 'lucide-react';

const PROC_ICONS: Record<string, React.ReactNode> = {
  Box: <Box className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Scan: <Scan className="w-5 h-5" />,
  Ruler: <Ruler className="w-5 h-5" />,
  Rotate3d: <Rotate3d className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
};

function ProcessingMockup({ moduleId }: { moduleId: string }) {
  const mockups: Record<string, React.ReactNode> = {
    volume: (
      <div className="p-4 h-48 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Animated slice scrolling through volume */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-x-4 h-1.5 rounded bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"
              style={{ top: `${10 + i * 12}%` }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-slate-400 font-mono">Slice 128/256 • W:350 L:40 (Soft Tissue)</div>
          </div>
        </div>
      </div>
    ),
    mpr: (
      <div className="p-4 grid grid-cols-3 gap-2 h-48">
        {['Axial', 'Coronal', 'Sagittal'].map((plane, i) => (
          <div key={plane} className="relative bg-slate-800 rounded-lg border border-slate-700/50 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ background: `linear-gradient(${i * 90}deg, rgba(168,85,247,0.1) 0%, transparent 100%)` }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute bottom-1 left-1.5 text-[9px] text-purple-400 font-mono">{plane}</div>
          </div>
        ))}
      </div>
    ),
    segmentation: (
      <div className="p-4 h-48 flex items-center justify-center">
        <div className="relative w-32 h-32">
          {/* Growing region animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
            animate={{ scale: [0.3, 1], opacity: [0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-emerald-500/20"
            animate={{ scale: [0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
            ROI: 42cm²
          </div>
        </div>
      </div>
    ),
    measurement: (
      <div className="p-4 h-48 relative">
        {/* Measurement lines */}
        <motion.div className="absolute top-8 left-8 right-12" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
          <div className="h-px bg-yellow-400/70" />
          <div className="flex justify-between text-[9px] text-yellow-400 font-mono mt-0.5">
            <span>A</span><span>68.4 mm</span><span>B</span>
          </div>
        </motion.div>
        <motion.div className="absolute top-20 left-12 w-20 h-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <svg className="w-full h-full" viewBox="0 0 80 80">
            <path d="M5 75 L40 5 L75 75" fill="none" stroke="rgba(250,204,21,0.5)" strokeWidth="1" />
            <text x="40" y="50" textAnchor="middle" className="text-[10px]" fill="rgba(250,204,21,0.7)">34.7°</text>
          </svg>
        </motion.div>
      </div>
    ),
    rendering: (
      <div className="p-4 h-48 flex items-center justify-center">
        <motion.div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(148,163,184,0.4) 0%, rgba(51,65,85,0.3) 50%, transparent 70%)',
            boxShadow: 'inset 0 0 40px rgba(148,163,184,0.1)',
          }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-400 font-mono">
            3D MIP
          </div>
        </motion.div>
      </div>
    ),
    ai_protocol: (
      <div className="p-4 h-48 space-y-2">
        <div className="text-[10px] text-sky-400 font-mono mb-2">AI Auto-Layout Recommendation</div>
        {[
          { series: 'T1 Axial', pos: 'Top-Left' },
          { series: 'T2 FLAIR', pos: 'Top-Right' },
          { series: 'DWI b1000', pos: 'Bot-Left' },
          { series: 'ADC Map', pos: 'Bot-Right' },
        ].map((s, i) => (
          <motion.div
            key={s.series}
            className="flex items-center justify-between bg-slate-800/50 rounded px-3 py-1.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
          >
            <span className="text-[10px] text-slate-300">{s.series}</span>
            <span className="text-[9px] text-sky-400 font-mono">{s.pos}</span>
          </motion.div>
        ))}
      </div>
    ),
  };
  return <>{mockups[moduleId] || null}</>;
}

export default function ProcessingShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-sky-700 bg-sky-50 rounded-full uppercase tracking-widest border border-sky-100 mb-5">
            Advanced Processing
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            6 Compiled Processing{' '}
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Engines</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Server-side 3D processing compiled to .pyd for IP protection. From volume loading to AI-driven layout recommendations.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROCESSING_MODULES.map((mod) => (
            <motion.div key={mod.id} variants={staggerItem} className="card-hover">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                {/* Animated mockup */}
                <MockupFrame url={`processing.dicoflow.com/${mod.id}`} dark>
                  <ProcessingMockup moduleId={mod.id} />
                </MockupFrame>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                      {PROC_ICONS[mod.icon] || <Box className="w-5 h-5" />}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{mod.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{mod.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.capabilities.slice(0, 3).map(c => (
                      <span key={c} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-600 rounded-full border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
