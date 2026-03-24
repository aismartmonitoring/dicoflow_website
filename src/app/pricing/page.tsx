import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingComparison from '@/components/PricingComparison';
import EnquiryForm from '@/components/EnquiryForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — DicoFlow RIS/PACS',
  description: 'Compare all 5 DicoFlow tiers side by side. 10 modules across Billing, PACS, Radiology, Enterprise, and Billing+PACS.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-4">
        <PricingComparison />
      </div>
      <EnquiryForm />
      <Footer />
    </main>
  );
}
