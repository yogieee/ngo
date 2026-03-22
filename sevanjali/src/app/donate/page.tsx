"use client";
import { useRef, useState, useCallback } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteData } from "@/lib/data";
import {
  Heart,
  GraduationCap,
  Droplets,
  HandHeart,
  Building2,
  Smartphone,
  Copy,
  Check,
  MessageCircle,
  Mail,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";

const impactIcons = [Heart, GraduationCap, Droplets, HandHeart];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <div className="flex items-center justify-between py-3 border-b border-cream/5 last:border-0">
      <div>
        <p className="font-body text-xs text-ash uppercase tracking-wider">
          {label}
        </p>
        <p className="font-body text-sm text-cream mt-0.5 font-medium">
          {value}
        </p>
      </div>
      <button
        onClick={copy}
        className="p-2 text-ash hover:text-saffron transition-colors"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export default function DonatePage() {
  const { donate, org } = siteData;

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative bg-earth pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-saffron/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">Support Our Mission</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Donate</span> &amp;{" "}
              <span className="font-bold">Make a Difference</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              Your contribution directly funds free medical camps, educational
              scholarships, and community welfare programmes that have touched
              thousands of lives since 1993.
            </p>

            {/* Quick Impact Stats */}
            <div className="flex gap-3 flex-wrap mt-8">
              {["344+ Camps Funded", "10K+ Lives Touched", "30+ Years of Trust"].map(
                (s) => (
                  <span
                    key={s}
                    className="bg-saffron/10 text-saffron border border-saffron/20 px-4 py-1.5 rounded-full font-body text-sm backdrop-blur-md"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="bg-earth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bank Transfer Card */}
            <ScrollReveal>
              <div className="glass rounded-xl p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-saffron/10 rounded-sm flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-cream">
                      Bank Transfer
                    </h2>
                    <p className="font-body text-xs text-ash">
                      Direct bank transfer / NEFT / RTGS
                    </p>
                  </div>
                </div>

                <div className="space-y-0">
                  <CopyField
                    label="Account Name"
                    value={donate.bankDetails.accountName}
                  />
                  <CopyField
                    label="Account Number"
                    value={donate.bankDetails.accountNumber}
                  />
                  <CopyField
                    label="Bank Name"
                    value={donate.bankDetails.bankName}
                  />
                  <CopyField
                    label="Branch"
                    value={donate.bankDetails.branch}
                  />
                  <CopyField
                    label="IFSC Code"
                    value={donate.bankDetails.ifsc}
                  />
                </div>

                {/* Tax Info */}
                <div className="mt-8 p-4 bg-turmeric/10 border border-turmeric/20 rounded-sm">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-turmeric mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-sm text-cream font-medium">
                        Tax Deduction under 80G
                      </p>
                      <p className="font-body text-xs text-ash mt-1 leading-relaxed">
                        Donations to Sevanjali Prathishtana are eligible for tax
                        deduction under Section 80G of the Income Tax Act.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* UPI Card */}
            <ScrollReveal delay={150}>
              <div className="glass rounded-xl p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-saffron/10 rounded-sm flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-cream">
                      UPI Payment
                    </h2>
                    <p className="font-body text-xs text-ash">
                      PhonePe, GPay, PayTM, BHIM & more
                    </p>
                  </div>
                </div>

                {/* UPI Details */}
                <div className="space-y-0 mb-8">
                  <CopyField
                    label="Merchant Name"
                    value={donate.upi.merchantName}
                  />
                  <CopyField label="UPI ID" value={donate.upi.upiId} />
                </div>

                {/* UPI Platforms */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {["PhonePe", "GPay", "PayTM", "BHIM", "BharatPay", "Baroda Pay"].map(
                    (app) => (
                      <span
                        key={app}
                        className="bg-cream/5 border border-cream/10 text-cream/80 px-3 py-1 rounded-full font-body text-xs backdrop-blur-md"
                      >
                        {app}
                      </span>
                    )
                  )}
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  <p className="font-accent text-label text-saffron uppercase mb-4">
                    How to Pay
                  </p>
                  {[
                    "Open any UPI app on your phone",
                    "Scan QR code or enter the UPI ID above",
                    "Enter your donation amount",
                    "Confirm and complete the payment",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-display text-lg text-saffron/50 font-light shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body text-sm text-cream/80 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* After Donating Note */}
                <div className="mt-8 p-4 bg-saffron/10 border border-saffron/20 rounded-sm">
                  <p className="font-body text-sm text-cream font-medium">
                    After donating
                  </p>
                  <p className="font-body text-xs text-ash mt-1 leading-relaxed">
                    Please WhatsApp or email us after transferring so we can
                    acknowledge your donation and send a receipt.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Where Your Donation Goes */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="text-saffron mb-4">
              Your Impact
            </SectionLabel>
            <h2 data-cursor-grow className="font-display text-section font-bold italic text-earth leading-[1.05] mb-12">
              Where your donation goes
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donate.impactAreas.map((area, i) => {
              const Icon = impactIcons[i];
              return (
                <ScrollReveal key={area.title} delay={i * 100}>
                  <div className="glass-light rounded-xl p-8 lg:p-10 group hover:bg-white/60 transition-all duration-300 shadow-sm">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-saffron/10 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-saffron/20 transition-colors">
                        <Icon className="w-7 h-7 text-saffron" />
                      </div>
                      <div>
                        <h3 className="font-display text-[24px] font-bold text-earth">
                          {area.title}
                        </h3>
                        <p className="font-body text-sm text-earth/60 mt-2 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact After Donating */}
      <section className="bg-earth py-24 lg:py-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <SectionLabel className="mb-4">Get in Touch</SectionLabel>
            <h2 data-cursor-grow className="font-display text-section font-bold italic text-cream leading-[1.05]">
              Questions about donating?
            </h2>
            <p className="font-body text-base text-ash font-light mt-6 leading-relaxed">
              We&apos;re here to help. Reach out to us on WhatsApp or email and
              we&apos;ll respond promptly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href={org.whatsapp}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-green-700/20 border border-green-700/30 text-green-400 px-8 py-3.5 rounded-xl font-body text-sm font-medium hover:bg-green-700/30 transition-colors backdrop-blur-md"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </Link>
              <Link
                href={`mailto:${org.email}`}
                className="inline-flex items-center justify-center gap-2 bg-cream/5 border border-cream/10 text-cream px-8 py-3.5 rounded-xl font-body text-sm font-medium hover:bg-cream/10 transition-colors backdrop-blur-md"
              >
                <Mail size={18} />
                Email Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Every contribution counts
            </p>
            <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
              Be a part of something meaningful
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Your generosity fuels 30+ years of community service. Together, we
              can continue making a difference.
            </p>
            <div className="mt-10">
              <MagneticButton variant="dark" href="/">
                <span className="flex items-center gap-2">
                  Back to Home <ArrowRight size={16} />
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
