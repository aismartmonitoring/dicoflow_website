'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MODULES, TIER_COLORS } from '@/lib/constants';
import { sectionReveal, featureTabSwitch, staggerContainer, staggerItem } from '@/lib/animations';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import {
  Shield, IndianRupee, Database, FileText, Printer, Cpu,
  MessageSquare, Landmark, ShieldCheck, Timer
} from 'lucide-react';
import type { TierId } from '@/lib/types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-5 h-5" />,
  IndianRupee: <IndianRupee className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Printer: <Printer className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Timer: <Timer className="w-5 h-5" />,
};

function TierBadge({ tierId }: { tierId: TierId }) {
  const c = TIER_COLORS[tierId];
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
      style={{ backgroundColor: c.primary }}
    >
      {tierId}
    </span>
  );
}

export default function FeatureDeepDive() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="features" className="py-24 lg:py-32 bg-[#f8fafc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-purple-700 bg-purple-50 rounded-full uppercase tracking-widest mb-5 border border-purple-100">
            10 Modules
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Deep Dive Into Every{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Module</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Each module is purpose-built for a specific aspect of the diagnostic workflow, gated by tier.
          </p>
        </motion.div>

        <Tabs defaultValue="core" className="w-full">
          <div className="overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            <TabsList className="inline-flex min-w-max bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
              {MODULES.map((mod) => (
                <TabsTrigger key={mod.id} value={mod.id} className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">
                  {ICON_MAP[mod.icon]}
                  <span className="hidden sm:inline">{mod.shortName}</span>
                  <span className="sm:hidden text-[11px]">{mod.shortName.slice(0, 5)}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {MODULES.map((mod) => (
            <TabsContent key={mod.id} value={mod.id}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mod.id}
                  variants={featureTabSwitch}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Module Header Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 mb-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                          {ICON_MAP[mod.icon]}
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{mod.name}</h3>
                          <p className="text-[15px] text-slate-500 mt-1 leading-relaxed max-w-2xl">{mod.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 lg:flex-shrink-0">
                        <span className="text-[13px] text-slate-400 font-medium mr-1">Available in:</span>
                        {mod.tierIds.map((t) => (
                          <TierBadge key={t} tierId={t} />
                        ))}
                      </div>
                    </div>

                    {mod.highlight && (
                      <div className="mt-5 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-sky-50 text-sky-700 text-[14px] font-semibold border border-sky-100">
                        <Cpu className="w-4 h-4" />
                        {mod.highlight}
                      </div>
                    )}
                  </div>

                  {/* Feature Grid */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {mod.features.map((feat, i) => (
                      <motion.div
                        key={feat.title}
                        variants={staggerItem}
                        className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-purple-600 transition-colors duration-300">
                            <span className="text-[13px] font-bold">{String(i + 1).padStart(2, '0')}</span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[15px] font-bold text-slate-900 mb-1.5 leading-snug">{feat.title}</h4>
                            <p className="text-[13px] text-slate-500 leading-relaxed">{feat.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
