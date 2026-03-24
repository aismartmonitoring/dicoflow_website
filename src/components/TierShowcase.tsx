'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIERS, TIER_COLORS } from '@/lib/constants';
import { sectionReveal } from '@/lib/animations';
import {
  Receipt, MonitorDot, Stethoscope, Building2, Merge,
  Check, ChevronLeft, ChevronRight, Star, ArrowRight,
  BarChart3, CreditCard, FileText, Users, Bell, Search,
  Eye, Clock, Activity, Shield, Maximize2, MoreHorizontal,
  Wifi, HardDrive, Settings, Filter, RefreshCw,
  Layers, Zap, AlertTriangle, TrendingUp, PieChart, Globe,
  Landmark, Printer, Send, BookOpen, FolderOpen, UserCheck,
  CalendarDays, LayoutGrid, Share2,
  Download, Lock, CheckCircle, XCircle, Clipboard
} from 'lucide-react';
import type { TierId } from '@/lib/types';

const TIER_ICONS: Record<TierId, React.ReactNode> = {
  T1: <Receipt className="w-5 h-5" />,
  T2: <MonitorDot className="w-5 h-5" />,
  T3: <Stethoscope className="w-5 h-5" />,
  T4: <Building2 className="w-5 h-5" />,
  T5: <Merge className="w-5 h-5" />,
};

/* ─────────────────────────────────────────────────
   Shared: Animated Progress Bar
───────────────────────────────────────────────────── */
function AnimBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  return (
    <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
      <motion.div className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
        transition={{ delay, duration: 0.6, ease: 'easeOut' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   T1 — Billing Dashboard (Real DicoFlow UI)
   Matches: /app/dashboard (FrontDesk role) +
            /app/billing (Create Invoice + Invoice History)
───────────────────────────────────────────────────── */
function T1Mockup() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden text-white h-[480px] flex text-[11px]">
      {/* Sidebar — matches real DicoFlow sidebar for billing role */}
      <div className="w-[180px] bg-[#161b22] border-r border-[#21262d] flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-[#21262d] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Receipt className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">DicoFlow</div>
            <div className="text-[9px] text-slate-500">Billing</div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {[
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Dashboard', active: true },
            { icon: <Users className="w-3.5 h-3.5" />, label: 'Patients' },
            { icon: <Receipt className="w-3.5 h-3.5" />, label: 'Billing', badge: '3' },
            { icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Discount Approvals' },
            { icon: <XCircle className="w-3.5 h-3.5" />, label: 'Cancel Approvals' },
            { icon: <Clipboard className="w-3.5 h-3.5" />, label: 'PCPNDT Register' },
            { icon: <FolderOpen className="w-3.5 h-3.5" />, label: 'Orders' },
            { icon: <Settings className="w-3.5 h-3.5" />, label: 'Settings' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2.5 px-3 py-[7px] rounded-md transition-all ${
              item.active
                ? 'bg-blue-600/15 text-blue-400 border-l-2 border-blue-400 -ml-0.5 pl-[10px]'
                : 'text-slate-400 hover:bg-[#1c2128] hover:text-slate-300'
            }`}>
              {item.icon}
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-bold">{item.badge}</span>
              )}
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-[#21262d]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">FD</div>
            <div>
              <div className="text-[10px] font-medium text-slate-300">Front Desk</div>
              <div className="text-[9px] text-slate-600">BillingClerk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#161b22] border-b border-[#21262d]">
          <div className="flex items-center gap-3">
            <h2 className="text-[13px] font-semibold text-white">Revenue Dashboard</h2>
            <span className="text-[10px] text-slate-500">March 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1c2128] rounded-lg text-slate-500 text-[10px] border border-[#21262d]">
              <Search className="w-3 h-3" /> Search invoices...
            </div>
            <Bell className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Today\'s Revenue', value: '₹1,84,250', change: '+12.4%', icon: <TrendingUp className="w-3.5 h-3.5" />, color: 'text-blue-400', bg: 'bg-blue-500/8', border: 'border-blue-500/20' },
              { label: 'Total Invoices', value: '347', change: '+8', icon: <FileText className="w-3.5 h-3.5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20' },
              { label: 'Pending Amount', value: '₹2,15,000', change: '23 bills', icon: <Clock className="w-3.5 h-3.5" />, color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20' },
              { label: 'Collection Rate', value: '93.2%', change: '+2.1%', icon: <PieChart className="w-3.5 h-3.5" />, color: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/20' },
            ].map((s, i) => (
              <motion.div key={s.label}
                className={`${s.bg} rounded-xl p-3.5 border ${s.border}`}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">{s.label}</span>
                  <span className={s.color}>{s.icon}</span>
                </div>
                <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[9px] text-emerald-500 mt-1 font-medium">{s.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart + Recent Invoices */}
          <div className="grid grid-cols-5 gap-3">
            {/* Revenue Chart */}
            <div className="col-span-3 bg-[#161b22] rounded-xl p-4 border border-[#21262d]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-slate-300">Monthly Revenue Trend</span>
                <div className="flex gap-1">
                  {['7D', '1M', '3M', '1Y'].map((p, i) => (
                    <span key={p} className={`text-[9px] px-2 py-0.5 rounded ${i === 1 ? 'bg-blue-600/20 text-blue-400' : 'text-slate-600'}`}>{p}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-[3px] h-[100px]">
                {[35, 42, 38, 55, 48, 62, 58, 70, 65, 75, 82, 78, 88, 95, 72, 85, 90, 68, 80, 92, 88, 95, 78, 84, 90, 87, 93, 88, 96, 92].map((h, i) => (
                  <motion.div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-600/80 to-blue-400/60"
                    initial={{ height: 0 }} animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.03, duration: 0.3, ease: 'easeOut' }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[8px] text-slate-600">1 Mar</span>
                <span className="text-[8px] text-slate-600">15 Mar</span>
                <span className="text-[8px] text-slate-600">30 Mar</span>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="col-span-2 bg-[#161b22] rounded-xl p-4 border border-[#21262d]">
              <span className="text-[11px] font-semibold text-slate-300">Revenue by Modality</span>
              <div className="mt-3 space-y-2.5">
                {[
                  { mod: 'CT Scan', amount: '₹6.2L', pct: 85, color: 'bg-blue-500' },
                  { mod: 'MRI', amount: '₹4.8L', pct: 68, color: 'bg-purple-500' },
                  { mod: 'X-Ray', amount: '₹3.1L', pct: 45, color: 'bg-teal-500' },
                  { mod: 'Ultrasound', amount: '₹2.4L', pct: 35, color: 'bg-amber-500' },
                  { mod: 'Mammography', amount: '₹1.9L', pct: 28, color: 'bg-pink-500' },
                ].map((m, i) => (
                  <div key={m.mod}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-slate-400">{m.mod}</span>
                      <span className="text-[10px] font-medium text-slate-300">{m.amount}</span>
                    </div>
                    <AnimBar pct={m.pct} color={m.color} delay={0.6 + i * 0.1} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Invoice History Table */}
          <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#21262d]">
              <span className="text-[11px] font-semibold text-slate-300">Recent Invoices</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] px-2 py-0.5 bg-blue-600/15 text-blue-400 rounded cursor-pointer">+ Create Invoice</span>
                <span className="text-[9px] text-slate-500 cursor-pointer">View All →</span>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 px-4 py-2 border-b border-[#21262d] text-[9px] font-medium text-slate-500 uppercase tracking-wider">
              <div className="col-span-2">Invoice #</div>
              <div className="col-span-2">Patient</div>
              <div className="col-span-2">Phone</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Total</div>
              <div className="col-span-1">Paid</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Balance</div>
              <div className="col-span-1">Actions</div>
            </div>
            {[
              { id: 'INV-20260324-047', patient: 'Sharma, Rajesh', phone: '98765-43210', date: '24 Mar', total: '₹3,500', paid: '₹3,500', status: 'Paid', sColor: 'text-emerald-400 bg-emerald-500/10', balance: '₹0' },
              { id: 'INV-20260324-046', patient: 'Kumar, Anita', phone: '87654-32109', date: '24 Mar', total: '₹7,200', paid: '₹4,000', status: 'Partial', sColor: 'text-amber-400 bg-amber-500/10', balance: '₹3,200' },
              { id: 'INV-20260324-045', patient: 'Patel, Meera', phone: '76543-21098', date: '24 Mar', total: '₹4,800', paid: '₹4,800', status: 'Paid', sColor: 'text-emerald-400 bg-emerald-500/10', balance: '₹0' },
              { id: 'INV-20260324-044', patient: 'Singh, Priya', phone: '65432-10987', date: '23 Mar', total: '₹12,500', paid: '₹0', status: 'Pending', sColor: 'text-red-400 bg-red-500/10', balance: '₹12,500' },
            ].map((inv, i) => (
              <motion.div key={inv.id}
                className="grid grid-cols-12 gap-1 px-4 py-2 border-b border-[#21262d]/50 hover:bg-[#1c2128] transition-colors"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}>
                <div className="col-span-2 font-mono text-[10px] text-blue-400">{inv.id}</div>
                <div className="col-span-2 text-[10px] text-slate-300 font-medium">{inv.patient}</div>
                <div className="col-span-2 text-[10px] text-slate-500 font-mono">{inv.phone}</div>
                <div className="col-span-1 text-[10px] text-slate-500">{inv.date}</div>
                <div className="col-span-1 text-[10px] text-slate-300 font-medium">{inv.total}</div>
                <div className="col-span-1 text-[10px] text-slate-400">{inv.paid}</div>
                <div className="col-span-1"><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${inv.sColor}`}>{inv.status}</span></div>
                <div className="col-span-1 text-[10px] text-slate-400">{inv.balance}</div>
                <div className="col-span-1 flex gap-1">
                  <Eye className="w-3 h-3 text-slate-500 cursor-pointer hover:text-blue-400" />
                  <CreditCard className="w-3 h-3 text-slate-500 cursor-pointer hover:text-emerald-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   T2 — PACS Study Browser + DICOM Viewer (Real UI)
   Matches: /app/pacs/studies + /app/viewer/:studyId
───────────────────────────────────────────────────── */
function T2Mockup() {
  return (
    <div className="bg-[#0a0e17] rounded-lg overflow-hidden text-white h-[480px] flex text-[11px]">
      {/* Sidebar */}
      <div className="w-[180px] bg-[#111827] border-r border-[#1e293b] flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-[#1e293b] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <MonitorDot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">DicoFlow</div>
            <div className="text-[9px] text-slate-500">PACS</div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {[
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Dashboard' },
            { icon: <Users className="w-3.5 h-3.5" />, label: 'Patients' },
            { icon: <FolderOpen className="w-3.5 h-3.5" />, label: 'Studies', active: true },
            { icon: <Eye className="w-3.5 h-3.5" />, label: 'DICOM Viewer' },
            { icon: <Activity className="w-3.5 h-3.5" />, label: 'Activity Log' },
            { icon: <HardDrive className="w-3.5 h-3.5" />, label: 'Storage' },
            { icon: <Wifi className="w-3.5 h-3.5" />, label: 'SCP Servers' },
            { icon: <AlertTriangle className="w-3.5 h-3.5" />, label: 'Unmatched' },
            { icon: <Share2 className="w-3.5 h-3.5" />, label: 'Share Links' },
            { icon: <Settings className="w-3.5 h-3.5" />, label: 'Settings' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2.5 px-3 py-[7px] rounded-md transition-all ${
              item.active
                ? 'bg-teal-600/15 text-teal-400 border-l-2 border-teal-400 -ml-0.5 pl-[10px]'
                : 'text-slate-400 hover:bg-[#1c2128]'
            }`}>
              {item.icon}
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-[#1e293b]">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-teal-900/20 rounded-lg border border-teal-800/30">
            <Wifi className="w-3 h-3 text-teal-400" />
            <div>
              <div className="text-[9px] text-teal-400 font-medium">SCP Online</div>
              <div className="text-[8px] text-slate-600">AE: DICOFLOW | :11112</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main — Study Browser */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar with filters */}
        <div className="px-4 py-2.5 bg-[#111827] border-b border-[#1e293b]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-semibold text-white">PACS Study Browser</h2>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-teal-400 flex items-center gap-1"><HardDrive className="w-3 h-3" /> 2.4 TB / 4 TB</span>
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0a0e17] rounded-lg text-[10px] text-slate-500 border border-[#1e293b]">
              <Search className="w-3 h-3" /> Search patient name, study ID, accession...
            </div>
            <div className="flex items-center gap-1 text-[9px]">
              <span className="px-2 py-1 bg-[#0a0e17] border border-[#1e293b] rounded text-slate-400 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Date Range</span>
              <span className="px-2 py-1 bg-[#0a0e17] border border-[#1e293b] rounded text-slate-400 flex items-center gap-1"><Filter className="w-3 h-3" /> Modality</span>
              <span className="px-2 py-1 bg-[#0a0e17] border border-[#1e293b] rounded text-slate-400 flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> Table</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[60px_minmax(0,1fr)_50px_50px_100px_minmax(0,1.2fr)_80px_70px_80px_50px_60px] gap-1 px-4 py-2 border-b border-[#1e293b] text-[8px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0 bg-[#0d1117]">
            <div>Study ID</div><div>Patient Name</div><div>Age</div><div>Sex</div><div>Study Date</div><div>Description</div><div>Modality</div><div>Series</div><div>Stage</div><div>Imgs</div><div>Action</div>
          </div>
          {[
            { id: 'STU-4821', patient: 'Sharma, Rajesh', age: '45', sex: 'M', date: '24 Mar 09:24', desc: 'CT Chest W/Contrast', mod: 'CT', series: 4, stage: 'Received', stageColor: 'text-sky-400 bg-sky-500/10', imgs: 342 },
            { id: 'STU-4820', patient: 'Gupta, Anita', age: '38', sex: 'F', date: '24 Mar 09:45', desc: 'MRI Brain W/WO Contrast', mod: 'MRI', series: 6, stage: 'Reviewing', stageColor: 'text-yellow-400 bg-yellow-500/10', imgs: 186 },
            { id: 'STU-4819', patient: 'Singh, Priya', age: '52', sex: 'F', date: '24 Mar 10:12', desc: 'X-Ray Chest PA Lateral', mod: 'XR', series: 1, stage: 'Verified', stageColor: 'text-emerald-400 bg-emerald-500/10', imgs: 2 },
            { id: 'STU-4818', patient: 'Kumar, Vikram', age: '61', sex: 'M', date: '24 Mar 10:30', desc: 'US Abdomen Complete', mod: 'US', series: 3, stage: 'Acquired', stageColor: 'text-teal-400 bg-teal-500/10', imgs: 48 },
            { id: 'STU-4817', patient: 'Patel, Meera', age: '44', sex: 'F', date: '24 Mar 11:05', desc: 'Mammography Bilateral', mod: 'MG', series: 2, stage: 'Received', stageColor: 'text-sky-400 bg-sky-500/10', imgs: 8 },
            { id: 'STU-4816', patient: 'Reddy, Suresh', age: '55', sex: 'M', date: '24 Mar 11:28', desc: 'CT Abdomen Pelvis W/Contrast', mod: 'CT', series: 5, stage: 'Archived', stageColor: 'text-slate-400 bg-slate-500/10', imgs: 456 },
            { id: 'STU-4815', patient: 'Desai, Mohan', age: '29', sex: 'M', date: '24 Mar 11:45', desc: 'MRI Lumbar Spine', mod: 'MRI', series: 4, stage: 'Received', stageColor: 'text-sky-400 bg-sky-500/10', imgs: 124 },
          ].map((row, i) => (
            <motion.div key={row.id}
              className={`grid grid-cols-[60px_minmax(0,1fr)_50px_50px_100px_minmax(0,1.2fr)_80px_70px_80px_50px_60px] gap-1 px-4 py-2 border-b border-[#1e293b]/40 hover:bg-[#161b22] cursor-pointer transition-colors ${i === 0 ? 'bg-teal-900/10' : ''}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.06 }}>
              <div className="font-mono text-[10px] text-teal-400">{row.id}</div>
              <div className="text-[10px] text-slate-200 font-medium truncate">{row.patient}</div>
              <div className="text-[10px] text-slate-500">{row.age}Y</div>
              <div className="text-[10px] text-slate-500">{row.sex}</div>
              <div className="text-[10px] text-slate-500 font-mono">{row.date}</div>
              <div className="text-[10px] text-slate-400 truncate">{row.desc}</div>
              <div><span className="text-[9px] px-1.5 py-0.5 bg-[#1e293b] rounded font-mono text-slate-400">{row.mod}</span></div>
              <div className="text-[10px] text-slate-500">{row.series} series</div>
              <div><span className={`text-[9px] px-1.5 py-0.5 rounded-full ${row.stageColor} font-medium`}>{row.stage}</span></div>
              <div className="text-[10px] text-slate-500 font-mono">{row.imgs}</div>
              <div className="flex gap-1.5">
                <Eye className="w-3 h-3 text-teal-400 cursor-pointer" />
                <Download className="w-3 h-3 text-slate-500 cursor-pointer" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom status */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#111827] border-t border-[#1e293b] text-[9px]">
          <div className="flex items-center gap-3 text-slate-500">
            <span>7 of 1,247 studies</span>
            <span>Page 1 of 63</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-teal-600 text-white rounded text-[8px]">1</span>
            <span className="px-1.5 py-0.5 text-slate-500 rounded text-[8px]">2</span>
            <span className="px-1.5 py-0.5 text-slate-500 rounded text-[8px]">3</span>
            <span className="text-slate-600">...</span>
            <span className="px-1.5 py-0.5 text-slate-500 rounded text-[8px]">63</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   T3 — Radiologist Workstation (Real UI)
   Matches: /app/workstation (Unified Worklist + Reports)
            + /app/report-editor (Split-panel TipTap)
───────────────────────────────────────────────────── */
function T3Mockup() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden text-white h-[480px] flex text-[11px]">
      {/* Sidebar */}
      <div className="w-[180px] bg-[#161b22] border-r border-[#21262d] flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-[#21262d] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <Stethoscope className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">DicoFlow</div>
            <div className="text-[9px] text-slate-500">Radiology</div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {[
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Dashboard' },
            { icon: <Users className="w-3.5 h-3.5" />, label: 'Patients' },
            { icon: <FolderOpen className="w-3.5 h-3.5" />, label: 'Studies' },
            { icon: <Clipboard className="w-3.5 h-3.5" />, label: 'Workstation', active: true },
            { icon: <FileText className="w-3.5 h-3.5" />, label: 'Reports' },
            { icon: <Eye className="w-3.5 h-3.5" />, label: 'DICOM Viewer' },
            { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Report Editor' },
            { icon: <Printer className="w-3.5 h-3.5" />, label: 'Film Prep' },
            { icon: <Send className="w-3.5 h-3.5" />, label: 'Dispatch' },
            { icon: <Settings className="w-3.5 h-3.5" />, label: 'Settings' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2.5 px-3 py-[7px] rounded-md transition-all ${
              item.active
                ? 'bg-purple-600/15 text-purple-400 border-l-2 border-purple-400 -ml-0.5 pl-[10px]'
                : 'text-slate-400 hover:bg-[#1c2128]'
            }`}>
              {item.icon}
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main — Radiologist Workstation */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar with tabs */}
        <div className="px-5 pt-3 pb-0 bg-[#161b22] border-b border-[#21262d]">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[13px] font-semibold text-white">Radiologist Workstation</h2>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-amber-400 flex items-center gap-1"><Clock className="w-3 h-3" /> 8 pending</span>
              <Bell className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-0">
            <button className="px-4 py-2 text-[11px] font-medium text-purple-400 border-b-2 border-purple-400 bg-purple-500/5">Worklist</button>
            <button className="px-4 py-2 text-[11px] font-medium text-slate-500 hover:text-slate-300">Reports</button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Stats Ribbon */}
          <div className="flex items-center gap-2">
            {[
              { label: 'Received', count: 12, color: 'bg-sky-500/15 text-sky-400 border-sky-500/25' },
              { label: 'Under Review', count: 5, color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' },
              { label: 'Report Draft', count: 3, color: 'bg-purple-500/15 text-purple-400 border-purple-500/25' },
              { label: 'Verified', count: 18, color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
              { label: 'Total Today', count: 38, color: 'bg-slate-500/15 text-slate-400 border-slate-500/25' },
            ].map(s => (
              <motion.span key={s.label}
                className={`text-[10px] px-3 py-1.5 rounded-lg border font-medium ${s.color}`}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + Math.random() * 0.2 }}>
                {s.label}: <span className="font-bold">{s.count}</span>
              </motion.span>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#161b22] rounded-lg text-[10px] text-slate-500 border border-[#21262d]">
              <Search className="w-3 h-3" /> Search patient, study ID, accession number...
            </div>
            <span className="text-[9px] px-2 py-1.5 bg-[#161b22] border border-[#21262d] rounded-lg text-slate-500">Priority ▾</span>
            <span className="text-[9px] px-2 py-1.5 bg-[#161b22] border border-[#21262d] rounded-lg text-slate-500">Modality ▾</span>
          </div>

          {/* Worklist Table — exact columns from real workstation */}
          <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
            <div className="grid grid-cols-[65px_minmax(0,1fr)_50px_65px_85px_95px_60px_50px] gap-1 px-3.5 py-2 border-b border-[#21262d] text-[8px] font-semibold text-slate-500 uppercase tracking-wider">
              <div>Study ID</div><div>Patient</div><div>Mod</div><div>Priority</div><div>Stage</div><div>Received</div><div>TAT</div><div>Actions</div>
            </div>
            {[
              { id: 'STU-4821', patient: 'Sharma, Rajesh', mod: 'CT', priority: 'STAT', pColor: 'text-red-400 bg-red-500/15', stage: 'UNDER REVIEW', sColor: 'text-yellow-400 bg-yellow-500/10', time: '09:24 AM', tat: '32m', tatC: 'text-slate-400' },
              { id: 'STU-4820', patient: 'Gupta, Anita', mod: 'MRI', priority: 'Urgent', pColor: 'text-amber-400 bg-amber-500/15', stage: 'REPORT DRAFT', sColor: 'text-purple-400 bg-purple-500/10', time: '09:45 AM', tat: '48m', tatC: 'text-amber-400' },
              { id: 'STU-4819', patient: 'Kumar, Sunil', mod: 'XR', priority: 'Routine', pColor: 'text-slate-400 bg-slate-500/15', stage: 'VERIFIED', sColor: 'text-emerald-400 bg-emerald-500/10', time: '10:12 AM', tat: '22m', tatC: 'text-emerald-400' },
              { id: 'STU-4818', patient: 'Singh, Priya', mod: 'US', priority: 'Routine', pColor: 'text-slate-400 bg-slate-500/15', stage: 'RECEIVED', sColor: 'text-sky-400 bg-sky-500/10', time: '10:30 AM', tat: '—', tatC: 'text-slate-600' },
              { id: 'STU-4817', patient: 'Patel, Meera', mod: 'CT', priority: 'Urgent', pColor: 'text-amber-400 bg-amber-500/15', stage: 'VERIFIED', sColor: 'text-emerald-400 bg-emerald-500/10', time: '11:05 AM', tat: '35m', tatC: 'text-emerald-400' },
              { id: 'STU-4816', patient: 'Desai, Mohan', mod: 'MRI', priority: 'Routine', pColor: 'text-slate-400 bg-slate-500/15', stage: 'SHARED', sColor: 'text-blue-400 bg-blue-500/10', time: '11:28 AM', tat: '41m', tatC: 'text-slate-400' },
              { id: 'STU-4815', patient: 'Reddy, Lakshmi', mod: 'MG', priority: 'Routine', pColor: 'text-slate-400 bg-slate-500/15', stage: 'PRINTED', sColor: 'text-teal-400 bg-teal-500/10', time: '11:50 AM', tat: '28m', tatC: 'text-emerald-400' },
            ].map((row, i) => (
              <motion.div key={row.id}
                className={`grid grid-cols-[65px_minmax(0,1fr)_50px_65px_85px_95px_60px_50px] gap-1 px-3.5 py-2 border-b border-[#21262d]/40 hover:bg-[#1c2128] transition-colors ${i === 0 ? 'bg-purple-900/8' : ''}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.06 }}>
                <div className="font-mono text-[10px] text-purple-400">{row.id}</div>
                <div className="text-[10px] text-slate-200 font-medium truncate">{row.patient}</div>
                <div><span className="text-[9px] px-1 py-0.5 bg-[#1e293b] rounded font-mono text-slate-400">{row.mod}</span></div>
                <div><span className={`text-[9px] px-1.5 py-0.5 rounded ${row.pColor} font-medium`}>{row.priority}</span></div>
                <div><span className={`text-[8px] px-1.5 py-0.5 rounded-full ${row.sColor} font-mono`}>{row.stage}</span></div>
                <div className="text-[10px] text-slate-500 font-mono">{row.time}</div>
                <div className={`text-[10px] font-mono font-medium ${row.tatC}`}>{row.tat}</div>
                <div className="flex gap-1.5 items-center">
                  <Eye className="w-3 h-3 text-purple-400 cursor-pointer" />
                  <FileText className="w-3 h-3 text-slate-500 cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom info */}
          <div className="flex items-center justify-between text-[9px] text-slate-500">
            <span>7 of 46 studies • Auto-refresh: 15s</span>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-purple-400" />
              <span className="text-purple-400">Report lock active: STU-4821 (Dr. Priya M.)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   T4 — Enterprise Admin Dashboard (Real UI)
   Matches: /app/admin/system + /app/admin/revenue
            + SLA Dashboard + Multi-branch
───────────────────────────────────────────────────── */
function T4Mockup() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden text-white h-[480px] flex text-[11px]">
      {/* Sidebar — Full enterprise sidebar with all sections */}
      <div className="w-[180px] bg-[#161b22] border-r border-[#21262d] flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-[#21262d] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">DicoFlow</div>
            <div className="text-[9px] text-amber-400 font-medium">Enterprise</div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          <div className="text-[8px] text-slate-600 uppercase tracking-wider font-bold px-3 py-1.5">Workflow</div>
          {[
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Dashboard', active: true },
            { icon: <Users className="w-3.5 h-3.5" />, label: 'Patients' },
            { icon: <FolderOpen className="w-3.5 h-3.5" />, label: 'Worklist' },
            { icon: <Clipboard className="w-3.5 h-3.5" />, label: 'Workstation' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2.5 px-3 py-[6px] rounded-md text-[10px] ${
              item.active ? 'bg-amber-600/15 text-amber-400' : 'text-slate-400'
            }`}>
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
          <div className="text-[8px] text-slate-600 uppercase tracking-wider font-bold px-3 py-1.5 mt-1">Admin</div>
          {[
            { icon: <Shield className="w-3.5 h-3.5" />, label: 'System' },
            { icon: <TrendingUp className="w-3.5 h-3.5" />, label: 'Revenue' },
            { icon: <Zap className="w-3.5 h-3.5" />, label: 'SLA Tracking' },
            { icon: <UserCheck className="w-3.5 h-3.5" />, label: 'Users & RBAC' },
            { icon: <Globe className="w-3.5 h-3.5" />, label: 'Branches' },
            { icon: <Layers className="w-3.5 h-3.5" />, label: 'AI Plugins' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2.5 px-3 py-[6px] rounded-md text-[10px] text-slate-400">
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-[#21262d]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white">SA</div>
            <div>
              <div className="text-[10px] font-medium text-slate-300">Super Admin</div>
              <div className="text-[9px] text-slate-600">3 Branches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main — Enterprise Dashboard */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#161b22] border-b border-[#21262d]">
          <div className="flex items-center gap-3">
            <h2 className="text-[13px] font-semibold text-white">Enterprise Overview</h2>
            <span className="text-[9px] px-2 py-0.5 bg-amber-500/15 text-amber-400 rounded-full border border-amber-500/25 font-bold">ALL 10 MODULES</span>
          </div>
          <div className="flex gap-1.5 text-[9px]">
            {['Bangalore HQ', 'Mumbai', 'Delhi'].map((b, i) => (
              <span key={b} className={`px-2 py-1 rounded-lg border ${i === 0 ? 'bg-amber-600/15 text-amber-400 border-amber-500/25' : 'text-slate-500 border-[#21262d]'}`}>{b}</span>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* KPI Row */}
          <div className="grid grid-cols-5 gap-2.5">
            {[
              { label: 'Studies Today', value: '284', icon: <Eye className="w-3.5 h-3.5" />, color: 'text-sky-400', bg: 'bg-sky-500/8', border: 'border-sky-500/20' },
              { label: 'SLA Compliance', value: '97.2%', icon: <Zap className="w-3.5 h-3.5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20' },
              { label: 'Revenue Today', value: '₹12.4L', icon: <TrendingUp className="w-3.5 h-3.5" />, color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20' },
              { label: 'Active Users', value: '42', icon: <Users className="w-3.5 h-3.5" />, color: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/20' },
              { label: 'Reports Done', value: '196', icon: <FileText className="w-3.5 h-3.5" />, color: 'text-teal-400', bg: 'bg-teal-500/8', border: 'border-teal-500/20' },
            ].map((s, i) => (
              <motion.div key={s.label}
                className={`${s.bg} rounded-xl p-3 border ${s.border}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={s.color}>{s.icon}</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-wider font-medium">{s.label}</span>
                </div>
                <div className={`text-[17px] font-bold ${s.color}`}>{s.value}</div>
              </motion.div>
            ))}
          </div>

          {/* SLA + Branch Performance side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#161b22] rounded-xl p-4 border border-[#21262d]">
              <div className="text-[11px] font-semibold text-slate-300 mb-3">SLA by Modality</div>
              {[
                { mod: 'CT', tat: '38m / 60m', pct: 63, color: 'bg-emerald-500' },
                { mod: 'MRI', tat: '52m / 90m', pct: 58, color: 'bg-emerald-500' },
                { mod: 'X-Ray', tat: '8m / 15m', pct: 53, color: 'bg-emerald-500' },
                { mod: 'US', tat: '15m / 30m', pct: 50, color: 'bg-emerald-500' },
                { mod: 'MG', tat: '22m / 45m', pct: 49, color: 'bg-emerald-500' },
              ].map((s, i) => (
                <div key={s.mod} className="flex items-center gap-3 mb-2 last:mb-0">
                  <span className="text-[10px] text-slate-500 w-10 font-mono">{s.mod}</span>
                  <AnimBar pct={s.pct} color={s.pct > 80 ? 'bg-red-500' : s.pct > 60 ? 'bg-amber-500' : 'bg-emerald-500'} delay={0.5 + i * 0.08} />
                  <span className="text-[9px] text-slate-500 w-20 text-right font-mono">{s.tat}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#161b22] rounded-xl p-4 border border-[#21262d]">
              <div className="text-[11px] font-semibold text-slate-300 mb-3">Branch Performance</div>
              {[
                { name: 'Bangalore HQ', studies: 142, revenue: '₹5.8L', sla: '98.1%', slaC: 'text-emerald-400' },
                { name: 'Mumbai', studies: 89, revenue: '₹4.2L', sla: '96.4%', slaC: 'text-emerald-400' },
                { name: 'Delhi', studies: 53, revenue: '₹2.4L', sla: '97.8%', slaC: 'text-emerald-400' },
              ].map((b, i) => (
                <motion.div key={b.name}
                  className="flex items-center justify-between py-2 border-b border-[#21262d]/60 last:border-0"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}>
                  <span className="text-[10px] text-slate-300 font-medium">{b.name}</span>
                  <div className="flex items-center gap-4 text-[9px]">
                    <span className="text-slate-500">{b.studies} studies</span>
                    <span className="text-amber-400 font-medium">{b.revenue}</span>
                    <span className={`${b.slaC} font-bold`}>{b.sla}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Users + SLA Alert */}
          <div className="grid grid-cols-3 gap-3">
            {/* Recent User Activity */}
            <div className="col-span-2 bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#21262d] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300">Active Users (42)</span>
                <span className="text-[9px] text-amber-400 cursor-pointer">Manage Users →</span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_80px_80px_60px] gap-1 px-4 py-1.5 border-b border-[#21262d] text-[8px] text-slate-500 uppercase tracking-wider font-semibold">
                <div>User</div><div>Role</div><div>Branch</div><div>Status</div>
              </div>
              {[
                { name: 'Dr. Priya Mehta', role: 'Radiologist', roleBg: 'bg-amber-500/15 text-amber-400', branch: 'Bangalore', status: 'Online' },
                { name: 'Vikram Shah', role: 'Technician', roleBg: 'bg-cyan-500/15 text-cyan-400', branch: 'Mumbai', status: 'Online' },
                { name: 'Sunita Reddy', role: 'FrontDesk', roleBg: 'bg-green-500/15 text-green-400', branch: 'Delhi', status: 'Idle' },
                { name: 'Dr. Arjun Kumar', role: 'Admin', roleBg: 'bg-purple-500/15 text-purple-400', branch: 'Bangalore', status: 'Online' },
              ].map((u, i) => (
                <motion.div key={u.name}
                  className="grid grid-cols-[minmax(0,1fr)_80px_80px_60px] gap-1 px-4 py-1.5 border-b border-[#21262d]/40"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }}>
                  <div className="text-[10px] text-slate-300 font-medium truncate">{u.name}</div>
                  <div><span className={`text-[8px] px-1.5 py-0.5 rounded-full ${u.roleBg} font-medium`}>{u.role}</span></div>
                  <div className="text-[10px] text-slate-500">{u.branch}</div>
                  <div className="text-[10px] text-emerald-400">{u.status}</div>
                </motion.div>
              ))}
            </div>

            {/* System Health */}
            <div className="bg-[#161b22] rounded-xl p-4 border border-[#21262d]">
              <div className="text-[11px] font-semibold text-slate-300 mb-3">System Health</div>
              {[
                { label: 'Database', status: 'Healthy', color: 'text-emerald-400' },
                { label: 'Redis', status: 'Connected', color: 'text-emerald-400' },
                { label: 'SCP Server', status: 'Active', color: 'text-emerald-400' },
                { label: 'WebSocket', status: '42 clients', color: 'text-blue-400' },
                { label: 'Backup', status: 'Last: 2h ago', color: 'text-slate-400' },
                { label: 'Encryption', status: 'AES-256', color: 'text-emerald-400' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-1.5">
                  <span className="text-[10px] text-slate-500">{s.label}</span>
                  <span className={`text-[9px] font-medium ${s.color}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Warning */}
          <motion.div className="flex items-center gap-3 p-3 bg-amber-500/8 rounded-xl border border-amber-500/20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="text-[10px] text-amber-400">SLA Warning: MRI Brain studies at Mumbai branch approaching 90% TAT threshold</span>
            <span className="text-[9px] text-amber-500/70 ml-auto cursor-pointer whitespace-nowrap">Escalate →</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   T5 — Billing+PACS Hybrid (Real UI)
   Matches: Combined FrontDesk workflow with
   billing + PACS + technician panels
───────────────────────────────────────────────────── */
function T5Mockup() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden text-white h-[480px] flex text-[11px]">
      {/* Sidebar */}
      <div className="w-[180px] bg-[#161b22] border-r border-[#21262d] flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-[#21262d] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Merge className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">DicoFlow</div>
            <div className="text-[9px] text-emerald-400">Billing+PACS</div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {[
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Dashboard', active: true },
            { icon: <Users className="w-3.5 h-3.5" />, label: 'Patients' },
            { icon: <FolderOpen className="w-3.5 h-3.5" />, label: 'Studies' },
            { icon: <Receipt className="w-3.5 h-3.5" />, label: 'Billing', badge: '5' },
            { icon: <Eye className="w-3.5 h-3.5" />, label: 'DICOM Viewer' },
            { icon: <Clipboard className="w-3.5 h-3.5" />, label: 'PCPNDT Register' },
            { icon: <Layers className="w-3.5 h-3.5" />, label: 'Processing' },
            { icon: <Printer className="w-3.5 h-3.5" />, label: 'Film Prep' },
            { icon: <Settings className="w-3.5 h-3.5" />, label: 'Settings' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2.5 px-3 py-[7px] rounded-md transition-all ${
              item.active
                ? 'bg-emerald-600/15 text-emerald-400 border-l-2 border-emerald-400 -ml-0.5 pl-[10px]'
                : 'text-slate-400 hover:bg-[#1c2128]'
            }`}>
              {item.icon}
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">{item.badge}</span>
              )}
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-[#21262d]">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-emerald-900/15 rounded-lg border border-emerald-800/30">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <div>
              <div className="text-[9px] text-emerald-400">SCP Online</div>
              <div className="text-[8px] text-slate-600">2 modalities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main — Split dashboard */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#161b22] border-b border-[#21262d]">
          <h2 className="text-[13px] font-semibold text-white">Billing + PACS Dashboard</h2>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-blue-400 flex items-center gap-1"><Receipt className="w-3 h-3" /> Billing</span>
            <span className="text-slate-600">|</span>
            <span className="text-teal-400 flex items-center gap-1"><MonitorDot className="w-3 h-3" /> PACS</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Dual Stats Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/15">
              <div className="flex items-center gap-2 mb-3">
                <Receipt className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] font-semibold text-blue-400">Billing Summary</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Revenue Today', value: '₹3.8L', color: 'text-blue-400' },
                  { label: 'Invoices', value: '52', color: 'text-blue-400' },
                  { label: 'Pending', value: '₹85K', color: 'text-amber-400' },
                  { label: 'Collection %', value: '91.2%', color: 'text-emerald-400' },
                ].map(s => (
                  <div key={s.label}>
                    <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-[9px] text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-teal-500/5 rounded-xl p-4 border border-teal-500/15">
              <div className="flex items-center gap-2 mb-3">
                <MonitorDot className="w-4 h-4 text-teal-400" />
                <span className="text-[11px] font-semibold text-teal-400">PACS Summary</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Studies Today', value: '38', color: 'text-teal-400' },
                  { label: 'Total Images', value: '2,840', color: 'text-teal-400' },
                  { label: 'Storage Used', value: '1.2 TB', color: 'text-slate-400' },
                  { label: 'Modalities', value: '4 Online', color: 'text-emerald-400' },
                ].map(s => (
                  <div key={s.label}>
                    <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-[9px] text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unified Patient Workflow Table */}
          <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#21262d] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">Patient Workflow</span>
              <span className="text-[9px] px-2.5 py-1 bg-emerald-600/15 text-emerald-400 rounded-lg cursor-pointer border border-emerald-500/25">+ New Registration</span>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_50px_90px_100px_80px_50px] gap-1 px-4 py-2 border-b border-[#21262d] text-[8px] text-slate-500 uppercase tracking-wider font-semibold">
              <div>Patient</div><div>Mod</div><div>PACS Status</div><div>Billing</div><div>Payment</div><div>Act</div>
            </div>
            {[
              { patient: 'Sharma, Rajesh', mod: 'CT', pacs: 'Images Received', pColor: 'text-teal-400', billing: '₹3,500 Paid', bColor: 'text-emerald-400', payment: 'Cash' },
              { patient: 'Kumar, Vikram', mod: 'MRI', pacs: 'Scanning...', pColor: 'text-yellow-400', billing: '₹7,200 Pending', bColor: 'text-amber-400', payment: 'UPI' },
              { patient: 'Patel, Amita', mod: 'XR', pacs: 'Completed', pColor: 'text-emerald-400', billing: '₹1,200 Paid', bColor: 'text-emerald-400', payment: 'Card' },
              { patient: 'Gupta, Sunil', mod: 'US', pacs: 'Waiting', pColor: 'text-sky-400', billing: '₹2,800 Pending', bColor: 'text-amber-400', payment: '—' },
              { patient: 'Singh, Neha', mod: 'CT', pacs: 'Processing 3D', pColor: 'text-purple-400', billing: '₹4,500 Paid', bColor: 'text-emerald-400', payment: 'Insurance' },
              { patient: 'Reddy, Mohan', mod: 'MG', pacs: 'Received', pColor: 'text-teal-400', billing: '₹2,200 Partial', bColor: 'text-amber-400', payment: 'Card' },
            ].map((r, i) => (
              <motion.div key={r.patient}
                className="grid grid-cols-[minmax(0,1fr)_50px_90px_100px_80px_50px] gap-1 px-4 py-2 border-b border-[#21262d]/40 hover:bg-[#1c2128] transition-colors"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.08 }}>
                <div className="text-[10px] text-slate-300 font-medium">{r.patient}</div>
                <div><span className="text-[9px] px-1 py-0.5 bg-[#1e293b] rounded font-mono text-slate-400">{r.mod}</span></div>
                <div className={`text-[10px] ${r.pColor}`}>{r.pacs}</div>
                <div className={`text-[10px] font-medium ${r.bColor}`}>{r.billing}</div>
                <div className="text-[10px] text-slate-500">{r.payment}</div>
                <div className="flex gap-1">
                  <Eye className="w-3 h-3 text-teal-400 cursor-pointer" />
                  <Receipt className="w-3 h-3 text-blue-400 cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom: GST + SCP Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/15">
              <Landmark className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-blue-400 font-semibold">GST Compliant</div>
                <div className="text-[9px] text-slate-500">E-Invoice Active • PCPNDT Tracking On</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-teal-500/5 rounded-xl border border-teal-500/15">
              <Wifi className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-teal-400 font-semibold">SCP Listener Active</div>
                <div className="text-[9px] text-slate-500">2 modalities connected • 0.0.0.0:11112</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TIER_MOCKUPS: Record<TierId, () => React.ReactNode> = {
  T1: () => <T1Mockup />,
  T2: () => <T2Mockup />,
  T3: () => <T3Mockup />,
  T4: () => <T4Mockup />,
  T5: () => <T5Mockup />,
};

/* ─────────────────────────────────────────────────
   Main TierShowcase Component
───────────────────────────────────────────────────── */
export default function TierShowcase() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const tier = TIERS[active];

  const [userInteracted, setUserInteracted] = useState(false);
  const AUTO_INTERVAL = 10000;
  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % TIERS.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const handleSelect = useCallback((i: number) => {
    setActive(i);
    setUserInteracted(true);
  }, []);

  // SVG circle progress for module count
  const moduleRatio = tier.moduleIds.length / 10;
  const CIRCLE_R = 28;
  const CIRCLE_C = 2 * Math.PI * CIRCLE_R;

  return (
    <section ref={ref} id="tiers" className="py-28 lg:py-36 bg-[#0a0d12] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-full uppercase tracking-widest mb-5 border border-amber-500/20">
            5 Product Tiers
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight tracking-tight">
            One Platform,{' '}
            <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Five Solutions
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Each tier is a complete production-ready application with real interfaces — not mockups. See exactly what your team will use.
          </p>
        </motion.div>

        {/* Tier Tab Selector */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center bg-[#161b22] rounded-2xl p-1.5 border border-[#21262d] gap-1 shadow-lg shadow-black/30">
            {TIERS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleSelect(i)}
                className={`relative flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  active === i
                    ? 'text-white shadow-lg shadow-black/30'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-[#1c2128]'
                }`}
                style={active === i ? { backgroundColor: TIER_COLORS[t.id].primary, boxShadow: `0 4px 20px ${TIER_COLORS[t.id].primary}30` } : {}}
              >
                {TIER_ICONS[t.id]}
                <span className="hidden sm:inline">{t.name}</span>
                <span className="sm:hidden">{t.id}</span>
                {t.isPopular && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: active === i ? 1 : 0.8 }}
                    className={`absolute -top-2.5 -right-2.5 flex items-center gap-0.5 px-2 py-0.5 text-[8px] font-bold rounded-full shadow ${
                      active === i ? 'text-amber-900 bg-amber-300' : 'text-amber-600 bg-amber-500/20 border border-amber-500/30'
                    }`}
                  >
                    <Star className="w-2.5 h-2.5 fill-current" /> Popular
                  </motion.span>
                )}
                {/* Auto-cycle progress bar under active tab */}
                {active === i && !userInteracted && (
                  <motion.div
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-white/30 overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white/60 rounded-full"
                      key={`progress-${i}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
                    />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tier Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Application Preview with browser chrome */}
            <div className="max-w-[1100px] mx-auto mb-10">
              <div className="rounded-2xl overflow-hidden border border-[#21262d] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                {/* Browser Chrome */}
                <div className="flex items-center gap-3 px-5 py-3 bg-[#161b22] border-b border-[#21262d]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0d1117] rounded-lg text-xs text-slate-500 min-w-[300px] border border-[#21262d]">
                      <div className="w-3.5 h-3.5 rounded-full border border-emerald-500/50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="font-mono">app.dicoflow.com/{tier.name.toLowerCase().replace('+', '-')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 text-slate-600">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>
                {/* App content */}
                {TIER_MOCKUPS[tier.id]()}
              </div>
            </div>

            {/* Tier Info Cards */}
            <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-5">
              {/* About */}
              <div className="bg-[#161b22] rounded-2xl p-6 border border-[#21262d] relative overflow-hidden">
                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06]" style={{ background: TIER_COLORS[tier.id].primary, filter: 'blur(40px)' }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: TIER_COLORS[tier.id].primary, boxShadow: `0 4px 16px ${TIER_COLORS[tier.id].primary}30` }}>
                      {TIER_ICONS[tier.id]}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md text-white inline-block mb-0.5"
                        style={{ backgroundColor: TIER_COLORS[tier.id].primary }}>
                        {tier.id}
                      </span>
                      <div className="text-base font-bold text-white">{tier.fullName}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{tier.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-[#0d1117] rounded-lg px-3 py-2 border border-[#21262d]">
                    <Users className="w-3.5 h-3.5 text-slate-600" />
                    <span><span className="font-semibold text-slate-400">Target:</span> {tier.target}</span>
                  </div>
                </div>
              </div>

              {/* Modules — with SVG ring */}
              <div className="bg-[#161b22] rounded-2xl p-6 border border-[#21262d]">
                <div className="flex items-center gap-4 mb-4">
                  {/* Animated ring */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                      <circle cx="32" cy="32" r={CIRCLE_R} fill="none" stroke="#21262d" strokeWidth="4" />
                      <motion.circle
                        cx="32" cy="32" r={CIRCLE_R} fill="none"
                        stroke={TIER_COLORS[tier.id].primary}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={CIRCLE_C}
                        initial={{ strokeDashoffset: CIRCLE_C }}
                        animate={{ strokeDashoffset: CIRCLE_C * (1 - moduleRatio) }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-extrabold text-white">{tier.moduleIds.length}</span>
                      <span className="text-[10px] text-slate-500">/10</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Modules Included
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {tier.moduleIds.length === 10 ? 'All modules unlocked' : `${10 - tier.moduleIds.length} more in higher tiers`}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tier.moduleIds.map(m => (
                    <span key={m} className="text-[11px] font-medium px-2.5 py-1 rounded-lg border text-slate-300 capitalize"
                      style={{ backgroundColor: `${TIER_COLORS[tier.id].primary}08`, borderColor: `${TIER_COLORS[tier.id].primary}25` }}>
                      {m.replace('_', ' ')}
                    </span>
                  ))}
                </div>
                <a href="/contact" className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-bold transition-all hover:brightness-125 hover:gap-2.5"
                  style={{ color: TIER_COLORS[tier.id].primary }}>
                  Request {tier.id} Demo <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Key Capabilities */}
              <div className="bg-[#161b22] rounded-2xl p-6 border border-[#21262d]">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Key Capabilities
                </div>
                <ul className="space-y-2.5">
                  {tier.highlights.slice(0, 6).map((h, i) => (
                    <motion.li
                      key={h}
                      className="flex items-start gap-2.5 text-[12px] text-slate-300 leading-relaxed"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                    >
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${TIER_COLORS[tier.id].primary}15` }}>
                        <Check className="w-3 h-3"
                          style={{ color: TIER_COLORS[tier.id].primary }} />
                      </div>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <button onClick={() => handleSelect(Math.max(0, active - 1))} disabled={active === 0}
            className="p-3 rounded-xl bg-[#161b22] text-slate-400 hover:bg-[#1c2128] disabled:opacity-20 transition-all border border-[#21262d] hover:border-slate-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            {TIERS.map((t, i) => (
              <button key={i} onClick={() => handleSelect(i)}
                className="relative w-3.5 h-3.5 rounded-full transition-all duration-400"
                style={{
                  backgroundColor: active === i ? TIER_COLORS[t.id].primary : '#21262d',
                  transform: active === i ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: active === i ? `0 0 16px ${TIER_COLORS[t.id].primary}50` : 'none'
                }}
              />
            ))}
          </div>
          <button onClick={() => handleSelect(Math.min(TIERS.length - 1, active + 1))} disabled={active === TIERS.length - 1}
            className="p-3 rounded-xl bg-[#161b22] text-slate-400 hover:bg-[#1c2128] disabled:opacity-20 transition-all border border-[#21262d] hover:border-slate-600">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
