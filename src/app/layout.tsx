import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DicoFlow — Enterprise RIS/PACS Platform",
  description: "Enterprise-grade Radiology Information System & PACS. 5 tiers, 10 modules, 120+ DICOM SOP classes. HIPAA, NABH, IHE compliant.",
  keywords: "RIS, PACS, DICOM, radiology, medical imaging, HIPAA, NABH, IHE, billing, reporting, enterprise, diagnostic center",
  authors: [{ name: "DicoFlow" }],
  robots: "index, follow",
  openGraph: {
    title: "DicoFlow — Enterprise RIS/PACS for Modern Diagnostic Centers",
    description: "From patient registration to report delivery — one unified platform. 5 tiers, 10 modules, 120+ DICOM SOP classes.",
    type: "website",
    locale: "en_US",
    siteName: "DicoFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "DicoFlow — Enterprise RIS/PACS Platform",
    description: "5 tiers, 10 modules, 120+ DICOM SOP classes. Complete diagnostic workflow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
