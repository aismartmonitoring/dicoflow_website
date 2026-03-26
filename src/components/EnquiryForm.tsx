'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIERS } from '@/lib/constants';
import { siteConfig } from '@/config/site-config';
import type { EnquiryFormData } from '@/lib/types';
import { sectionReveal } from '@/lib/animations';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwkgyyqg'; // Formspree endpoint for support@techmasys.in
const CONTACT_EMAIL = 'support@techmasys.in';
const CONTACT_PHONE = '7008918902';
const CONTACT_NAME = 'Viswaranjan Sahoo';

export default function EnquiryForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const inputCls =
    'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all';

  return (
    <section ref={ref} id="enquiry" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold text-sky-700 bg-sky-50 rounded-full uppercase tracking-widest border border-sky-100 mb-5">
            Get Started
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Request a <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Demo</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            For all queries, please use the form below or email <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 underline">{CONTACT_EMAIL}</a> or call <a href={`tel:${CONTACT_PHONE}`} className="text-sky-600 underline">{CONTACT_PHONE}</a>.
          </p>
        </motion.div>
        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="space-y-4 max-w-xl mx-auto"
          target="_blank"
          onSubmit={() => setSubmitState('submitting')}
          onReset={() => setSubmitState('idle')}
        >
          <input type="text" name="fullName" placeholder="Full Name" required className={inputCls} />
          <input type="email" name="email" placeholder="Email" required className={inputCls} />
          <input type="text" name="phone" placeholder="Phone" required className={inputCls} />
          <textarea name="message" placeholder="Your message" required className={inputCls} rows={4} />
          <button type="submit" className="px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition">
            Send
          </button>
          {submitState === 'submitting' && <p className="text-sky-600">Sending...</p>}
          {submitState === 'success' && <p className="text-green-600">Thank you! Your enquiry has been sent.</p>}
          {submitState === 'error' && <p className="text-red-600">There was an error. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
