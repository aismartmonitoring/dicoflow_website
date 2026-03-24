import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureDeepDive from '@/components/FeatureDeepDive';
import DicomCapabilities from '@/components/DicomCapabilities';
import ProcessingShowcase from '@/components/ProcessingShowcase';
import ViewerShowcase from '@/components/ViewerShowcase';
import FilmPrepShowcase from '@/components/FilmPrepShowcase';
import EnterpriseFeatures from '@/components/EnterpriseFeatures';
import ComplianceSection from '@/components/ComplianceSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — DicoFlow RIS/PACS',
  description: '10 modules, 120+ DICOM SOP classes, advanced 3D processing, HIPAA/NABH compliance. Everything you need for a modern diagnostic center.',
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-4">
        <FeatureDeepDive />
      </div>
      <DicomCapabilities />
      <ProcessingShowcase />
      <ViewerShowcase />
      <FilmPrepShowcase />
      <EnterpriseFeatures />
      <ComplianceSection />
      <Footer />
    </main>
  );
}
