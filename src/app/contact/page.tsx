import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — DicoFlow RIS/PACS',
  description: 'Request a demo, get a custom quote, or contact our sales team. Enterprise diagnostic imaging solutions.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-4">
        <EnquiryForm />
      </div>
      <Footer />
    </main>
  );
}
