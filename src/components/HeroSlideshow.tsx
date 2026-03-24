'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, Globe, Shield, Printer, GitBranch, IndianRupee, Lock,
  Monitor, Ruler, Layout, SunDim, Play,
  CheckCircle, Languages, Heart,
  FileText, BookOpen, Layers,
  Users, Database, Zap, Bell,
  Key, ServerCog, Wifi
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   HERO SLIDESHOW — Auto-cycling feature showcase slides
   ═══════════════════════════════════════════════════════════════ */

interface Slide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  content: React.ReactNode;
}

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
];

const COMPLIANCE_ITEMS = [
  { icon: <Shield className="w-4 h-4" />, name: 'HIPAA', desc: '45 CFR §164 — US Federal', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { icon: <Heart className="w-4 h-4" />, name: 'NABH', desc: 'Indian Hospital Accreditation', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
  { icon: <Wifi className="w-4 h-4" />, name: 'IHE', desc: 'SWF + ATNA + CT Profiles', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { icon: <Database className="w-4 h-4" />, name: 'DICOM PS3.15', desc: '120+ SOP, 45 Syntaxes', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { icon: <Lock className="w-4 h-4" />, name: 'ISO 27799', desc: 'Health Info Security', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  { icon: <Key className="w-4 h-4" />, name: 'India IT §43A', desc: 'SPDI Rules 2011', color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
];

/* ─── Slide Content Renderers ─── */

function ViewerSlide() {
  return (
    <div className="p-3">
      {/* Viewer toolbar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <Eye className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-white">DICOM Viewer</span>
          <span className="text-[8px] text-slate-600 font-mono">CT Chest — Kumar, S.</span>
        </div>
        <div className="flex gap-0.5">
          {['W/L', 'Zoom', 'Pan', 'Meas', 'ROI', 'Cine'].map((t, i) => (
            <span key={t} className={`text-[8px] px-1.5 py-0.5 rounded ${i === 0 ? 'bg-sky-600/80 text-white' : 'bg-[#161b22] text-slate-500 border border-[#21262d]'}`}>{t}</span>
          ))}
        </div>
      </div>
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-1">
        {[
          { label: 'Axial', wl: 'W:350 L:40', active: true },
          { label: 'Coronal', wl: 'W:350 L:40' },
          { label: 'Sagittal', wl: 'W:1500 L:-500' },
          { label: '3D MIP', wl: 'Slab: 20mm' },
        ].map((vp, i) => (
          <div key={vp.label} className={`relative bg-black rounded-lg aspect-[5/4] overflow-hidden border ${vp.active ? 'border-sky-500/50' : 'border-[#1e293b]'}`}>
            <div className="absolute inset-0" style={{
              background: i < 3
                ? `radial-gradient(ellipse at ${45+i*8}% 50%, rgba(150,160,175,0.18) 0%, rgba(80,90,100,0.08) 30%, rgba(10,14,23,0.95) 65%)`
                : `radial-gradient(ellipse at 50% 50%, rgba(120,180,200,0.12) 0%, rgba(10,14,23,0.95) 50%)`
            }} />
            <div className="absolute top-1 left-1.5 text-[8px] text-sky-400/70 font-mono">{vp.label}</div>
            <div className="absolute top-1 right-1.5 text-[7px] text-slate-600 font-mono">{vp.wl}</div>
            {vp.active && (
              <>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-sky-500/20" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-500/20" />
              </>
            )}
            {i === 0 && (
              <div className="absolute top-[35%] left-[20%] w-[55%]">
                <div className="h-px bg-yellow-400/50" />
                <div className="text-[7px] text-yellow-400/70 font-mono text-center mt-0.5">42.3 mm</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-1.5 px-1">
        <div className="flex gap-1">
          {['1×1', '1×2', '2×2', '3×3'].map((l, i) => (
            <span key={l} className={`text-[7px] px-1 py-0.5 rounded ${i === 2 ? 'bg-purple-600/60 text-white' : 'bg-[#161b22] text-slate-600 border border-[#21262d]'}`}>{l}</span>
          ))}
        </div>
        <div className="flex gap-1 text-[7px]">
          <span className="text-slate-600">30+ Tools</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-600">18 Panels</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-500/70 flex items-center gap-0.5"><span className="w-1 h-1 bg-emerald-500 rounded-full" />Live</span>
        </div>
      </div>
    </div>
  );
}

function LanguageSlide() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4 text-sky-400" />
        <span className="text-[11px] font-bold text-white">10 Languages — Full UI Translation</span>
        <span className="text-[9px] text-slate-500 ml-auto">3,153+ keys</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {LANGUAGES.map((lang, i) => (
          <motion.div
            key={lang.code}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all ${
              i === 0
                ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                : 'bg-[#161b22]/80 border-[#21262d] text-slate-400'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="text-sm">{lang.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold truncate">{lang.native}</div>
              <div className="text-[8px] text-slate-600">{lang.name}</div>
            </div>
            {i === 0 && <CheckCircle className="w-3 h-3 text-sky-400" />}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2.5 px-1">
        <span className="text-[8px] text-slate-500 flex items-center gap-1"><Languages className="w-3 h-3" /> react-i18next</span>
        <span className="text-[8px] text-slate-600">Auto-detect browser language</span>
        <span className="text-[8px] text-slate-600">Medical terminology preserved</span>
      </div>
    </div>
  );
}

function ComplianceSlide() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-emerald-400" />
        <span className="text-[11px] font-bold text-white">Medical Compliance & Security</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {COMPLIANCE_ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            className={`flex items-start gap-2 px-2.5 py-2.5 rounded-lg border ${item.color}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
            <div>
              <div className="text-[10px] font-bold">{item.name}</div>
              <div className="text-[8px] opacity-70">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5 mt-2.5">
        {[
          { icon: <Lock className="w-3 h-3" />, label: 'AES-256-GCM', sub: 'Field-level PHI' },
          { icon: <Key className="w-3 h-3" />, label: 'Ed25519 JWT', sub: '15-min tokens' },
          { icon: <ServerCog className="w-3 h-3" />, label: 'SHA-512 Audit', sub: '6-year chain' },
        ].map(item => (
          <div key={item.label} className="text-center px-2 py-1.5 rounded-lg bg-[#161b22] border border-[#21262d]">
            <div className="text-slate-500 flex justify-center mb-1">{item.icon}</div>
            <div className="text-[8px] font-bold text-slate-300">{item.label}</div>
            <div className="text-[7px] text-slate-600">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilmPrepSlide() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <Printer className="w-4 h-4 text-teal-400" />
        <span className="text-[11px] font-bold text-white">Film Preparation & Booklet</span>
        <span className="text-[9px] text-slate-500 ml-auto">14 layouts</span>
      </div>
      <div className="flex gap-2">
        {/* Mini canvas */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-1 bg-[#060810] rounded-lg p-1.5 border border-[#21262d]">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`aspect-[4/3] rounded border relative overflow-hidden ${i < 3 ? 'bg-[#0a0e17] border-slate-700/50' : 'bg-[#0a0e17]/50 border-dashed border-slate-800'}`}>
                {i < 3 && <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at ${40+i*20}% ${45+i*10}%, rgba(148,163,184,0.12) 0%, transparent 55%)` }} />}
                {i < 3 && <div className="absolute top-0.5 left-1 text-[6px] text-sky-400/60 font-mono">Img {i+1}</div>}
                {i === 3 && <div className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-700">Drop</div>}
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {['1×1', '2×2', '3×3', '4×4', '2×3', 'Focus'].map((l, i) => (
              <span key={l} className={`text-[7px] px-1 py-0.5 rounded ${i === 1 ? 'bg-teal-600/60 text-white' : 'bg-[#161b22] text-slate-600 border border-[#21262d]'}`}>{l}</span>
            ))}
          </div>
        </div>
        {/* Right panel */}
        <div className="w-28 space-y-1.5">
          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Features</div>
          {[
            { icon: <SunDim className="w-3 h-3" />, text: 'Per-slot W/L' },
            { icon: <Layout className="w-3 h-3" />, text: '10 film sizes' },
            { icon: <Ruler className="w-3 h-3" />, text: 'Annotations' },
            { icon: <BookOpen className="w-3 h-3" />, text: 'Auto-booklet' },
            { icon: <FileText className="w-3 h-3" />, text: 'PDF 300 DPI' },
            { icon: <Layers className="w-3 h-3" />, text: 'DICOM Print' },
          ].map(f => (
            <div key={f.text} className="flex items-center gap-1.5 text-[8px] text-slate-400">
              <span className="text-teal-500/70">{f.icon}</span>
              {f.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowSlide() {
  const stages = [
    { label: 'Registered', phase: 'reg', color: 'bg-sky-500' },
    { label: 'In Queue', phase: 'reg', color: 'bg-sky-500' },
    { label: 'Checked In', phase: 'img', color: 'bg-teal-500' },
    { label: 'Acquired', phase: 'img', color: 'bg-teal-500' },
    { label: 'Ingested', phase: 'img', color: 'bg-teal-500' },
    { label: 'Reviewing', phase: 'rpt', color: 'bg-purple-500' },
    { label: 'Drafted', phase: 'rpt', color: 'bg-purple-500' },
    { label: 'Verified', phase: 'rpt', color: 'bg-purple-500' },
    { label: 'Booklet', phase: 'dsp', color: 'bg-emerald-500' },
    { label: 'Printed', phase: 'dsp', color: 'bg-emerald-500' },
    { label: 'Shared', phase: 'dsp', color: 'bg-emerald-500' },
    { label: 'Submitted', phase: 'dsp', color: 'bg-emerald-500' },
    { label: 'Paid', phase: 'bil', color: 'bg-amber-500' },
    { label: 'Archived', phase: 'arc', color: 'bg-slate-500' },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <GitBranch className="w-4 h-4 text-emerald-400" />
        <span className="text-[11px] font-bold text-white">14-Stage Study Lifecycle</span>
        <span className="text-[9px] text-slate-500 ml-auto">Real-time WebSocket</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className={`w-5 h-5 rounded-full ${s.color} flex items-center justify-center text-[7px] font-bold text-white shadow-md`}>
              {i + 1}
            </div>
            <div className="text-[6px] text-slate-500 mt-1 text-center leading-tight">{s.label}</div>
          </motion.div>
        ))}
      </div>
      {/* Phase bar */}
      <div className="flex gap-0 mt-3 rounded-lg overflow-hidden border border-[#21262d]">
        {[
          { label: 'Registration', color: 'bg-sky-500/10 text-sky-400', count: 2 },
          { label: 'Imaging', color: 'bg-teal-500/10 text-teal-400', count: 3 },
          { label: 'Reporting', color: 'bg-purple-500/10 text-purple-400', count: 3 },
          { label: 'Distribution', color: 'bg-emerald-500/10 text-emerald-400', count: 4 },
          { label: 'Billing', color: 'bg-amber-500/10 text-amber-400', count: 1 },
          { label: 'Archive', color: 'bg-slate-500/10 text-slate-400', count: 1 },
        ].map(p => (
          <div key={p.label} className={`flex-1 py-1.5 text-center text-[7px] font-bold ${p.color} border-r border-[#21262d] last:border-0`}>
            {p.label}
          </div>
        ))}
      </div>
      {/* Features */}
      <div className="flex gap-3 mt-2.5 px-1">
        {[
          { icon: <Users className="w-3 h-3" />, text: 'Role-based gates' },
          { icon: <Bell className="w-3 h-3" />, text: 'WebSocket updates' },
          { icon: <Zap className="w-3 h-3" />, text: 'Auto-progression' },
        ].map(f => (
          <span key={f.text} className="text-[8px] text-slate-500 flex items-center gap-1">
            <span className="text-emerald-500/60">{f.icon}</span>{f.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function BillingSlide() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <IndianRupee className="w-4 h-4 text-amber-400" />
        <span className="text-[11px] font-bold text-white">Billing & Revenue</span>
        <span className="text-[9px] text-slate-500 ml-auto">GST + E-Invoice</span>
      </div>
      {/* Mini invoice mockup */}
      <div className="bg-[#161b22]/80 rounded-lg border border-[#21262d] p-2.5 mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] font-bold text-white">INV-20260324-001</span>
          <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Paid</span>
        </div>
        <div className="space-y-1">
          {[
            ['CT Scan — Chest', '₹3,500'],
            ['MRI Brain — Plain', '₹6,000'],
            ['X-Ray — Chest PA', '₹500'],
          ].map(([item, price]) => (
            <div key={item} className="flex justify-between text-[8px]">
              <span className="text-slate-400">{item}</span>
              <span className="text-slate-300 font-mono">{price}</span>
            </div>
          ))}
          <div className="border-t border-[#21262d] pt-1 mt-1">
            <div className="flex justify-between text-[8px]">
              <span className="text-slate-500">CGST (9%)</span><span className="text-slate-500 font-mono">₹900</span>
            </div>
            <div className="flex justify-between text-[8px]">
              <span className="text-slate-500">SGST (9%)</span><span className="text-slate-500 font-mono">₹900</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold mt-1">
              <span className="text-white">Total</span><span className="text-amber-400 font-mono">₹11,800</span>
            </div>
          </div>
        </div>
      </div>
      {/* Payment modes */}
      <div className="flex gap-1 flex-wrap">
        {['Cash', 'Card', 'UPI', 'Razorpay', 'PayU', 'Insurance', 'Cheque'].map(m => (
          <span key={m} className="text-[7px] px-1.5 py-0.5 bg-[#161b22] text-slate-500 rounded border border-[#21262d]">{m}</span>
        ))}
      </div>
      <div className="flex gap-3 mt-2 px-1">
        {['GST Returns', 'E-Invoice (NIC)', 'PCPNDT Tracking', 'TDS Reports'].map(f => (
          <span key={f} className="text-[8px] text-amber-400/60 flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />{f}</span>
        ))}
      </div>
    </div>
  );
}

function EnterpriseSlide() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-3">
        <Monitor className="w-4 h-4 text-purple-400" />
        <span className="text-[11px] font-bold text-white">Enterprise Platform</span>
        <span className="text-[9px] text-slate-500 ml-auto">5 Tiers</span>
      </div>
      <div className="grid grid-cols-5 gap-1 mb-3">
        {[
          { name: 'T1 Billing', color: 'from-blue-600 to-blue-800' },
          { name: 'T2 PACS', color: 'from-teal-600 to-teal-800' },
          { name: 'T3 Radiology', color: 'from-purple-600 to-purple-800' },
          { name: 'T4 Enterprise', color: 'from-amber-600 to-amber-800' },
          { name: 'T5 Billing+PACS', color: 'from-emerald-600 to-emerald-800' },
        ].map(t => (
          <div key={t.name} className={`py-2 rounded-lg bg-gradient-to-br ${t.color} text-center`}>
            <div className="text-[8px] font-bold text-white">{t.name.split(' ')[0]}</div>
            <div className="text-[6px] text-white/60">{t.name.split(' ').slice(1).join(' ')}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: <Users className="w-3.5 h-3.5" />, val: '9', label: 'User Roles', color: 'text-sky-400' },
          { icon: <Lock className="w-3.5 h-3.5" />, val: '70+', label: 'Permissions', color: 'text-emerald-400' },
          { icon: <Database className="w-3.5 h-3.5" />, val: '10', label: 'Modules', color: 'text-purple-400' },
          { icon: <ServerCog className="w-3.5 h-3.5" />, val: '7', label: 'BG Services', color: 'text-amber-400' },
          { icon: <Wifi className="w-3.5 h-3.5" />, val: 'Live', label: 'WebSocket', color: 'text-rose-400' },
          { icon: <Play className="w-3.5 h-3.5" />, val: 'Auto', label: 'Self-Healing', color: 'text-teal-400' },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#161b22] border border-[#21262d]">
            <span className={s.color}>{s.icon}</span>
            <div>
              <div className="text-[10px] font-bold text-white">{s.val}</div>
              <div className="text-[7px] text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 text-center text-[8px] text-slate-500">
        Multi-branch • Redis Pub/Sub • AES-256-GCM • Ed25519 JWT • PostgreSQL + SQLite
      </div>
    </div>
  );
}

/* ─── Slides Array ─── */
const SLIDES: Slide[] = [
  {
    id: 'viewer',
    badge: 'DICOM Viewer',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    title: '30+ measurement & diagnostic tools',
    content: <ViewerSlide />,
  },
  {
    id: 'language',
    badge: '10 Languages',
    badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    title: 'Full UI in 10 Indian languages',
    content: <LanguageSlide />,
  },
  {
    id: 'compliance',
    badge: 'Compliance',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    title: '6 medical compliance standards',
    content: <ComplianceSlide />,
  },
  {
    id: 'filmpep',
    badge: 'Film Prep',
    badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    title: 'Compose, annotate & print at 300 DPI',
    content: <FilmPrepSlide />,
  },
  {
    id: 'workflow',
    badge: 'Workflow',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    title: 'Registration to archive in 14 stages',
    content: <WorkflowSlide />,
  },
  {
    id: 'billing',
    badge: 'Billing',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    title: 'GST, E-Invoice, Razorpay & more',
    content: <BillingSlide />,
  },
  {
    id: 'enterprise',
    badge: 'Enterprise',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    title: '5 tiers • 10 modules • 9 roles',
    content: <EnterpriseSlide />,
  },
];

const SLIDE_INTERVAL = 5000; // 5 seconds per slide

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = SLIDES[current];

  return (
    <div
      className="rounded-2xl overflow-hidden border border-[#21262d] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161b22] border-b border-[#21262d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0d1117] rounded-lg text-[11px] text-slate-500 border border-[#21262d] font-mono">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            app.dicoflow.com
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div className="bg-[#0a0e17] min-h-[380px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="bg-[#0d1117] border-t border-[#21262d] px-3 py-2.5">
        {/* Progress dots & label */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === current ? 28 : 8 }}
              >
                <div className={`absolute inset-0 rounded-full ${i === current ? 'bg-sky-500/30' : 'bg-[#21262d]'}`} />
                {i === current && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-sky-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: isPaused ? 99999 : SLIDE_INTERVAL / 1000, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${slide.badgeColor}`}>{slide.badge}</span>
          <span className="text-[9px] text-slate-500 flex-1 truncate">{slide.title}</span>
          <span className="text-[9px] text-slate-600">{current + 1}/{SLIDES.length}</span>
        </div>
      </div>
    </div>
  );
}
