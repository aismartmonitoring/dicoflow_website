/**
 * Professional TypeScript Type Definitions
 * Comprehensive type system for medical imaging application
 */

// Core UI Types
export interface ComponentBaseProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface AnimationProps {
  animate?: boolean;
  duration?: number;
  delay?: number;
  easing?: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

// Medical Imaging Types
export interface MedicalImage {
  id: string;
  url: string;
  alt: string;
  format: 'DICOM' | 'JPEG' | 'PNG' | 'TIFF';
  dimensions: {
    width: number;
    height: number;
  };
  fileSize: number;
  createdAt: Date;
  metadata?: MedicalImageMetadata;
}

export interface MedicalImageMetadata {
  patientId?: string;
  studyDate?: Date;
  modality?: string;
  bodyPart?: string;
  institution?: string;
  physicianName?: string;
  studyDescription?: string;
}

// DICOM Quality Comparison Types
export interface ComparisonData {
  id: number;
  title: string;
  description: string;
  radiyugImage: string;
  traditionalImage: string;
  benefits: string[];
  metadata?: ComparisonMetadata;
}

export interface ComparisonMetadata {
  contrastRatio?: number;
  resolutionImprovement?: number;
  processingTime?: number;
  qualityScore?: number;
}

// Quality Metrics Types
export interface QualityMetric {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface QualityFeature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  benefits?: string[];
}

// Navigation and Layout Types
export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: NavigationDropdownItem[];
  external?: boolean;
}

export interface NavigationDropdownItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
}

// Form and Input Types
export interface FormFieldProps extends ComponentBaseProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
  department?: string;
  lastLogin?: Date;
  preferences?: UserPreferences;
}

export type UserRole = 'admin' | 'radiologist' | 'technician' | 'viewer';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  defaultImageFormat: string;
  language: string;
}

// Theme and Styling Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  borderRadius: number;
  fontSize: number;
}

// Analytics and Tracking Types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp: Date;
}

export interface PageviewEvent extends AnalyticsEvent {
  page: string;
  referrer?: string;
  userAgent?: string;
}

// Error Handling Types
export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event Handler Types
export type EventHandler<T = HTMLElement> = (event: React.SyntheticEvent<T>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type ClickHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;
export type KeyboardHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;

// Size and Dimension Types
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SpacingSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

// Status Types
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Medical Device Integration Types (for future expansion)
export interface DeviceConnection {
  id: string;
  name: string;
  type: 'printer' | 'scanner' | 'workstation';
  status: 'connected' | 'disconnected' | 'error';
  lastSeen?: Date;
  capabilities?: string[];
}

export interface PrintJob {
  id: string;
  imageId: string;
  deviceId: string;
  status: ProcessingStatus;
  settings: PrintSettings;
  createdAt: Date;
  completedAt?: Date;
}

export interface PrintSettings {
  quality: 'draft' | 'normal' | 'high' | 'medical-grade';
  paperSize: string;
  orientation: 'portrait' | 'landscape';
  copies: number;
  colorMode: 'grayscale' | 'color';
}

// ═══════════════════════════════════════════════════════════════════
// DicoFlow Product Types
// ═══════════════════════════════════════════════════════════════════

export type TierId = 'T1' | 'T2' | 'T3' | 'T4' | 'T5';

export interface Tier {
  id: TierId;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  target: string;
  icon: string;
  color: string;
  gradient: string;
  bgGradient: string;
  moduleIds: string[];
  highlights: string[];
  isPopular?: boolean;
}

export interface TierModule {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  tierIds: TierId[];
  features: TierFeature[];
  highlight?: string;
}

export interface TierFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface WorkflowStage {
  id: number;
  name: string;
  label: string;
  description: string;
  role: string;
  tierIds: TierId[];
  phase: 'registration' | 'imaging' | 'reporting' | 'distribution' | 'billing' | 'archive';
  technical: string;
}

export interface ComplianceStandard {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  requirements: string[];
}

export interface ProcessingModule {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  icon: string;
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  description?: string;
}

export interface EnquiryFormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  interestedTier: TierId | '';
  branchCount: string;
  currentSystem: string;
  message: string;
}

export interface Enquiry extends EnquiryFormData {
  id: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'closed';
  ip?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  avatar?: string;
  rating: number;
  tier?: TierId;
}