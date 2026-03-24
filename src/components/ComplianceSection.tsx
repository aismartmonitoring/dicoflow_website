'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { COMPLIANCE_STANDARDS } from '@/lib/constants';
import { sectionReveal, complianceBadgeReveal, staggerContainer } from '@/lib/animations';
import {
  ShieldCheck, Award, Network, Lock, Globe, Fingerprint,
  Key, Eye, FileCheck, Server
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Network: <Network className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Fingerprint: <Fingerprint className="w-6 h-6" />,
};

const SECURITY_FEATURES = [
  { icon: <Key className="w-5 h-5" />, title: 'AES-256-GCM', desc: 'Envelope encryption with KEK/DEK architecture' },
  { icon: <Lock className="w-5 h-5" />, title: 'Ed25519 JWT', desc: '15-min tokens with Redis blacklist revocation' },
  { icon: <Fingerprint className="w-5 h-5" />, title: 'Argon2id', desc: 'Password hashing (t=3, m=32MB, p=4)' },
  { icon: <Eye className="w-5 h-5" />, title: 'SHA-512 Audit Chain', desc: 'Immutable hash-linked audit entries' },
  { icon: <Server className="w-5 h-5" />, title: 'TLS 1.3', desc: 'All connections encrypted in transit' },
  { icon: <FileCheck className="w-5 h-5" />, title: '6-Year Retention', desc: 'Configurable audit log retention per HIPAA' },
];

export default function ComplianceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="compliance" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full uppercase tracking-widest border border-emerald-100 mb-5">
            Security & Compliance
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Enterprise-Grade{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Security</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Built from the ground up with healthcare compliance in mind. Every data path is encrypted, every action is audited.
          </p>
        </motion.div>

        {/* Compliance Standards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {COMPLIANCE_STANDARDS.map((std) => (
            <motion.div
              key={std.id}
              variants={complianceBadgeReveal}
              className="bg-white rounded-2xl p-6 border border-slate-200 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                  {ICON_MAP[std.icon]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{std.name}</h3>
                  <p className="text-xs text-slate-500">{std.fullName}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">{std.description}</p>
              <ul className="space-y-1.5">
                {std.requirements.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Features Bar */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h3 className="text-xl font-bold text-slate-900 text-center mb-8">Security Infrastructure</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SECURITY_FEATURES.map((feat) => (
              <div key={feat.title} className="text-center p-4 rounded-xl bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mx-auto mb-2">
                  {feat.icon}
                </div>
                <div className="text-sm font-bold text-slate-900">{feat.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{feat.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
