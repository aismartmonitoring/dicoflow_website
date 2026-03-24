'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimatedCounter } from './ui/animated-counter';
import { sectionReveal, staggerContainer, staggerItem } from '@/lib/animations';
import { Building2, Timer, HeartPulse, Users } from 'lucide-react';

const ENTERPRISE_CARDS = [
  {
    icon: <Building2 className="w-7 h-7" />,
    title: 'Multi-Branch Support',
    description: 'Separate patient, study, and billing queues per branch with corporate-level revenue rollup dashboards.',
    details: ['Branch-specific user assignment', 'Cross-branch report routing', 'Consolidated billing reports', 'Per-branch SCP servers'],
    gradient: 'from-amber-500 to-orange-600',
    mockup: (
      <div className="flex items-center gap-3 mt-4">
        {['Bangalore HQ', 'Mumbai', 'Delhi'].map((b, i) => (
          <motion.div
            key={b}
            className="flex-1 p-2 rounded-lg bg-amber-50 border border-amber-200 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center mx-auto mb-1">
              <Building2 className="w-3 h-3 text-amber-700" />
            </div>
            <div className="text-[10px] font-medium text-amber-800">{b}</div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    icon: <Timer className="w-7 h-7" />,
    title: 'SLA Tracking',
    description: 'Real-time turnaround time monitoring per modality with configurable breach alerts and escalation workflows.',
    details: ['Per-modality TAT thresholds', '50% consumed early warning', 'Auto-escalation rules', 'Monthly TAT reports'],
    gradient: 'from-sky-500 to-blue-600',
    mockup: (
      <div className="mt-4 space-y-2">
        {[
          { mod: 'CT Chest', time: '45m', max: '60m', pct: 75 },
          { mod: 'MRI Brain', time: '52m', max: '90m', pct: 58 },
          { mod: 'X-Ray', time: '8m', max: '15m', pct: 53 },
        ].map((s, i) => (
          <div key={s.mod} className="flex items-center gap-3">
            <span className="text-[10px] text-slate-600 w-16 flex-shrink-0">{s.mod}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${s.pct > 80 ? 'bg-red-500' : s.pct > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              />
            </div>
            <span className="text-[10px] text-slate-500 w-20 text-right">{s.time}/{s.max}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <HeartPulse className="w-7 h-7" />,
    title: 'Self-Healing',
    description: '7 background services with automatic health monitoring, crash recovery, and intelligent failover.',
    details: ['DB auto-reconnect', 'Redis watchdog with fallback', 'SCP process restart', 'Disk space monitoring'],
    gradient: 'from-emerald-500 to-teal-600',
    mockup: (
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['DB', 'Redis', 'SCP', 'Backup', 'Cache', 'WS', 'Keys'].map((s, i) => (
          <motion.div
            key={s}
            className="flex flex-col items-center p-1.5 rounded-lg bg-emerald-50 border border-emerald-200"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-emerald-500 rounded-full mb-0.5" />
            <span className="text-[9px] text-emerald-700 font-medium">{s}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'RBAC System',
    description: '9 predefined roles with 70+ granular permissions covering every aspect of the diagnostic workflow.',
    details: ['Permission inheritance', 'Per-page visibility controls', 'Admin-toggleable features', 'Audit every action'],
    gradient: 'from-purple-500 to-violet-600',
    mockup: (
      <div className="mt-4 flex flex-wrap gap-1.5">
        {['SuperAdmin', 'Admin', 'Branch Mgr', 'Radiologist', 'Typist', 'Technician', 'Front Desk', 'Dispatcher', 'Viewer'].map((r, i) => (
          <motion.span
            key={r}
            className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08 }}
          >
            {r}
          </motion.span>
        ))}
      </div>
    ),
  },
];

export default function EnterpriseFeatures() {
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
          <span className="inline-block px-5 py-2 text-xs font-bold text-amber-700 bg-amber-50 rounded-full uppercase tracking-widest border border-amber-100 mb-5">
            Enterprise Grade
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Built for{' '}
            <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">Scale</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Multi-branch operations, SLA enforcement, self-healing infrastructure, and granular access control.
          </p>

          {/* Counter highlight */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">
                <AnimatedCounter value={70} suffix="+" />
              </div>
              <div className="text-xs text-slate-500 mt-1">Permissions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">
                <AnimatedCounter value={9} />
              </div>
              <div className="text-xs text-slate-500 mt-1">User Roles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">
                <AnimatedCounter value={7} />
              </div>
              <div className="text-xs text-slate-500 mt-1">Self-Healing Services</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {ENTERPRISE_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="bg-white rounded-2xl p-6 border border-slate-200 card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{card.description}</p>
              <ul className="space-y-1.5 mb-2">
                {card.details.map(d => (
                  <li key={d} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              {card.mockup}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
