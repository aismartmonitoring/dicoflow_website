'use client';

import { siteConfig } from '@/config/site-config';
import { TIERS } from '@/lib/constants';
import { ShieldCheck, Linkedin, Twitter, Youtube } from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: 'Product',
    links: [
      { label: 'Tier Overview', href: '/tiers' },
      { label: 'Feature Deep Dive', href: '/features' },
      { label: 'Workflow Lifecycle', href: '/workflow' },
      { label: 'Pricing & Comparison', href: '/pricing' },
    ],
  },
  {
    title: 'Tiers',
    links: TIERS.map((t) => ({ label: `${t.id} — ${t.name}`, href: '/tiers' })),
  },
  {
    title: 'Compliance',
    links: [
      { label: 'HIPAA', href: '/features#compliance' },
      { label: 'NABH', href: '/features#compliance' },
      { label: 'IHE Profiles', href: '/features#compliance' },
      { label: 'DICOM PS3.15', href: '/features#compliance' },
      { label: 'ISO 27799', href: '/features#compliance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Request Demo', href: '/contact' },
      { label: 'Contact Sales', href: '/contact' },
      { label: 'Documentation', href: siteConfig.cta.documentationUrl },
      { label: 'Support', href: `mailto:${siteConfig.contact.supportEmail}` },
    ],
  },
];

const SOCIAL = [
  { icon: <Linkedin className="w-4 h-4" />, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: <Twitter className="w-4 h-4" />, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: <Youtube className="w-4 h-4" />, href: siteConfig.social.youtube, label: 'YouTube' },
].filter((s) => s.href);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-extrabold text-white tracking-tight mb-3">
              {siteConfig.company.name}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              {siteConfig.company.description}
            </p>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['HIPAA', 'NABH', 'IHE', 'DICOM'].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700"
                >
                  <ShieldCheck className="w-3 h-3" /> {b}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav sections */}
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            &copy; {year} {siteConfig.company.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>{siteConfig.contact.primaryEmail}</span>
            <span className="hidden sm:inline">|</span>
            <span>{siteConfig.contact.primaryPhone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
