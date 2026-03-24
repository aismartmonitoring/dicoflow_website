'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MockupFrame } from './ui/mockup-frame';
import { sectionReveal, mockupSlideIn } from '@/lib/animations';
import {
  Move, SunDim, Ruler, Layout, Maximize, Camera,
  Scan, Circle, Triangle, Pencil, RotateCw, FlipHorizontal,
  FlipVertical, Contrast, Palette, Play, Pause,
  PanelLeftOpen, Layers, History, Brain, Activity,
  Eye, Keyboard, Tag, Crosshair, Spline,
  RectangleHorizontal, PenTool, Waypoints, CircleDot, Target
} from 'lucide-react';

/* ═══════ Tool Groups from real dicoflow-server ViewerToolbar.tsx ═══════ */
const TOOL_GROUPS = [
  {
    category: 'Navigation',
    color: 'bg-sky-500',
    textColor: 'text-sky-600',
    lightBg: 'bg-sky-50',
    tools: [
      { icon: <Move className="w-3.5 h-3.5" />, name: 'Pan (P)', key: 'P' },
      { icon: <Maximize className="w-3.5 h-3.5" />, name: 'Zoom (Z)', key: 'Z' },
      { icon: <Layers className="w-3.5 h-3.5" />, name: 'Stack Scroll (S)', key: 'S' },
      { icon: <RotateCw className="w-3.5 h-3.5" />, name: 'Planar Rotate', key: '' },
    ],
  },
  {
    category: 'Windowing',
    color: 'bg-amber-500',
    textColor: 'text-amber-600',
    lightBg: 'bg-amber-50',
    tools: [
      { icon: <SunDim className="w-3.5 h-3.5" />, name: 'W/L Drag (W)', key: 'W' },
      { icon: <Scan className="w-3.5 h-3.5" />, name: 'W/L Region', key: '' },
    ],
    presets: ['Brain', 'Bone', 'Lung', 'Soft Tissue', 'Abdomen', 'Liver', 'Mediastinum', 'Retina', 'Mammogram', 'Pediatric'],
  },
  {
    category: 'Measurements',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
    tools: [
      { icon: <Ruler className="w-3.5 h-3.5" />, name: 'Length (L)', key: 'L' },
      { icon: <Crosshair className="w-3.5 h-3.5" />, name: 'Height', key: '' },
      { icon: <Target className="w-3.5 h-3.5" />, name: 'Bidirectional (B)', key: 'B' },
      { icon: <PenTool className="w-3.5 h-3.5" />, name: 'Polyline', key: '' },
      { icon: <Waypoints className="w-3.5 h-3.5" />, name: 'Angle (A)', key: 'A' },
      { icon: <Triangle className="w-3.5 h-3.5" />, name: 'Cobb Angle', key: '' },
      { icon: <CircleDot className="w-3.5 h-3.5" />, name: 'Probe (Q)', key: 'Q' },
      { icon: <Crosshair className="w-3.5 h-3.5" />, name: 'Drag Probe (D)', key: 'D' },
      { icon: <Activity className="w-3.5 h-3.5" />, name: 'US Directional', key: '' },
    ],
  },
  {
    category: 'ROI Shapes',
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    lightBg: 'bg-purple-50',
    tools: [
      { icon: <Circle className="w-3.5 h-3.5" />, name: 'Circle ROI (C)', key: 'C' },
      { icon: <Circle className="w-3.5 h-3.5" />, name: 'Elliptical ROI (E)', key: 'E' },
      { icon: <RectangleHorizontal className="w-3.5 h-3.5" />, name: 'Rectangle ROI (R)', key: 'R' },
      { icon: <Pencil className="w-3.5 h-3.5" />, name: 'Freehand ROI (F)', key: 'F' },
      { icon: <Spline className="w-3.5 h-3.5" />, name: 'Spline ROI', key: '' },
    ],
  },
  {
    category: 'Specialty',
    color: 'bg-rose-500',
    textColor: 'text-rose-600',
    lightBg: 'bg-rose-50',
    tools: [
      { icon: <Activity className="w-3.5 h-3.5" />, name: 'CTR (Cardiac)', key: '' },
      { icon: <Crosshair className="w-3.5 h-3.5" />, name: 'Flat Foot', key: '' },
      { icon: <Waypoints className="w-3.5 h-3.5" />, name: 'Goniometry', key: '' },
      { icon: <Target className="w-3.5 h-3.5" />, name: 'TT-TG Distance', key: '' },
      { icon: <Triangle className="w-3.5 h-3.5" />, name: 'HTO Planning', key: '' },
      { icon: <Layers className="w-3.5 h-3.5" />, name: 'Spine Labeling', key: '' },
      { icon: <Waypoints className="w-3.5 h-3.5" />, name: 'Vertebra Angle', key: '' },
    ],
  },
  {
    category: 'Manipulation',
    color: 'bg-cyan-500',
    textColor: 'text-cyan-600',
    lightBg: 'bg-cyan-50',
    tools: [
      { icon: <Contrast className="w-3.5 h-3.5" />, name: 'Invert', key: '' },
      { icon: <FlipHorizontal className="w-3.5 h-3.5" />, name: 'Flip Horizontal', key: '' },
      { icon: <FlipVertical className="w-3.5 h-3.5" />, name: 'Flip Vertical', key: '' },
      { icon: <RotateCw className="w-3.5 h-3.5" />, name: 'Rotate CW/CCW', key: '' },
      { icon: <Eye className="w-3.5 h-3.5" />, name: 'Sharpen', key: '' },
      { icon: <Palette className="w-3.5 h-3.5" />, name: 'Colormaps', key: '' },
    ],
  },
];

const SIDE_PANELS = [
  'Series Thumbnails', 'Measurement Panel', 'DICOM Tag Browser', 'AI Results',
  'Histogram', 'Key Image Gallery', 'Patient History', 'Color Channels',
  'Time-Intensity Curve', 'Montage', 'Study Browser', 'Viewer Guide',
  'PET Fusion', 'DSA Subtraction', '4D Series', 'Curved MPR', 'CTR Panel', 'Orthopedic'
];

const VIEWER_CAPABILITIES = [
  { icon: <Layout className="w-4 h-4" />, title: 'Viewport Layouts', desc: '1×1 to 3×3 grids, persistent per user, drag-and-drop series' },
  { icon: <SunDim className="w-4 h-4" />, title: '10 W/L Clinical Presets', desc: 'Brain, bone, lung, soft tissue, abdomen, liver, mediastinum, retina, mammogram, pediatric' },
  { icon: <Brain className="w-4 h-4" />, title: 'AI Hanging Protocols', desc: 'Auto-classify series type, detect plane orientation, recommend optimal layout' },
  { icon: <Play className="w-4 h-4" />, title: 'Cine Controls', desc: 'Play/pause, frame slider, speed (100ms–1s), frame range selection' },
  { icon: <Tag className="w-4 h-4" />, title: 'Key Image Marking', desc: 'Save key images, annotation persistence, DICOM SR export' },
  { icon: <History className="w-4 h-4" />, title: 'Prior Study Comparison', desc: 'Side-by-side historical studies, overlay mode, synchronized scroll' },
  { icon: <Camera className="w-4 h-4" />, title: 'Capture & Export', desc: 'Screenshot as PNG, copy to clipboard, measurement export to DICOM SR' },
  { icon: <Activity className="w-4 h-4" />, title: 'ECG Viewer', desc: 'Embedded ECG waveform display when ECG data present' },
  { icon: <Scan className="w-4 h-4" />, title: 'Segmentation Overlay', desc: 'AI segmentation masks with color overlay and opacity control' },
  { icon: <Keyboard className="w-4 h-4" />, title: 'Keyboard Shortcuts', desc: '30+ shortcuts — 1-9 window presets, tool activation, navigation' },
  { icon: <PanelLeftOpen className="w-4 h-4" />, title: '18 Side Panels', desc: 'Series, measurements, DICOM tags, AI, histogram, key images, and more' },
  { icon: <Palette className="w-4 h-4" />, title: 'Filters & Colormaps', desc: 'Sharpen, smooth, edge enhance, 8+ colormap presets' },
];

export default function ViewerShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-28 lg:py-36 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-purple-700 bg-purple-50 rounded-full uppercase tracking-widest mb-5 border border-purple-100">
            DICOM Viewer
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Enterprise{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">DICOM Viewer</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Full-featured browser-based DICOM viewer with 30+ tools, 18 side panels, 10 clinical presets, AI hanging protocols, and real-time cine playback.
          </p>
        </motion.div>

        {/* ═══ VIEWER MOCKUP ═══ */}
        <motion.div
          variants={mockupSlideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <MockupFrame url="viewer.dicoflow.com/study/CT-2026-4578" dark>
            <div className="p-2 sm:p-3 min-h-[400px]">
              {/* ── Top Toolbar ── */}
              <div className="flex flex-wrap items-center gap-1 mb-2 pb-2 border-b border-slate-700/50">
                {/* Navigation */}
                <div className="flex gap-0.5 mr-2">
                  {['S', 'P', 'Z'].map((t, i) => (
                    <motion.span key={t} className={`text-[9px] w-6 h-6 flex items-center justify-center rounded ${i === 0 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/50'}`}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>{t}</motion.span>
                  ))}
                </div>
                <div className="w-px h-5 bg-slate-700/50" />
                {/* Windowing */}
                <div className="flex gap-0.5 mx-2">
                  {['W/L', 'Region'].map((t, i) => (
                    <motion.span key={t} className={`text-[9px] px-2 h-6 flex items-center rounded ${i === 0 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/50'}`}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.05 }}>{t}</motion.span>
                  ))}
                  <motion.span className="text-[9px] px-2 h-6 flex items-center rounded bg-slate-800 text-amber-400 border border-amber-600/30"
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>Brain ▾</motion.span>
                </div>
                <div className="w-px h-5 bg-slate-700/50" />
                {/* Measurements */}
                <div className="flex gap-0.5 mx-2">
                  {['L', 'B', 'A', '○', '▭', '✎'].map((t, i) => (
                    <motion.span key={t} className="text-[9px] w-6 h-6 flex items-center justify-center rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.04 }}>{t}</motion.span>
                  ))}
                </div>
                <div className="w-px h-5 bg-slate-700/50" />
                {/* Manipulation */}
                <div className="flex gap-0.5 mx-2">
                  {['Inv', '⇔', '⇕', '↻'].map((t, i) => (
                    <motion.span key={t} className="text-[9px] px-1.5 h-6 flex items-center rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 + i * 0.04 }}>{t}</motion.span>
                  ))}
                </div>
                <div className="flex-1" />
                {/* Layout selector */}
                <div className="flex gap-0.5">
                  {['1×1', '1×2', '2×2', '3×3'].map((l, i) => (
                    <motion.span key={l} className={`text-[9px] px-1.5 h-6 flex items-center rounded ${i === 2 ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/50'}`}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.05 }}>{l}</motion.span>
                  ))}
                </div>
              </div>

              {/* ── Main Content Area ── */}
              <div className="flex gap-2">
                {/* Left Side Panel (Series Thumbnails) */}
                <motion.div className="hidden sm:flex flex-col gap-1 w-14 flex-shrink-0"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  {['Ax T1', 'Ax T2', 'DWI', 'ADC', 'Sag', 'Cor'].map((s, i) => (
                    <div key={s} className={`w-13 h-10 rounded text-[7px] flex items-center justify-center border ${i === 0 ? 'border-sky-500 bg-slate-700 text-sky-400' : 'border-slate-700/40 bg-slate-800/50 text-slate-500'}`}>{s}</div>
                  ))}
                </motion.div>

                {/* 2×2 Viewports */}
                <div className="flex-1 grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'T1 Axial', wl: 'W:350 L:40', series: 'Ser 1 | Im 24/48', active: true },
                    { label: 'T2 FLAIR', wl: 'W:300 L:30', series: 'Ser 2 | Im 18/48', active: false },
                    { label: 'DWI b1000', wl: 'W:1200 L:600', series: 'Ser 3 | Im 12/20', active: false },
                    { label: 'ADC Map', wl: 'Parametric', series: 'Ser 4 | Im 12/20', active: false },
                  ].map((vp, i) => (
                    <div key={vp.label} className={`relative bg-slate-800 rounded-lg aspect-[4/3] overflow-hidden border ${vp.active ? 'border-sky-500' : 'border-slate-700/30'}`}>
                      <motion.div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at ${35+i*12}% ${40+i*8}%, rgba(148,163,184,0.15) 0%, transparent 55%)` }} />
                      {vp.active && (
                        <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" animate={{ opacity: [0, 0.1, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                      )}
                      {/* DICOM Overlay — top left */}
                      <div className="absolute top-1 left-1.5">
                        <div className="text-[9px] text-sky-400 font-mono">{vp.label}</div>
                        <div className="text-[7px] text-slate-500 font-mono">Patient: Kumar, S.</div>
                      </div>
                      {/* Bottom right — W/L + series */}
                      <div className="absolute bottom-1 right-1.5 text-right">
                        <div className="text-[8px] text-slate-500 font-mono">{vp.wl}</div>
                        <div className="text-[7px] text-slate-600 font-mono">{vp.series}</div>
                      </div>
                      {/* Measurement overlay on viewport 1 */}
                      {i === 0 && (
                        <>
                          <motion.div className="absolute top-[30%] left-[20%] w-[45%]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
                            <div className="h-px bg-yellow-400/70" />
                            <div className="text-[8px] text-yellow-400/80 font-mono text-center mt-0.5">28.6 mm</div>
                          </motion.div>
                          <motion.div className="absolute top-[55%] left-[35%]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, duration: 0.4 }}>
                            <div className="w-10 h-7 border border-emerald-400/50 rounded-sm" />
                            <div className="text-[7px] text-emerald-400/80 font-mono text-center">ROI: 45.2 HU</div>
                          </motion.div>
                        </>
                      )}
                      {/* Angle measurement on viewport 3 */}
                      {i === 2 && (
                        <motion.div className="absolute top-[35%] left-[25%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
                          <div className="text-[8px] text-orange-400/70 font-mono">∠ 42.3°</div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Right Side Panel (Measurements) */}
                <motion.div className="hidden lg:flex flex-col w-28 flex-shrink-0 bg-slate-800/50 rounded-lg border border-slate-700/30 p-1.5"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Measurements</div>
                  {[
                    { type: 'Length', val: '28.6 mm', color: 'text-yellow-400' },
                    { type: 'ROI Avg', val: '45.2 HU', color: 'text-emerald-400' },
                    { type: 'Area', val: '1.24 cm²', color: 'text-emerald-400' },
                    { type: 'Angle', val: '42.3°', color: 'text-orange-400' },
                  ].map(m => (
                    <div key={m.type} className="flex justify-between py-0.5 border-b border-slate-700/30 last:border-0">
                      <span className="text-[7px] text-slate-500">{m.type}</span>
                      <span className={`text-[7px] font-mono ${m.color}`}>{m.val}</span>
                    </div>
                  ))}
                  <div className="mt-2 text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Key Images</div>
                  <div className="grid grid-cols-2 gap-0.5">
                    {[1, 2].map(k => (
                      <div key={k} className="h-6 bg-slate-700/50 rounded border border-slate-600/30 flex items-center justify-center text-[6px] text-slate-500">★ {k}</div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Cine Controls ── */}
              <motion.div className="flex items-center gap-2 mt-2 px-1 py-1 border-t border-slate-700/50"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                <div className="flex gap-1">
                  <span className="text-[9px] w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-emerald-400 border border-slate-700/50"><Play className="w-2.5 h-2.5" /></span>
                  <span className="text-[9px] w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-500 border border-slate-700/50"><Pause className="w-2.5 h-2.5" /></span>
                </div>
                <div className="flex-1 h-1 bg-slate-700 rounded-full relative">
                  <motion.div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
                </div>
                <span className="text-[8px] text-slate-500 font-mono">24/48</span>
                <span className="text-[8px] text-slate-600 font-mono">100ms</span>
                <span className="text-[9px] text-slate-500 font-mono">● Patient: Kumar, S. | MRI Brain | 2026-03-24</span>
              </motion.div>
            </div>
          </MockupFrame>
        </motion.div>

        {/* ═══ TOOL GROUPS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Complete Toolbar — 30+ Tools</h3>
          <p className="text-sm text-slate-500 text-center mb-8 max-w-xl mx-auto">Every tool from the real DicoFlow viewer. Click a group to see all tools.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOL_GROUPS.map((group, gIdx) => {
              const isExpanded = expandedGroup === group.category;
              return (
                <motion.button
                  key={group.category}
                  onClick={() => setExpandedGroup(isExpanded ? null : group.category)}
                  className={`text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                    isExpanded ? `${group.lightBg} border-current shadow-lg` : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + gIdx * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-3 h-3 rounded-full ${group.color}`} />
                    <span className={`text-sm font-bold ${isExpanded ? group.textColor : 'text-slate-900'}`}>{group.category}</span>
                    <span className="text-[11px] text-slate-400 ml-auto">{group.tools.length} tools</span>
                  </div>
                  <AnimatePresence>
                    {isExpanded ? (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                        <div className="space-y-1.5">
                          {group.tools.map(tool => (
                            <div key={tool.name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white/70">
                              <span className={group.textColor}>{tool.icon}</span>
                              <span className="text-[12px] font-medium text-slate-700">{tool.name}</span>
                            </div>
                          ))}
                        </div>
                        {group.presets && (
                          <div className="mt-3 pt-2 border-t border-slate-200/50">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Presets</div>
                            <div className="flex flex-wrap gap-1">
                              {group.presets.map(p => (
                                <span key={p} className="text-[10px] px-2 py-0.5 bg-white rounded-md border border-slate-200 text-slate-600">{p}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {group.tools.slice(0, 4).map(tool => (
                          <span key={tool.name} className="text-[10px] px-2 py-0.5 bg-slate-50 rounded text-slate-500 border border-slate-100">{tool.name.split(' (')[0]}</span>
                        ))}
                        {group.tools.length > 4 && <span className="text-[10px] px-2 py-0.5 text-slate-400">+{group.tools.length - 4}</span>}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ SIDE PANELS STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-slate-900 text-center mb-4">18 Collapsible Side Panels</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {SIDE_PANELS.map((panel, i) => (
              <motion.span
                key={panel}
                className="text-[11px] px-3 py-1.5 bg-white rounded-full border border-slate-200 text-slate-600 font-medium shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.03 }}
              >
                {panel}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ═══ FEATURE GRID ═══ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIEWER_CAPABILITIES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.06 }}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{feat.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
