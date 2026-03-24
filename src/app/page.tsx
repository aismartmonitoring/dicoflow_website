import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductOverview from '@/components/ProductOverview';
import TierShowcase from '@/components/TierShowcase';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProductOverview />
      <TierShowcase />
      <EnquiryForm />
      <Footer />
    </main>
  );
}
