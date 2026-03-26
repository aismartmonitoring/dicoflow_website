/**
 * ═══════════════════════════════════════════════════════════════════
 * SITE CONFIGURATION — Edit this file before deployment
 * ═══════════════════════════════════════════════════════════════════
 * 
 * This is the ONLY file you need to edit to customize the website
 * for your organization. All components read from this configuration.
 * 
 * Environment variables override these values when set:
 *   NEXT_PUBLIC_COMPANY_NAME, NEXT_PUBLIC_COMPANY_EMAIL, etc.
 */

export const siteConfig = {
  // ─── Company Information ───────────────────────────────────────
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'DicoFlow',
    legalName: process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || 'DicoFlow Medical Technologies Pvt. Ltd.',
    tagline: 'Enterprise RIS/PACS for Modern Diagnostic Centers',
    description: 'From patient registration to report delivery — one unified platform for diagnostic imaging centers, hospitals, and medical research facilities.',
    foundedYear: 2020,
    logoUrl: '/images/logo.svg',
    faviconUrl: '/favicon.ico',
  },

  // ─── Contact Information ───────────────────────────────────────
  contact: {
    primaryName: 'Viswaranjan Sahoo',
    primaryEmail: 'support@techmasys.in',
    supportEmail: 'support@techmasys.in',
    primaryPhone: '7008918902',
    secondaryPhone: '',
    whatsapp: '',
  },

  // ─── Address ───────────────────────────────────────────────────
  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 || '4th Floor, Tech Park One',
    line2: process.env.NEXT_PUBLIC_ADDRESS_LINE2 || 'Whitefield Main Road',
    city: process.env.NEXT_PUBLIC_ADDRESS_CITY || 'Bangalore',
    state: process.env.NEXT_PUBLIC_ADDRESS_STATE || 'Karnataka',
    zip: process.env.NEXT_PUBLIC_ADDRESS_ZIP || '560066',
    country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || 'India',
  },

  // ─── Social Media ──────────────────────────────────────────────
  social: {
    linkedin: 'https://linkedin.com/company/dicoflow',
    twitter: 'https://twitter.com/dicoflow',
    youtube: 'https://youtube.com/@dicoflow',
    github: '',
  },

  // ─── Website Settings ─────────────────────────────────────────
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dicoflow.com',
    title: 'DicoFlow — Enterprise RIS/PACS Platform',
    metaDescription: 'Enterprise-grade Radiology Information System & PACS. 5 tiers, 10 modules, 120+ DICOM SOP classes. HIPAA, NABH, IHE compliant. From billing to 3D rendering.',
    ogImage: '/images/og-image.png',
    gaTrackingId: process.env.NEXT_PUBLIC_GA_ID || '',
  },

  // ─── Admin Settings ────────────────────────────────────────────
  admin: {
    apiKey: process.env.ADMIN_API_KEY || '',
    password: process.env.ADMIN_PASSWORD || '',
    emailForwarding: process.env.ENQUIRY_FORWARD_EMAIL || '',
  },

  // ─── Demo / CTA Settings ──────────────────────────────────────
  cta: {
    demoUrl: '#enquiry',
    scheduleCallUrl: '#enquiry',
    documentationUrl: '/docs',
    showPricing: true,
  },

  // ─── Support Hours ─────────────────────────────────────────────
  supportHours: {
    weekdays: '9:00 AM — 6:00 PM IST',
    weekends: 'Emergency Support Only',
    timezone: 'Asia/Kolkata',
  },
} as const;

export type SiteConfig = typeof siteConfig;
