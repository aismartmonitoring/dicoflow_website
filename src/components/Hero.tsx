'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { siteConfig } from '@/config/site-config';
import { HERO_STATS } from '@/lib/constants';
import { AnimatedCounter } from './ui/animated-counter';
import HeroSlideshow from './HeroSlideshow';
import { staggerContainer, staggerItem, mockupSlideIn } from '@/lib/animations';
import {
  ArrowRight, Play, Shield, Zap, Database, FileText
} from 'lucide-react';

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#060910]">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 20% 60%, rgba(56,189,248,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 30%, rgba(168,85,247,0.06) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 100%, rgba(14,165,233,0.04) 0%, transparent 50%)'
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div ref={ref} className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Badge */}
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[13px] text-slate-300 font-medium tracking-wide">Enterprise-Grade Medical Imaging Platform</span>
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-extrabold text-white leading-[1.1] tracking-tight">
              Complete{' '}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                RIS / PACS
              </span>
              <br />
              <span className="text-slate-100">for Diagnostic Centers</span>
            </motion.h1>

            <motion.p variants={staggerItem} className="mt-7 text-[17px] text-slate-400 max-w-lg leading-[1.7]">
              {siteConfig.company.description}
            </motion.p>

            {/* CTA */}
            <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-4">
              <a
                href="/tiers"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-[15px] font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl hover:shadow-xl hover:shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Tiers
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-[15px] font-bold text-white border border-white/15 rounded-xl hover:bg-white/[0.06] transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Request Demo
              </a>
            </motion.div>

            {/* Feature pills */}
            <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-3">
              {[
                { icon: <Database className="w-3.5 h-3.5" />, text: '120+ SOP Classes' },
                { icon: <Shield className="w-3.5 h-3.5" />, text: 'HIPAA Compliant' },
                { icon: <Zap className="w-3.5 h-3.5" />, text: '45 Transfer Syntaxes' },
                { icon: <FileText className="w-3.5 h-3.5" />, text: '14-Stage Workflow' },
              ].map((badge) => (
                <span key={badge.text} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] font-medium text-slate-300">
                  <span className="text-sky-400">{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated Feature Slideshow */}
          <motion.div
            variants={mockupSlideIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hidden lg:block"
          >
            <HeroSlideshow />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-8"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix} />
              </div>
              <div className="text-[13px] text-slate-500 mt-1.5 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
