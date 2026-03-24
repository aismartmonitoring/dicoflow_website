'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { TIERS } from '@/lib/constants';
import { siteConfig } from '@/config/site-config';
import type { EnquiryFormData } from '@/lib/types';
import { sectionReveal } from '@/lib/animations';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function EnquiryForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    defaultValues: {
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      interestedTier: '',
      branchCount: '1',
      currentSystem: '',
      message: '',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitState('success');
      reset();
      setTimeout(() => setSubmitState('idle'), 5000);
    } catch {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 4000);
    }
  };

  const inputCls =
    'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all';
  const errorCls = 'text-xs text-red-500 mt-1';

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
            Tell us about your facility and we&apos;ll recommend the best DicoFlow tier.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Phone</div>
                    <a href={`tel:${siteConfig.contact.primaryPhone}`} className="text-sm text-slate-600 hover:text-sky-600">
                      {siteConfig.contact.primaryPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Email</div>
                    <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-sm text-slate-600 hover:text-sky-600">
                      {siteConfig.contact.primaryEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Office</div>
                    <div className="text-sm text-slate-600">
                      {siteConfig.address.line1}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}<br />
                      {siteConfig.address.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick info */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <h4 className="font-semibold text-sm mb-3">Why DicoFlow?</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  120+ DICOM SOP classes supported
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  5 tiers — pay for what you need
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  HIPAA, NABH, IHE compliant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Self-healing, zero-downtime design
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Multi-branch with SLA tracking
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                  <input
                    {...register('fullName', { required: 'Name is required' })}
                    placeholder="Dr. John Doe"
                    className={inputCls}
                  />
                  {errors.fullName && <p className={errorCls}>{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Organization *</label>
                  <input
                    {...register('organization', { required: 'Organization is required' })}
                    placeholder="City Diagnostics"
                    className={inputCls}
                  />
                  {errors.organization && <p className={errorCls}>{errors.organization.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                    })}
                    placeholder="john@hospital.com"
                    className={inputCls}
                  />
                  {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Interested Tier</label>
                  <select {...register('interestedTier')} className={inputCls}>
                    <option value="">Select a tier</option>
                    {TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id} — {t.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Count</label>
                  <input
                    type="number"
                    min="1"
                    {...register('branchCount')}
                    placeholder="1"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current System</label>
                <input
                  {...register('currentSystem')}
                  placeholder="e.g. Manual, Legacy RIS, Other vendor"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className={inputCls + ' resize-none'}
                />
              </div>

              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-sky-200 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitState === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : submitState === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Enquiry Sent — We&apos;ll Contact You Soon
                  </>
                ) : submitState === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Failed — Please Try Again
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Enquiry
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-400">
                Your data is encrypted and visible only to {siteConfig.company.name} administrators.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
