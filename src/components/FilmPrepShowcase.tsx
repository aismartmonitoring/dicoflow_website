'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MockupFrame } from './ui/mockup-frame';
import { sectionReveal, mockupSlideIn } from '@/lib/animations';
import {
  Layout, Printer, FileDown, GripVertical, SunDim,
  FlipHorizontal, RotateCw, Type, Ruler, Eye,
  Save, FileText, Layers, Settings, ImagePlus,
  Grid2X2, Grid3X3, Maximize2, BookOpen
} from 'lucide-react';

/* ═══ Film Layouts from dicoflow-server FilmPreparationPage.tsx ═══ */
const FILM_LAYOUTS = [
  { id: '1x1', label: '1×1', cols: 1, rows: 1 },
  { id: '1x2', label: '1×2', cols: 2, rows: 1 },
  { id: '2x1', label: '2×1', cols: 1, rows: 2 },
  { id: '2x2', label: '2×2', cols: 2, rows: 2 },
  { id: '2x3', label: '2×3', cols: 3, rows: 2 },
  { id: '3x2', label: '3×2', cols: 2, rows: 3 },
  { id: '3x3', label: '3×3', cols: 3, rows: 3 },
  { id: '3x4', label: '3×4', cols: 4, rows: 3 },
  { id: '4x3', label: '4×3', cols: 3, rows: 4 },
  { id: '4x4', label: '4×4', cols: 4, rows: 4 },
  { id: '4x5', label: '4×5', cols: 5, rows: 4 },
  { id: '5x4', label: '5×4', cols: 4, rows: 5 },
  { id: 'focus-1+3', label: 'Focus 1+3', cols: 2, rows: 2 },
  { id: 'focus-2+4', label: 'Focus 2+4', cols: 3, rows: 2 },
];

const FILM_SIZES = [
  '8×10"', '10×12"', '10×14"', '11×14"', '14×14"',
  '14×17"', '17×17"', '24×30 cm', '35×43 cm', 'Custom',
];

const WL_PRESETS = [
  'Brain', 'Bone', 'Lung', 'Soft Tissue', 'Abdomen',
  'Liver', 'Mediastinum', 'Retina', 'Mammogram', 'Pediatric',
];

/* ═══ Features from dicoflow-server Film Prep + Dispatch ═══ */
const FEATURES = [
  {
    icon: <Layout className="w-5 h-5" />,
    title: '14 Film Layouts',
    desc: 'From 1×1 to 5×4, plus focus layouts (1+3, 2+4). Each slot independently configurable.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: <GripVertical className="w-5 h-5" />,
    title: 'Drag & Drop Composition',
    desc: 'Drag images from series thumbnails onto grid slots. Smart auto-select picks optimal slices.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: <SunDim className="w-5 h-5" />,
    title: 'Per-Slot Controls',
    desc: 'Adjust W/L, flip H/V, rotate CW/CCW, zoom/pan, invert, brightness, and contrast per slot.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: <Type className="w-5 h-5" />,
    title: 'Annotations & Overlay',
    desc: 'Text, arrow, and ruler annotations. 12 overlay fields: patient name, ID, study date, modality, and more.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: <Save className="w-5 h-5" />,
    title: 'Template System',
    desc: 'Save and load film preparation templates. Reuse layouts across studies for consistency.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: <FileDown className="w-5 h-5" />,
    title: 'Export & Print',
    desc: 'Export as PDF (300 DPI), JPEG, or DICOM Print. Multi-page sessions with batch printing.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Booklet Generation',
    desc: 'Auto-generate patient booklets with cover page, hospital branding, logo, header/footer, and page numbering.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: <Printer className="w-5 h-5" />,
    title: 'DICOM Print & Dispatch',
    desc: 'Multi-printer routing: DICOM SCP, Windows GDI, Linux lp, or PDF. Retry with exponential backoff.',
    color: 'bg-cyan-50 text-cyan-600',
  },
];

const TABS = ['Canvas', 'Booklet', 'Print'] as const;

export default function FilmPrepShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Canvas');
  const [selectedLayout, setSelectedLayout] = useState('2x2');

  const currentLayout = FILM_LAYOUTS.find(l => l.id === selectedLayout) || FILM_LAYOUTS[3];

  return (
    <section ref={ref} className="py-28 lg:py-36 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-teal-700 bg-teal-50 rounded-full uppercase tracking-widest mb-5 border border-teal-100">
            Film Preparation
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Film Prep &{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Booklet Generation</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Compose DICOM images onto print-ready film layouts with drag-and-drop, per-slot adjustments,
            annotations, and export to PDF, JPEG, or DICOM Print at 300 DPI.
          </p>
        </motion.div>

        {/* ═══ FILM PREP MOCKUP ═══ */}
        <motion.div
          variants={mockupSlideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <MockupFrame url="dicoflow.com/app/technician/film-prep/STD-2026-0891" dark>
            <div className="p-2 sm:p-3 min-h-[420px]">
              {/* Tab bar */}
              <div className="flex items-center gap-1 mb-2">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-300 border border-slate-700/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <div className="flex-1" />
                <span className="text-[9px] text-slate-500 font-mono">STD-2026-0891 | CT Chest | Kumar, S.</span>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'Canvas' && (
                  <motion.div key="canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
                    {/* Left: Series panel */}
                    <div className="hidden sm:flex flex-col gap-1 w-20 flex-shrink-0">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1">Series</div>
                      {['Axial 5mm', 'Axial 1mm', 'Coronal', 'Sagittal', 'Bone', 'Lung'].map((s, i) => (
                        <motion.div
                          key={s}
                          className={`px-2 py-1.5 rounded text-[8px] cursor-grab border ${
                            i < 4 ? 'border-teal-500/30 bg-slate-700 text-teal-400' : 'border-slate-700/40 bg-slate-800/50 text-slate-500'
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.06 }}
                          whileHover={{ x: 4 }}
                        >
                          <GripVertical className="w-2.5 h-2.5 inline mr-1 opacity-50" />
                          {s}
                          <span className="block text-[7px] text-slate-500 ml-3.5">{(i + 1) * 48} images</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Center: Film canvas */}
                    <div className="flex-1">
                      {/* Layout toolbar */}
                      <div className="flex items-center gap-1 mb-2 flex-wrap">
                        <span className="text-[8px] text-slate-500 mr-1">Layout:</span>
                        {FILM_LAYOUTS.slice(0, 8).map(l => (
                          <button
                            key={l.id}
                            onClick={() => setSelectedLayout(l.id)}
                            className={`text-[8px] px-1.5 py-0.5 rounded transition-colors ${
                              selectedLayout === l.id ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-500 border border-slate-700/40'
                            }`}
                          >
                            {l.label}
                          </button>
                        ))}
                        <span className="text-[8px] text-slate-600 ml-1">+{FILM_LAYOUTS.length - 8}</span>
                        <div className="flex-1" />
                        <span className="text-[8px] text-slate-500">Film: 14×17&quot;</span>
                      </div>

                      {/* Grid canvas */}
                      <div
                        className="grid gap-1 bg-slate-950 rounded-lg p-1.5 border border-slate-700/40"
                        style={{ gridTemplateColumns: `repeat(${currentLayout.cols}, 1fr)`, gridTemplateRows: `repeat(${currentLayout.rows}, 1fr)` }}
                      >
                        {Array.from({ length: currentLayout.cols * currentLayout.rows }).map((_, idx) => {
                          const hasImage = idx < 3;
                          return (
                            <motion.div
                              key={idx}
                              className={`aspect-[4/3] rounded border relative overflow-hidden ${
                                hasImage
                                  ? 'bg-slate-800 border-slate-600/50'
                                  : 'bg-slate-900/50 border-dashed border-slate-700/40'
                              }`}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + idx * 0.06 }}
                            >
                              {hasImage ? (
                                <>
                                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at ${40 + idx * 15}% ${45 + idx * 10}%, rgba(148,163,184,0.15) 0%, transparent 60%)` }} />
                                  <div className="absolute top-0.5 left-1 text-[7px] text-sky-400 font-mono">
                                    {['Ax 5mm #12', 'Ax 5mm #24', 'Cor #8'][idx]}
                                  </div>
                                  <div className="absolute bottom-0.5 right-1 text-[6px] text-slate-600 font-mono">
                                    W:350 L:40
                                  </div>
                                  {/* Measurement annotation on first slot */}
                                  {idx === 0 && (
                                    <motion.div className="absolute top-[40%] left-[20%] w-[50%]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 0.4 }}>
                                      <div className="h-px bg-yellow-400/60" />
                                      <div className="text-[6px] text-yellow-400/70 font-mono text-center">35.2 mm</div>
                                    </motion.div>
                                  )}
                                </>
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ImagePlus className="w-4 h-4 text-slate-700/50" />
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Overlay config bar */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[8px] text-slate-500">Overlay:</span>
                        {['Patient', 'Study Date', 'Modality', 'Hospital', 'Accession'].map(f => (
                          <span key={f} className="text-[8px] px-1.5 py-0.5 bg-teal-900/30 text-teal-400 rounded border border-teal-700/30">{f}</span>
                        ))}
                        <span className="text-[8px] text-slate-600">+7</span>
                      </div>
                    </div>

                    {/* Right: Per-slot controls */}
                    <motion.div
                      className="hidden md:flex flex-col w-20 flex-shrink-0 bg-slate-800/50 rounded-lg border border-slate-700/30 p-1.5"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-2">Slot Controls</div>
                      {[
                        { icon: <SunDim className="w-3 h-3" />, label: 'W/L' },
                        { icon: <FlipHorizontal className="w-3 h-3" />, label: 'Flip H' },
                        { icon: <RotateCw className="w-3 h-3" />, label: 'Rotate' },
                        { icon: <Maximize2 className="w-3 h-3" />, label: 'Zoom' },
                        { icon: <Eye className="w-3 h-3" />, label: 'Invert' },
                        { icon: <Type className="w-3 h-3" />, label: 'Text' },
                        { icon: <Ruler className="w-3 h-3" />, label: 'Ruler' },
                      ].map(ctrl => (
                        <div key={ctrl.label} className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-slate-700/50 transition-colors">
                          <span className="text-slate-500">{ctrl.icon}</span>
                          <span className="text-[7px] text-slate-400">{ctrl.label}</span>
                        </div>
                      ))}
                      <div className="mt-auto pt-2 border-t border-slate-700/30">
                        <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Presets</div>
                        {['Brain', 'Bone', 'Lung'].map(p => (
                          <span key={p} className="block text-[7px] text-amber-400/60 py-0.5">{p}</span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === 'Booklet' && (
                  <motion.div key="booklet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[300px]">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {/* Left: Template config */}
                      <div className="bg-slate-800/50 rounded-lg border border-slate-700/30 p-3">
                        <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider mb-3">Booklet Settings</div>
                        {[
                          { label: 'Template', val: 'Standard CT Report' },
                          { label: 'Paper', val: 'A4 Portrait' },
                          { label: 'Grid', val: '2×3 images per page' },
                          { label: 'Margins', val: '10mm all' },
                          { label: 'Scaling', val: 'Fit to Cell' },
                          { label: 'Cover Page', val: 'Enabled' },
                          { label: 'Logo', val: 'hospital_logo.png' },
                          { label: 'Header', val: 'City Hospital' },
                          { label: 'Footer', val: 'Report #{accession}' },
                        ].map(field => (
                          <div key={field.label} className="flex justify-between py-1 border-b border-slate-700/30 last:border-0">
                            <span className="text-[8px] text-slate-500">{field.label}</span>
                            <span className="text-[8px] text-teal-400 font-mono">{field.val}</span>
                          </div>
                        ))}
                        <div className="mt-3 flex gap-2">
                          <span className="text-[8px] px-2 py-1 bg-teal-600 text-white rounded">Generate Preview</span>
                          <span className="text-[8px] px-2 py-1 bg-slate-700 text-slate-300 rounded border border-slate-600">Save Template</span>
                        </div>
                      </div>

                      {/* Right: PDF Preview */}
                      <div className="bg-white/10 rounded-lg border border-slate-700/30 p-3 flex flex-col items-center justify-center">
                        <FileText className="w-10 h-10 text-slate-600 mb-2" />
                        <div className="text-[10px] text-slate-400 font-medium">Live PDF Preview</div>
                        <div className="text-[8px] text-slate-600 mt-1">3 pages • 6 images • Cover + Report</div>
                        <div className="mt-3 grid grid-cols-3 gap-1 w-full max-w-[180px]">
                          {[1, 2, 3].map(p => (
                            <div key={p} className="aspect-[3/4] border border-slate-600/40 rounded bg-slate-800/50 flex items-center justify-center">
                              <span className="text-[7px] text-slate-500">p.{p}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[8px] text-slate-500 mt-2 flex gap-3">
                          <span>12 patient info fields</span>
                          <span>•</span>
                          <span>Resizable splitter</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Print' && (
                  <motion.div key="print" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[300px]">
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        {
                          title: 'PDF Export',
                          icon: <FileDown className="w-5 h-5" />,
                          items: ['300 DPI output', 'Multi-page PDF', 'Custom paper size', 'Overlay fields', 'Annotations embedded'],
                          color: 'text-emerald-400 bg-emerald-500/10',
                        },
                        {
                          title: 'DICOM Print',
                          icon: <Printer className="w-5 h-5" />,
                          items: ['SCP print server', 'Film size selection', 'Multi-copy support', 'Printer discovery', 'Status tracking'],
                          color: 'text-sky-400 bg-sky-500/10',
                        },
                        {
                          title: 'Batch Dispatch',
                          icon: <Layers className="w-5 h-5" />,
                          items: ['Queue management', 'Retry with backoff', 'Dead-letter queue', 'Windows GDI print', 'Delivery tracking'],
                          color: 'text-amber-400 bg-amber-500/10',
                        },
                      ].map(card => (
                        <motion.div
                          key={card.title}
                          className="bg-slate-800/50 rounded-lg border border-slate-700/30 p-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>{card.icon}</div>
                            <span className="text-[11px] font-bold text-slate-200">{card.title}</span>
                          </div>
                          <div className="space-y-1.5">
                            {card.items.map(item => (
                              <div key={item} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" />
                                <span className="text-[9px] text-slate-400">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </MockupFrame>
        </motion.div>

        {/* ═══ LAYOUTS STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center flex-wrap gap-3 mb-3">
            <h3 className="text-lg font-bold text-slate-900 mr-4">14 Layouts</h3>
            {FILM_LAYOUTS.map(l => (
              <span key={l.id} className="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-600 font-mono shadow-sm">{l.label}</span>
            ))}
          </div>
          <div className="flex items-center justify-center flex-wrap gap-3 mb-3">
            <h3 className="text-lg font-bold text-slate-900 mr-4">10 Film Sizes</h3>
            {FILM_SIZES.map(s => (
              <span key={s} className="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-600 font-mono shadow-sm">{s}</span>
            ))}
          </div>
          <div className="flex items-center justify-center flex-wrap gap-3">
            <h3 className="text-lg font-bold text-slate-900 mr-4">10 W/L Presets</h3>
            {WL_PRESETS.map(p => (
              <span key={p} className="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-600 shadow-sm">{p}</span>
            ))}
          </div>
        </motion.div>

        {/* ═══ FEATURES GRID ═══ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.06 }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${feat.color}`}>
                {feat.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
