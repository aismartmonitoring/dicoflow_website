import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkflowVisualization from '@/components/WorkflowVisualization';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workflow — DicoFlow RIS/PACS',
  description: '14-stage diagnostic study lifecycle. From patient registration through image acquisition, reporting, dispatch, billing, and archival.',
};

export default function WorkflowPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-4">
        <WorkflowVisualization />
      </div>
      <Footer />
    </main>
  );
}
