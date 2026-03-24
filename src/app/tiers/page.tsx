import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TierShowcase from '@/components/TierShowcase';
import PricingComparison from '@/components/PricingComparison';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Tiers — DicoFlow RIS/PACS',
  description: 'Explore 5 DicoFlow tiers: Billing, PACS, Radiology, Enterprise, and Billing+PACS. Each tier is a complete production-ready application.',
};

export default function TiersPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TierShowcase />
      <PricingComparison />
      <Footer />
    </main>
  );
}
