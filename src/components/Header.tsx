'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site-config';
import {
  Phone, Mail, Menu, X, ChevronDown,
  Database, FileText, Shield, Printer, Cpu, MessageSquare,
  Receipt, Landmark, ShieldCheck, Timer, Building2
} from 'lucide-react';

const MODULE_ICONS: Record<string, React.ReactNode> = {
  core: <Shield className="w-4 h-4" />,
  billing: <Receipt className="w-4 h-4" />,
  pacs: <Database className="w-4 h-4" />,
  radiology: <FileText className="w-4 h-4" />,
  dispatch: <Printer className="w-4 h-4" />,
  processing: <Cpu className="w-4 h-4" />,
  communication: <MessageSquare className="w-4 h-4" />,
  indian_enterprise: <Landmark className="w-4 h-4" />,
  compliance: <ShieldCheck className="w-4 h-4" />,
  sla: <Timer className="w-4 h-4" />,
};

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  {
    name: 'Features',
    href: '/features',
    dropdown: [
      { id: 'core', name: 'Core Platform', desc: 'Auth, RBAC, Audit, Encryption' },
      { id: 'pacs', name: 'PACS & DICOM', desc: '120+ SOP classes, Web Viewer' },
      { id: 'radiology', name: 'Radiology Workflow', desc: '14-stage lifecycle, Reporting' },
      { id: 'processing', name: 'Advanced Processing', desc: 'MPR, 3D Rendering, AI' },
      { id: 'billing', name: 'Billing & Revenue', desc: 'GST, E-Invoice, Payments' },
      { id: 'communication', name: 'Communication', desc: 'WhatsApp, Email, SMS' },
      { id: 'dispatch', name: 'Print Dispatch', desc: 'Booklets, Multi-Printer' },
      { id: 'compliance', name: 'Compliance', desc: 'HIPAA, NABH, IHE' },
    ],
  },
  { name: 'Tiers', href: '/tiers' },
  { name: 'Workflow', href: '/workflow' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${siteConfig.contact.primaryPhone}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.contact.primaryPhone}
            </a>
            <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              {siteConfig.contact.primaryEmail}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Enterprise RIS/PACS Platform</span>
            <a href="/contact" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
              Request Demo →
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-effect shadow-lg shadow-slate-200/50'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">{siteConfig.company.name}</span>
                <span className="hidden sm:block text-[10px] text-slate-500 -mt-1 font-medium tracking-wider uppercase">
                  RIS/PACS Platform
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setFeaturesOpen(true)}
                    onMouseLeave={() => setFeaturesOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
                      {item.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {featuresOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-[420px] bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-100 p-3 grid grid-cols-2 gap-1"
                        >
                          {item.dropdown.map((sub) => (
                            <a
                              key={sub.id}
                              href="/features"
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                            >
                              <div className="mt-0.5 text-slate-400 group-hover/item:text-sky-500 transition-colors">
                                {MODULE_ICONS[sub.id]}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-900">{sub.name}</div>
                                <div className="text-xs text-slate-500">{sub.desc}</div>
                              </div>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {item.name}
                  </a>
                )
              )}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="/contact"
                className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get Quote
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-slate-100"
            >
              <nav className="px-4 py-4 space-y-1 bg-white">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-purple-600 rounded-xl text-center mt-3"
                >
                  Get Quote
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
