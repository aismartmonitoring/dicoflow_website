/**
 * Application Constants
 * DicoFlow Enterprise RIS/PACS — Product Data & Design System
 */

import type { Tier, TierModule, WorkflowStage, ComplianceStandard, ProcessingModule, StatItem } from './types';

// Design System Colors
export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    900: '#0c4a6e'
  },
  medical: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    900: '#064e3b'
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    900: '#581c87'
  }
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem'   // 72px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }
} as const;

// Spacing Scale (following 8px grid)
export const SPACING = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
  40: '10rem',   // 160px
  48: '12rem',   // 192px
  56: '14rem',   // 224px
  64: '16rem'    // 256px
} as const;

// Border Radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px'
} as const;

// Shadow Scale
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
} as const;

// Animation Durations
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000
} as const;

// Z-Index Scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
} as const;

// Medical Imaging Constants
export const MEDICAL_CONSTANTS = {
  imagingTypes: [
    'X-Ray',
    'CT Scan',
    'MRI',
    'Ultrasound',
    'PET Scan',
    'Mammography',
    'DICOM',
    'Angiography'
  ],
  qualityMetrics: {
    contrast: '300%',
    accuracy: '95%',
    processing: '70%',
    improvement: '40%'
  },
  supportedFormats: [
    'DICOM',
    'JPEG',
    'PNG',
    'TIFF',
    'BMP'
  ]
} as const;

// API Endpoints (when needed)
export const API_ENDPOINTS = {
  base: process.env.NEXT_PUBLIC_API_URL || '/api',
  auth: '/auth',
  images: '/images',
  comparison: '/comparison',
  analytics: '/analytics',
  enquiry: '/api/enquiry',
  adminEnquiries: '/api/admin/enquiries',
} as const;

// ═══════════════════════════════════════════════════════════════════
// DICOFLOW PRODUCT DATA
// ═══════════════════════════════════════════════════════════════════

export const TIER_COLORS = {
  T1: { primary: '#3b82f6', light: '#eff6ff', gradient: 'from-blue-500 to-blue-700' },
  T2: { primary: '#14b8a6', light: '#f0fdfa', gradient: 'from-teal-500 to-teal-700' },
  T3: { primary: '#a855f7', light: '#faf5ff', gradient: 'from-purple-500 to-purple-700' },
  T4: { primary: '#f59e0b', light: '#fffbeb', gradient: 'from-amber-500 to-amber-700' },
  T5: { primary: '#10b981', light: '#ecfdf5', gradient: 'from-emerald-500 to-emerald-700' },
} as const;

export const TIERS: Tier[] = [
  {
    id: 'T1',
    name: 'Billing',
    fullName: 'DicoFlow Billing',
    tagline: 'Revenue cycle management for imaging centers',
    description: 'Purpose-built for billing-only diagnostic centers that manage referral-based billing workflows without on-site scanning equipment.',
    target: 'Billing-only imaging centers & referral clinics',
    icon: 'Receipt',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-700',
    bgGradient: 'from-blue-50 to-blue-100',
    moduleIds: ['core', 'billing', 'indian_enterprise'],
    highlights: [
      'Automated invoice generation (INV-YYYYMMDD-NNN)',
      'Razorpay & PayU payment gateway integration',
      'GST compliance with E-Invoice (NIC portal)',
      'PCPNDT regulation tracking',
      'Insurance billing & installment plans',
      'Revenue reporting by modality/doctor/branch',
    ],
  },
  {
    id: 'T2',
    name: 'PACS',
    fullName: 'DicoFlow PACS',
    tagline: 'Medical image acquisition & archival',
    description: 'Receive, store, and view DICOM images from all modalities. Multi-machine ingest with 120+ SOP classes and 45 transfer syntaxes.',
    target: 'Imaging-only facilities & radiology labs',
    icon: 'MonitorDot',
    color: '#14b8a6',
    gradient: 'from-teal-500 to-teal-700',
    bgGradient: 'from-teal-50 to-teal-100',
    moduleIds: ['core', 'pacs', 'processing'],
    highlights: [
      '120+ DICOM SOP classes supported',
      '45 transfer syntaxes (JPEG, JPEG-LS, J2K, RLE)',
      'Multi-machine ingest (0.0.0.0 binding)',
      '4-priority patient matching algorithm',
      'Server-side 3D processing (MPR, VR, segmentation)',
      'Browser-based DICOM viewer with dark mode',
    ],
  },
  {
    id: 'T3',
    name: 'Radiology',
    fullName: 'DicoFlow Radiology',
    tagline: 'Complete diagnostic workflow',
    description: 'Full radiology workflow from image acquisition through reporting, print dispatch, and digital report sharing via WhatsApp, email, and secure links.',
    target: 'Diagnostic centers with radiology departments',
    icon: 'Stethoscope',
    color: '#a855f7',
    gradient: 'from-purple-500 to-purple-700',
    bgGradient: 'from-purple-50 to-purple-100',
    moduleIds: ['core', 'pacs', 'radiology', 'dispatch', 'processing', 'communication'],
    highlights: [
      '14-stage study lifecycle management',
      'Report locking with Redis concurrency control',
      'Immutable report versioning & audit trail',
      'Booklet generation with hospital branding',
      'WhatsApp, Email, SMS report sharing',
      'Secure viewer links (72-hr expiry, password-protected)',
    ],
  },
  {
    id: 'T4',
    name: 'Enterprise',
    fullName: 'DicoFlow Enterprise',
    tagline: 'Complete vertical integration',
    description: 'All 10 modules unlocked. Multi-branch support, SLA tracking, AI hanging protocols, HIPAA/NABH compliance, and advanced billing with PCPNDT and E-Invoice.',
    target: 'Hospital chains, research centers & large institutions',
    icon: 'Building2',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-amber-700',
    bgGradient: 'from-amber-50 to-amber-100',
    moduleIds: ['core', 'billing', 'pacs', 'radiology', 'dispatch', 'processing', 'communication', 'indian_enterprise', 'compliance', 'sla'],
    highlights: [
      'All 10 modules — complete RIS/PACS platform',
      'Multi-branch with corporate revenue rollup',
      'SLA tracking & TAT breach alerts',
      'AI hanging protocols (auto-layout by modality)',
      'HIPAA, NABH, IHE, FHIR compliance',
      'Self-healing orchestrator (7 background services)',
    ],
    isPopular: true,
  },
  {
    id: 'T5',
    name: 'Billing+PACS',
    fullName: 'DicoFlow Billing+PACS',
    tagline: 'Imaging meets revenue management',
    description: 'Hybrid tier combining billing workflows with PACS image acquisition. Register patients, capture DICOMs, and bill — all in one workflow.',
    target: 'Hybrid facilities combining billing + imaging',
    icon: 'Merge',
    color: '#10b981',
    gradient: 'from-emerald-500 to-emerald-700',
    bgGradient: 'from-emerald-50 to-emerald-100',
    moduleIds: ['core', 'billing', 'pacs', 'processing', 'indian_enterprise'],
    highlights: [
      'Patient registration + DICOM acquisition',
      'Auto-invoice after imaging completion',
      'GST & PCPNDT compliance built-in',
      'Booklet printing for patient records',
      '3D processing without radiology overhead',
      'Payment gateway integration (Razorpay/PayU)',
    ],
  },
];

export const MODULES: TierModule[] = [
  {
    id: 'core',
    name: 'Core Platform',
    shortName: 'Core',
    description: 'Authentication, RBAC, audit logging, backup, encryption, self-healing, and WebSocket real-time events.',
    icon: 'Shield',
    tierIds: ['T1', 'T2', 'T3', 'T4', 'T5'],
    highlight: '9 roles, 70+ permissions, SHA-512 audit chain',
    features: [
      { title: 'Ed25519 JWT Authentication', description: '15-min access tokens with 7-day refresh, Redis blacklist on logout' },
      { title: 'RBAC (9 Roles, 70+ Permissions)', description: 'SuperAdmin, Admin, Branch Manager, Radiologist, Technician, Front Desk, Typist, Dispatcher, Viewer' },
      { title: 'Immutable Audit Trail', description: 'SHA-512 hash chain linking every entry. PostgreSQL RULE prevents DELETE. IHE ATNA compliant.' },
      { title: 'AES-256-GCM Encryption', description: 'Envelope encryption (KEK/DEK). Auto-rotate KEK every 90 days. Field-level PHI encryption.' },
      { title: 'Self-Healing Orchestrator', description: '7 background services with auto-recovery: DB, Redis, SCP, Backup, Cache, WebSocket, Key Rotation' },
      { title: 'Real-time WebSocket', description: 'Redis Pub/Sub broadcast for study updates, report notifications, queue changes' },
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Revenue',
    shortName: 'Billing',
    description: 'Invoice generation, payment capture, GST compliance, insurance billing, and revenue reporting.',
    icon: 'IndianRupee',
    tierIds: ['T1', 'T4', 'T5'],
    highlight: 'Automated invoicing with GST & E-Invoice',
    features: [
      { title: 'Auto Invoice Generation', description: 'Sequential INV-YYYYMMDD-NNN numbering with service catalog pricing' },
      { title: 'Payment Gateway Integration', description: 'Razorpay & PayU support. Cash, card, online, check, account transfer modes.' },
      { title: 'GST Compliance', description: 'Input/output tax tracking, GSTIN validation, monthly/quarterly returns' },
      { title: 'Insurance Billing', description: 'Deduction policies, pre-authorization, claim tracking' },
      { title: 'Discount & Refund Workflow', description: 'Admin-approved discounts, credit notes, installment plans' },
      { title: 'Revenue Dashboards', description: 'Daily/monthly reports by modality, referring doctor, branch' },
    ],
  },
  {
    id: 'pacs',
    name: 'PACS & DICOM',
    shortName: 'PACS',
    description: 'DICOM SCP receiver, multi-machine ingest, patient matching algorithm, web viewer, and Orthanc integration.',
    icon: 'Database',
    tierIds: ['T2', 'T3', 'T4', 'T5'],
    highlight: '120+ SOP classes, 45 transfer syntaxes',
    features: [
      { title: 'DICOM SCP Receiver', description: 'C-STORE listener on configurable port. 120+ SOP classes, 45 transfer syntaxes.' },
      { title: 'Multi-Machine Ingest', description: 'Bind 0.0.0.0 for simultaneous reception from multiple modalities' },
      { title: '4-Priority Patient Matching', description: 'Accession → Patient ID → Fuzzy Name/DOB → Unmatched queue' },
      { title: 'Web DICOM Viewer', description: 'Real-time zoom, pan, W/L, measurements, annotations, 1×1 to 3×3 layouts' },
      { title: 'WADO-RS Proxy', description: 'JWT-authenticated REST access to DICOM instances' },
      { title: 'Orthanc Integration', description: 'Optional external PACS bridge via DICOMweb' },
    ],
  },
  {
    id: 'radiology',
    name: 'Radiology Workflow',
    shortName: 'Radiology',
    description: 'Report creation with locking, versioning, PDF generation, study lifecycle management, and template system.',
    icon: 'FileText',
    tierIds: ['T3', 'T4'],
    highlight: '14-stage lifecycle, immutable versioning',
    features: [
      { title: 'Report Lifecycle', description: 'Draft → Under Review → Verified → Amended. Immutable after verification.' },
      { title: 'Redis Report Locking', description: '5-min pessimistic lock with ownership token. "Editing by Dr. Smith" conflict display.' },
      { title: '14-Stage Study Progress', description: 'REGISTERED through ARCHIVED. Role-based progression gates.' },
      { title: 'Template System', description: 'HTML templates with {{VARIABLE}} substitution. Per-hospital customization.' },
      { title: 'PDF Generation', description: 'ReportLab pipeline with hospital branding, signatures, watermarks' },
      { title: 'Study Assignment', description: 'Technician → Radiologist → Typist workflow with auto-assignment option' },
    ],
  },
  {
    id: 'dispatch',
    name: 'Print Dispatch',
    shortName: 'Dispatch',
    description: 'Booklet generation, multi-printer routing (DICOM/GDI/PDF), retry logic, and delivery tracking.',
    icon: 'Printer',
    tierIds: ['T3', 'T4'],
    highlight: '3 printer types, exponential retry',
    features: [
      { title: 'Booklet Rendering', description: 'DICOM images + demographics + report → formatted PDF booklet' },
      { title: 'Multi-Printer Routing', description: 'DICOM SCP, Windows GDI, Linux lp, or PDF file output' },
      { title: 'Printer Discovery', description: 'Network scan + OS printer detection for automatic setup' },
      { title: 'Retry Logic', description: 'Exponential backoff (10s → 30s → 90s), max 3 attempts, dead-letter queue' },
      { title: 'Delivery Tracking', description: 'Queued → Processing → Sent → Printed/Failed status chain' },
      { title: 'Batch Printing', description: 'Queue multiple studies for sequential printing' },
    ],
  },
  {
    id: 'processing',
    name: 'Advanced Processing',
    shortName: 'Processing',
    description: '6 compiled .pyd modules: volume loading, MPR, segmentation, measurements, 3D rendering, AI protocols.',
    icon: 'Cpu',
    tierIds: ['T2', 'T3', 'T4', 'T5'],
    highlight: '6 compiled modules, 12 clinical presets',
    features: [
      { title: 'Volume Processing', description: 'Multi-frame aggregation, slice sorting, isotropic resampling, 12 windowing presets' },
      { title: 'MPR Engine', description: 'Axial/Coronal/Sagittal extraction, oblique planes, slab rendering (MIP/MinIP)' },
      { title: 'Segmentation Engine', description: 'Region growing, thresholding, watershed, connected components, ROI stats' },
      { title: 'Measurement Engine', description: '2D/3D distance, angle, ROI, convex hull diameter, DICOM SR export' },
      { title: '3D Rendering Engine', description: 'MIP, MinIP, raycast, surface rendering, depth-shaded. 8 transfer function presets.' },
      { title: 'AI Hanging Protocol', description: 'Auto-classify series type, detect plane orientation, recommend optimal layout' },
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    shortName: 'Comm',
    description: 'Report sharing via WhatsApp, email, SMS, and secure browser-based viewer links.',
    icon: 'MessageSquare',
    tierIds: ['T3', 'T4'],
    highlight: 'Secure links with 72-hr expiry',
    features: [
      { title: 'WhatsApp Sharing', description: 'Secure link + message via WhatsApp Business API' },
      { title: 'Email Distribution', description: 'PDF attachment + report viewer link' },
      { title: 'SMS Notifications', description: 'Short link to hosted viewer for mobile access' },
      { title: 'Secure Viewer Links', description: 'Token + password protected, 72-hour expiry, browser-based' },
      { title: 'Template Variables', description: '{{PATIENT_NAME}}, {{STUDY_DATE}}, {{MODALITY}}, {{REPORT_LINK}} and more' },
      { title: 'Consent Tracking', description: 'India SPDI compliance — patient consent record with lifetime retention' },
    ],
  },
  {
    id: 'indian_enterprise',
    name: 'Indian Enterprise',
    shortName: 'India',
    description: 'GST compliance, E-Invoice (NIC portal), PCPNDT tracking, TDS reporting, and regional tax forms.',
    icon: 'Landmark',
    tierIds: ['T1', 'T4', 'T5'],
    highlight: 'E-Invoice, PCPNDT, GST',
    features: [
      { title: 'GST Compliance', description: 'Input/output tracking, GSTIN validation, serial generation' },
      { title: 'E-Invoice Integration', description: 'NIC portal API submission, IRN generation' },
      { title: 'PCPNDT Tracking', description: 'Ultrasound + abdomen/fetus → automatic alert and logging' },
      { title: 'TDS Reporting', description: 'Tax deducted at source tracking and annual reports' },
      { title: 'Regional Tax Forms', description: 'State-specific compliance templates' },
      { title: 'Audit-Ready Reports', description: 'GST returns export (monthly/quarterly/annual)' },
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance & Audit',
    shortName: 'Compliance',
    description: 'HIPAA audit trail, NABH logging, IHE profiles (SWF, ATNA, CT), FHIR readiness, and data retention policies.',
    icon: 'ShieldCheck',
    tierIds: ['T4'],
    highlight: '6-year audit retention, IHE ATNA',
    features: [
      { title: 'HIPAA Compliance', description: '45 CFR §164: Access control, audit trails, encryption, person authentication' },
      { title: 'NABH Audit Logging', description: 'National Accreditation Board compliance with data integrity validation' },
      { title: 'IHE Profiles', description: 'SWF (Scheduled Workflow), ATNA (Audit Trail), CT (Consistent Time)' },
      { title: 'Data Retention Policies', description: '6-year configurable retention with auto-archive to cold storage' },
      { title: 'FHIR Readiness', description: 'Future-proof interoperability with HL7 FHIR R4 support' },
      { title: 'Syslog Export', description: 'RFC-3881 syslog export to Splunk, ELK, or remote syslog server' },
    ],
  },
  {
    id: 'sla',
    name: 'SLA & Performance',
    shortName: 'SLA',
    description: 'Turnaround time tracking, breach alerts, workflow automation rules, and performance dashboards.',
    icon: 'Timer',
    tierIds: ['T4'],
    highlight: 'TAT tracking with breach alerts',
    features: [
      { title: 'TAT Tracking', description: 'Turnaround time from registration to report verified, per modality' },
      { title: 'SLA Breach Alerts', description: 'Configurable thresholds, 50% consumed warning, email/SMS alerts' },
      { title: 'Workflow Rules Engine', description: 'Custom business rules for auto-escalation and routing' },
      { title: 'Performance Dashboards', description: 'Daily/weekly reports by doctor, modality, branch' },
      { title: 'Bottleneck Detection', description: 'Identify slow doctors, backed-up modalities, queue lengths' },
      { title: 'Management Reports', description: 'PDF export for monthly TAT review meetings' },
    ],
  },
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  { id: 1, name: 'REGISTERED', label: 'Patient Registered', description: 'Patient demographics entered, study created', role: 'Front Desk', tierIds: ['T1', 'T2', 'T3', 'T4', 'T5'], phase: 'registration', technical: 'Patient record created in DB, queue token assigned' },
  { id: 2, name: 'WAITING', label: 'In Queue', description: 'Patient waiting for technician call', role: 'System', tierIds: ['T2', 'T3', 'T4', 'T5'], phase: 'registration', technical: 'Token status: WAITING, queue position calculated' },
  { id: 3, name: 'CHECKED_IN', label: 'Checked In', description: 'Technician confirms patient arrival', role: 'Technician', tierIds: ['T2', 'T3', 'T4', 'T5'], phase: 'imaging', technical: 'Study stage updated, SCP server readied' },
  { id: 4, name: 'ACQUIRED', label: 'Images Acquired', description: 'DICOM images received from modality', role: 'Technician', tierIds: ['T2', 'T3', 'T4', 'T5'], phase: 'imaging', technical: 'C-STORE SCP receives DICOMs, 4-priority patient match' },
  { id: 5, name: 'RECEIVED', label: 'Ingest Complete', description: 'DICOM ingest processed & indexed', role: 'System', tierIds: ['T2', 'T3', 'T4', 'T5'], phase: 'imaging', technical: 'Metadata extracted, series aggregated, WebSocket broadcast' },
  { id: 6, name: 'UNDER_REVIEW', label: 'Under Review', description: 'Radiologist reviewing study', role: 'Radiologist', tierIds: ['T3', 'T4'], phase: 'reporting', technical: 'Study appears in worklist, viewer opened' },
  { id: 7, name: 'REPORT_DRAFT', label: 'Report Drafted', description: 'Draft report created by radiologist', role: 'Radiologist', tierIds: ['T3', 'T4'], phase: 'reporting', technical: 'Report locked in Redis (5-min TTL), draft saved' },
  { id: 8, name: 'REPORT_VERIFIED', label: 'Report Verified', description: 'Radiologist verified and signed report', role: 'Radiologist', tierIds: ['T3', 'T4'], phase: 'reporting', technical: 'Immutable version created, original preserved, PDF generated' },
  { id: 9, name: 'BOOKLET_GENERATED', label: 'Booklet Ready', description: 'Print booklet template rendered', role: 'System', tierIds: ['T3', 'T4'], phase: 'distribution', technical: 'Images + demographics + report → PDF booklet' },
  { id: 10, name: 'BOOKLET_PRINTED', label: 'Printed', description: 'Physical booklet sent to printer', role: 'System', tierIds: ['T3', 'T4'], phase: 'distribution', technical: 'Dispatch worker routes to DICOM/GDI/PDF printer' },
  { id: 11, name: 'SHARED_DIGITAL', label: 'Shared', description: 'Report shared via WhatsApp/email/link', role: 'Dispatcher', tierIds: ['T3', 'T4'], phase: 'distribution', technical: 'Secure link generated (72-hr, password-protected)' },
  { id: 12, name: 'REPORT_SUBMITTED', label: 'Submitted', description: 'Report sent to referring doctor', role: 'Dispatcher', tierIds: ['T3', 'T4'], phase: 'distribution', technical: 'Template-based notification to referring physician' },
  { id: 13, name: 'INVOICE_PAID', label: 'Payment Received', description: 'Invoice generated & payment collected', role: 'Front Desk', tierIds: ['T1', 'T4', 'T5'], phase: 'billing', technical: 'Auto-invoice generated, payment gateway triggered' },
  { id: 14, name: 'ARCHIVED', label: 'Archived', description: 'Study filed to read-only cold storage', role: 'System', tierIds: ['T1', 'T2', 'T3', 'T4', 'T5'], phase: 'archive', technical: 'Read-only flag set, compliance retention enforced' },
];

export const COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  {
    id: 'hipaa',
    name: 'HIPAA',
    fullName: 'Health Insurance Portability & Accountability Act',
    description: '45 CFR §164 — US federal standard for protecting sensitive patient health information.',
    icon: 'ShieldCheck',
    requirements: ['Access Control (RBAC)', 'Audit Trails (6-year retention)', 'Encryption (AES-256-GCM)', 'Person Authentication (Ed25519 JWT)', 'Transmission Security (TLS 1.3)'],
  },
  {
    id: 'nabh',
    name: 'NABH',
    fullName: 'National Accreditation Board for Hospitals (India)',
    description: 'Indian hospital accreditation standard for data integrity, audit trails, and 5-year retention.',
    icon: 'Award',
    requirements: ['Audit Trails', 'Data Integrity Validation', 'Report Traceability', '5-Year Minimum Retention', 'Access Logging'],
  },
  {
    id: 'ihe',
    name: 'IHE',
    fullName: 'Integrating the Healthcare Enterprise',
    description: 'International framework for improving interoperability of health information technology.',
    icon: 'Network',
    requirements: ['SWF (Scheduled Workflow)', 'ATNA (Audit Trail & Node Auth)', 'CT (Consistent Time via NTP)', 'TLS Mutual Authentication'],
  },
  {
    id: 'dicom',
    name: 'DICOM PS3.15',
    fullName: 'Digital Imaging & Communications in Medicine — Security',
    description: 'International standard for medical image security, transport, and attribute-level encryption.',
    icon: 'Lock',
    requirements: ['TLS 1.3 Transport', 'Attribute-Level Encryption', '120+ SOP Classes', '45 Transfer Syntaxes', 'Structured Reports (SR)'],
  },
  {
    id: 'iso27799',
    name: 'ISO 27799',
    fullName: 'Health Informatics Information Security Management',
    description: 'International standard providing guidelines for organizational information security in healthcare.',
    icon: 'Globe',
    requirements: ['Risk Assessment', 'Information Security Policy', 'Access Control', 'Cryptographic Controls', 'Operations Security'],
  },
  {
    id: 'spdi',
    name: 'India IT Act §43A',
    fullName: 'SPDI Rules 2011 (Sensitive Personal Data)',
    description: 'Indian data protection law for reasonable security practices and consent management.',
    icon: 'Fingerprint',
    requirements: ['Consent Collection', 'Consent Withdrawal', 'Anonymization', 'Reasonable Security', 'Data Breach Notification'],
  },
];

export const PROCESSING_MODULES: ProcessingModule[] = [
  { id: 'volume', name: 'Volume Processing', description: 'Load DICOM series into 3D arrays with 12 clinical windowing presets', capabilities: ['Multi-frame aggregation', 'Slice sorting', 'Isotropic resampling', '12 clinical window presets', 'Hounsfield Unit calibration'], icon: 'Box' },
  { id: 'mpr', name: 'MPR Engine', description: 'Multiplanar reconstruction with oblique and curved planar views', capabilities: ['Axial/Coronal/Sagittal', 'Oblique reconstruction', 'Slab rendering (MIP/MinIP)', 'Curved planar (CPR)', 'Arbitrary rotation matrix'], icon: 'Layers' },
  { id: 'segmentation', name: 'Segmentation Engine', description: 'AI-powered organ and region segmentation algorithms', capabilities: ['Region growing', 'Threshold segmentation', 'Watershed algorithm', 'Connected components', 'ROI statistics'], icon: 'Scan' },
  { id: 'measurement', name: 'Measurement Engine', description: 'Precise 2D/3D distance, angle, and ROI measurements', capabilities: ['2D/3D distance', 'Angle measurement', 'ROI area/stats', 'Convex hull diameter', 'DICOM SR export'], icon: 'Ruler' },
  { id: 'rendering', name: '3D Rendering Engine', description: 'Real-time volume rendering with 8 transfer function presets', capabilities: ['MIP/MinIP projections', 'Raycast rendering', 'Surface rendering', 'Depth-shaded projection', '8 tissue presets'], icon: 'Rotate3d' },
  { id: 'ai_protocol', name: 'AI Hanging Protocol', description: 'Machine learning series classification and viewport layout', capabilities: ['Plane detection', 'Sequence classification', 'Contrast phase estimation', 'Modality-specific typing', 'Auto-layout recommendations'], icon: 'Brain' },
];

export const HERO_STATS: StatItem[] = [
  { value: '5', label: 'Product Tiers', description: 'From billing-only to full enterprise' },
  { value: '10', label: 'Modules', description: 'Core, Billing, PACS, Radiology, and more' },
  { value: '120', suffix: '+', label: 'SOP Classes', description: 'CT, MR, CR, DR, US, PET, NM, and more' },
  { value: '70', suffix: '+', label: 'Permissions', description: '9 roles with granular access control' },
];

export const DICOM_STATS: StatItem[] = [
  { value: '120', suffix: '+', label: 'SOP Classes' },
  { value: '45', label: 'Transfer Syntaxes' },
  { value: '12', label: 'Clinical Presets' },
  { value: '8', label: 'Processing Modules' },
  { value: '14', label: 'Workflow Stages' },
  { value: '9', label: 'User Roles' },
];

export const SUPPORTED_MODALITIES = [
  { name: 'CT', fullName: 'Computed Tomography', icon: 'Scan' },
  { name: 'MRI', fullName: 'Magnetic Resonance', icon: 'Brain' },
  { name: 'X-Ray', fullName: 'Digital Radiography', icon: 'Bone' },
  { name: 'US', fullName: 'Ultrasound', icon: 'Radio' },
  { name: 'PET', fullName: 'Positron Emission', icon: 'Atom' },
  { name: 'NM', fullName: 'Nuclear Medicine', icon: 'Radiation' },
  { name: 'MG', fullName: 'Mammography', icon: 'Heart' },
  { name: 'XA', fullName: 'Angiography', icon: 'Activity' },
  { name: 'CR', fullName: 'Computed Radiography', icon: 'Image' },
  { name: 'DR', fullName: 'Digital Radiography', icon: 'MonitorDot' },
];

// Testimonials removed — add real customer testimonials when available