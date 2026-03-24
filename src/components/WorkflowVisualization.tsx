'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WORKFLOW_STAGES, TIER_COLORS } from '@/lib/constants';
import { sectionReveal } from '@/lib/animations';
import {
  UserPlus, Clock, ClipboardCheck, Scan, Download,
  Eye, FileEdit, CheckCircle, BookOpen, Printer,
  Share2, Send, CreditCard, Archive,
  ArrowDown, ChevronRight
} from 'lucide-react';

const STAGE_ICONS = [
  UserPlus, Clock, ClipboardCheck, Scan, Download,
  Eye, FileEdit, CheckCircle, BookOpen, Printer,
  Share2, Send, CreditCard, Archive
];

const PHASES = [
  { key: 'registration', label: 'Registration', icon: '🏥', color: '#0ea5e9', glow: 'shadow-sky-500/30', gradient: 'from-sky-400 to-sky-600', bg: 'bg-sky-500', light: 'bg-sky-50', lightBorder: 'border-sky-200', text: 'text-sky-600', darkText: 'text-sky-400', stages: [0, 1] },
  { key: 'imaging', label: 'Imaging & Acquisition', icon: '📡', color: '#14b8a6', glow: 'shadow-teal-500/30', gradient: 'from-teal-400 to-teal-600', bg: 'bg-teal-500', light: 'bg-teal-50', lightBorder: 'border-teal-200', text: 'text-teal-600', darkText: 'text-teal-400', stages: [2, 3, 4] },
  { key: 'reporting', label: 'Radiology Reporting', icon: '📋', color: '#a855f7', glow: 'shadow-purple-500/30', gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-500', light: 'bg-purple-50', lightBorder: 'border-purple-200', text: 'text-purple-600', darkText: 'text-purple-400', stages: [5, 6, 7] },
  { key: 'distribution', label: 'Print & Distribution', icon: '📤', color: '#10b981', glow: 'shadow-emerald-500/30', gradient: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-500', light: 'bg-emerald-50', lightBorder: 'border-emerald-200', text: 'text-emerald-600', darkText: 'text-emerald-400', stages: [8, 9, 10, 11] },
  { key: 'billing', label: 'Billing & Payment', icon: '💰', color: '#f59e0b', glow: 'shadow-amber-500/30', gradient: 'from-amber-400 to-amber-600', bg: 'bg-amber-500', light: 'bg-amber-50', lightBorder: 'border-amber-200', text: 'text-amber-600', darkText: 'text-amber-400', stages: [12] },
  { key: 'archive', label: 'Archive & Compliance', icon: '🗄️', color: '#64748b', glow: 'shadow-slate-500/20', gradient: 'from-slate-400 to-slate-600', bg: 'bg-slate-500', light: 'bg-slate-50', lightBorder: 'border-slate-200', text: 'text-slate-600', darkText: 'text-slate-400', stages: [13] },
];

function getPhaseForStage(idx: number) {
  return PHASES.find(p => p.stages.includes(idx)) || PHASES[0];
}

export default function WorkflowVisualization() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [glowStage, setGlowStage] = useState(-1);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  // Animated "data packet" flowing through stages
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setGlowStage(prev => (prev + 1) % 14);
    }, 1200);
    return () => clearInterval(timer);
  }, [inView]);

  const handleStageClick = useCallback((idx: number) => {
    setActiveStage(prev => prev === idx ? null : idx);
  }, []);

  return (
    <section ref={ref} id="workflow" className="py-28 lg:py-36 bg-gradient-to-b from-[#fafbfc] to-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full uppercase tracking-widest mb-5 border border-emerald-100">
            14-Stage Lifecycle
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Complete Study{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Workflow</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Watch how a study flows through 14 managed stages — from patient registration to archival.
            Click any stage to explore its details.
          </p>
        </motion.div>

        {/* ═══ VERTICAL PIPELINE ═══ */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Animated Line */}
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 via-purple-200 to-slate-200 z-0" />

          {/* Animated pulse traveling down the line */}
          <motion.div
            className="absolute left-[30px] sm:left-[46px] w-1.5 h-16 rounded-full z-10"
            style={{
              background: 'linear-gradient(to bottom, transparent, #0ea5e9, #a855f7, transparent)',
              filter: 'blur(2px)',
            }}
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {PHASES.map((phase, phaseIdx) => (
            <div key={phase.key} className="relative mb-6 last:mb-0">
              {/* ─── Phase Header ─── */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + phaseIdx * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center gap-4 mb-4 pl-[72px] sm:pl-[88px]"
              >
                {/* Phase dot on the line */}
                <motion.div
                  className={`absolute left-[22px] sm:left-[38px] w-5 h-5 rounded-full border-[3px] border-white z-20 ${phase.bg}`}
                  style={{ boxShadow: `0 0 12px ${phase.color}50` }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.2 + phaseIdx * 0.12, type: 'spring', stiffness: 300 }}
                />
                <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r ${phase.gradient} text-white shadow-lg ${phase.glow}`}>
                  <span className="text-base">{phase.icon}</span>
                  <span className="text-[13px] font-bold tracking-wide">{phase.label}</span>
                </div>
                <span className="text-[12px] font-medium text-slate-400">{phase.stages.length} stage{phase.stages.length > 1 ? 's' : ''}</span>
              </motion.div>

              {/* ─── Stage Cards ─── */}
              <div className="space-y-2 pl-[72px] sm:pl-[88px]">
                {phase.stages.map((stageIdx, i) => {
                  const stage = WORKFLOW_STAGES[stageIdx];
                  const Icon = STAGE_ICONS[stageIdx];
                  const isActive = activeStage === stageIdx;
                  const isGlowing = glowStage === stageIdx;

                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 20, x: -20 }}
                      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                      transition={{ delay: 0.25 + phaseIdx * 0.12 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Stage node on the line */}
                      <div className="relative">
                        <motion.div
                          className={`absolute -left-[60px] sm:-left-[76px] top-4 w-3 h-3 rounded-full z-20 border-2 border-white transition-all duration-500 ${
                            isGlowing ? phase.bg : isActive ? phase.bg : 'bg-slate-200'
                          }`}
                          animate={isGlowing ? {
                            boxShadow: [`0 0 0px ${phase.color}`, `0 0 16px ${phase.color}`, `0 0 0px ${phase.color}`],
                          } : {}}
                          transition={{ duration: 1 }}
                        />

                        {/* Connector line from dot to card */}
                        <div className={`absolute -left-[48px] sm:-left-[64px] top-[22px] w-[36px] sm:w-[52px] h-px transition-colors duration-500 ${
                          isGlowing || isActive ? `bg-gradient-to-r from-transparent` : 'bg-slate-200'
                        }`} style={isGlowing || isActive ? { backgroundImage: `linear-gradient(to right, transparent, ${phase.color})` } : {}} />

                        {/* Card */}
                        <button
                          onClick={() => handleStageClick(stageIdx)}
                          className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 group relative overflow-hidden ${
                            isActive
                              ? `${phase.light} ${phase.lightBorder} shadow-lg`
                              : isGlowing
                              ? `bg-white ${phase.lightBorder} shadow-md`
                              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
                          }`}
                        >
                          {/* Glow sweep animation */}
                          {isGlowing && (
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0, x: '-100%' }}
                              animate={{ opacity: [0, 0.15, 0], x: ['-100%', '100%'] }}
                              transition={{ duration: 1 }}
                              style={{ background: `linear-gradient(90deg, transparent, ${phase.color}20, transparent)` }}
                            />
                          )}

                          <div className="relative flex items-center gap-4">
                            {/* Icon */}
                            <motion.div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isActive || isGlowing
                                  ? `bg-gradient-to-br ${phase.gradient} text-white shadow-lg ${phase.glow}`
                                  : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                              }`}
                              animate={isGlowing ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2.5">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? phase.text : 'text-slate-400'}`}>Stage {stage.id}</span>
                                <div className="flex gap-1">
                                  {stage.tierIds.map(t => (
                                    <span key={t} className="text-[8px] px-1.5 py-0.5 rounded-md font-bold text-white" style={{ backgroundColor: TIER_COLORS[t].primary }}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <h4 className={`text-[15px] font-bold mt-0.5 ${isActive ? phase.text : 'text-slate-900'}`}>
                                {stage.label}
                              </h4>
                              <p className="text-[12px] text-slate-500 mt-1 leading-relaxed line-clamp-1">{stage.description}</p>
                            </div>

                            {/* Role badge */}
                            <div className="hidden sm:block flex-shrink-0">
                              <span className={`text-[11px] font-medium px-3 py-1.5 rounded-lg ${
                                isActive ? `${phase.light} ${phase.text}` : 'bg-slate-50 text-slate-500'
                              }`}>
                                {stage.role}
                              </span>
                            </div>

                            {/* Expand indicator */}
                            <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                              isActive ? `${phase.text} rotate-90` : 'text-slate-300'
                            }`} />
                          </div>
                        </button>
                      </div>

                      {/* ─── Expanded Detail ─── */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className={`mt-2 rounded-2xl border-2 ${phase.lightBorder} overflow-hidden`}>
                              <div className={`${phase.light} p-6`}>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</div>
                                    <p className={`text-[14px] font-medium ${phase.text} leading-relaxed`}>{stage.description}</p>
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Performed By</div>
                                    <p className="text-[14px] font-semibold text-slate-900">{stage.role}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {stage.tierIds.map(t => (
                                        <span key={t} className="text-[11px] font-bold px-2.5 py-1 rounded-lg text-white" style={{ backgroundColor: TIER_COLORS[t].primary }}>{t}</span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="sm:col-span-2 lg:col-span-1">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Technical Detail</div>
                                    <div className="text-[12px] text-slate-600 leading-relaxed font-mono bg-white rounded-xl p-3 border border-slate-100">
                                      {stage.technical}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Phase-to-phase connector arrow */}
              {phaseIdx < PHASES.length - 1 && (
                <motion.div
                  className="flex justify-center py-2 pl-[72px] sm:pl-[88px]"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + phaseIdx * 0.12 }}
                >
                  <ArrowDown className="w-5 h-5 text-slate-300" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* ═══ Bottom Summary Bar ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          {/* Phase progress strip */}
          <div className="flex items-center gap-0 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.key}
                className="flex-1 py-4 text-center relative group cursor-default"
                style={{ minWidth: 0 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.3 + i * 0.08 }}
              >
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${phase.color}08` }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
                  // transform origin left ensures it grows from left->right
                />
                <div className="relative">
                  <div className="text-lg mb-0.5">{phase.icon}</div>
                  <div className={`text-[11px] font-bold ${phase.text}`}>{phase.label}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{phase.stages.length} stages</div>
                </div>
                {/* Separator */}
                {i < PHASES.length - 1 && (
                  <div className="absolute right-0 top-3 bottom-3 w-px bg-slate-200" />
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-center text-[13px] text-slate-400 font-medium mt-5">
            Registration → Imaging → Reporting → Distribution → Billing → Archive • Fully managed with real-time WebSocket updates
          </p>
        </motion.div>
      </div>
    </section>
  );
}
