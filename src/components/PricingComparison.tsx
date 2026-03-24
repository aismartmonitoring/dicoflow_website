'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIERS, MODULES } from '@/lib/constants';
import { siteConfig } from '@/config/site-config';
import { sectionReveal } from '@/lib/animations';
import { Check, Minus, Star, ArrowRight, Crown } from 'lucide-react';

export default function PricingComparison() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} id="pricing" className="py-28 lg:py-36 bg-gradient-to-b from-[#f8fafc] to-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-sky-700 bg-sky-50 rounded-full uppercase tracking-widest mb-5 border border-sky-100">
            Tier Comparison
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Choose the Right{' '}
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Tier</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From standalone billing to complete enterprise RIS/PACS — every tier includes the Core Platform.
          </p>
        </motion.div>

        {/* ═══ Comparison Table ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
        >
          <table className="w-full min-w-[860px]">
            {/* ── Header ── */}
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="text-left py-6 px-6 w-[220px]">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Module</span>
                </th>
                {TIERS.map((tier) => (
                  <th key={tier.id} className="py-6 px-3 text-center relative">
                    {tier.isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold text-amber-800 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full border border-amber-300 uppercase shadow-sm shadow-amber-100/50">
                          <Crown className="w-3 h-3 fill-amber-500 text-amber-600" /> Most Popular
                        </span>
                      </div>
                    )}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold shadow-md"
                      style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`, boxShadow: `0 4px 12px ${tier.color}30` }}
                    >
                      {tier.id}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-2">{tier.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 max-w-[140px] mx-auto leading-tight">{tier.tagline}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {MODULES.map((mod, i) => (
                <motion.tr
                  key={mod.id}
                  className={`border-b border-slate-100/80 transition-colors hover:bg-sky-50/30 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.04 }}
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-sm text-slate-900">{mod.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{mod.highlight}</div>
                  </td>
                  {TIERS.map((tier) => {
                    const has = tier.moduleIds.includes(mod.id);
                    return (
                      <td key={tier.id} className="py-4 px-3 text-center">
                        {has ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 shadow-sm">
                            <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-200">
                            <Minus className="w-4 h-4 text-slate-300" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}

              {/* ── Module Count Row ── */}
              <tr className="border-t-2 border-slate-200">
                <td className="py-5 px-6">
                  <div className="font-extrabold text-sm text-slate-900">Total Modules</div>
                </td>
                {TIERS.map((tier) => (
                  <td key={tier.id} className="py-5 px-3 text-center">
                    <span className="text-2xl font-extrabold" style={{ color: tier.color }}>
                      {tier.moduleIds.length}
                    </span>
                    <span className="text-sm font-medium text-slate-400"> / 10</span>
                  </td>
                ))}
              </tr>

              {/* ── Best For Row (inside table for alignment) ── */}
              <tr className="bg-slate-50/80 border-t border-slate-100">
                <td className="py-5 px-6">
                  <div className="font-extrabold text-sm text-slate-900">Best for</div>
                </td>
                {TIERS.map((tier) => (
                  <td key={tier.id} className="py-5 px-3 text-center align-top">
                    <p className="text-[12px] text-slate-600 leading-relaxed max-w-[140px] mx-auto">{tier.target}</p>
                  </td>
                ))}
              </tr>

              {/* ── CTA Row ── */}
              <tr className="bg-white">
                <td className="py-5 px-6" />
                {TIERS.map((tier) => (
                  <td key={tier.id} className="py-5 px-3 text-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: tier.color, boxShadow: `0 4px 12px ${tier.color}25` }}
                    >
                      Get {tier.id} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white font-bold text-[15px] rounded-2xl hover:shadow-xl hover:shadow-sky-200/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Request a Custom Quote <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-slate-500 mt-4">
            Contact {siteConfig.company.name} for volume licensing and custom tier configurations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
