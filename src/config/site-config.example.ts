/**
 * ═══════════════════════════════════════════════════════════════════
 * SITE CONFIGURATION EXAMPLE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Copy this file to site-config.ts and update the values for your
 * organization before deploying.
 * 
 * You can also override values via environment variables:
 *   NEXT_PUBLIC_COMPANY_NAME=MyCompany
 *   NEXT_PUBLIC_CONTACT_EMAIL=info@mycompany.com
 *   NEXT_PUBLIC_CONTACT_PHONE=+1-555-0100
 *   ADMIN_API_KEY=your-secret-key
 *   ADMIN_PASSWORD=your-admin-password
 *   ENQUIRY_FORWARD_EMAIL=admin@mycompany.com
 */

export const siteConfig = {
  company: {
    name: 'Your Company Name',
    legalName: 'Your Company Legal Name Pvt. Ltd.',
    tagline: 'Enterprise RIS/PACS for Modern Diagnostic Centers',
    description: 'Your product description here.',
    foundedYear: 2020,
    logoUrl: '/images/logo.svg',
    faviconUrl: '/favicon.ico',
  },
  contact: {
    primaryName: 'John Doe',
    primaryEmail: 'sales@yourcompany.com',
    supportEmail: 'support@yourcompany.com',
    primaryPhone: '+1-555-0100',
    secondaryPhone: '+1-555-0101',
    whatsapp: '+1-555-0100',
  },
  address: {
    line1: '123 Medical Center Drive',
    line2: 'Suite 400',
    city: 'San Francisco',
    state: 'California',
    zip: '94102',
    country: 'USA',
  },
  social: {
    linkedin: 'https://linkedin.com/company/yourcompany',
    twitter: 'https://twitter.com/yourcompany',
    youtube: '',
    github: '',
  },
  site: {
    url: 'https://www.yourcompany.com',
    title: 'Your Company — Enterprise RIS/PACS Platform',
    metaDescription: 'Your meta description here.',
    ogImage: '/images/og-image.png',
    gaTrackingId: '',
  },
  admin: {
    apiKey: 'change-this-to-a-secure-random-string',
    password: 'change-this-to-a-secure-password',
    emailForwarding: 'admin@yourcompany.com',
  },
  cta: {
    demoUrl: '#enquiry',
    scheduleCallUrl: '#enquiry',
    documentationUrl: '/docs',
    showPricing: true,
  },
  supportHours: {
    weekdays: '9:00 AM — 6:00 PM EST',
    weekends: 'Emergency Support Only',
    timezone: 'America/New_York',
  },
} as const;
