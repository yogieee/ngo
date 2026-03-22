"use client";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteData } from "@/lib/data";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const { org } = siteData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${org.email}?subject=${encodeURIComponent(
      formData.subject || "Contact from Website"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">Get in Touch</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Contact</span>{" "}
              <span className="font-bold">Us</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              Whether you want to volunteer, donate, or simply learn more about
              our work, we would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-earth pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ScrollReveal>
              <div className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-saffron" />
                </div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">
                  Phone
                </h3>
                <a
                  href={`tel:${org.phone}`}
                  className="font-body text-sm text-ash hover:text-saffron transition-colors"
                >
                  {org.phone}
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-saffron" />
                </div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${org.email}`}
                  className="font-body text-sm text-ash hover:text-saffron transition-colors break-all"
                >
                  {org.email}
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-700/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">
                  WhatsApp
                </h3>
                <Link
                  href={org.whatsapp}
                  target="_blank"
                  className="font-body text-sm text-ash hover:text-green-400 transition-colors"
                >
                  Chat with us
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-saffron" />
                </div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">
                  Office Hours
                </h3>
                <p className="font-body text-sm text-ash">
                  Mon - Sat: 9am - 6pm
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal>
              <div className="glass-light rounded-xl p-8 lg:p-12">
                <h2 data-cursor-grow className="font-display text-3xl font-bold italic text-earth mb-2">
                  Send us a message
                </h2>
                <p className="font-body text-sm text-earth/60 mb-8">
                  Fill out the form below and we will get back to you as soon as
                  possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-earth/60 uppercase tracking-wider block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-earth/5 border border-earth/10 rounded-lg px-4 py-3 font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:border-saffron/50 transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-earth/60 uppercase tracking-wider block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-earth/5 border border-earth/10 rounded-lg px-4 py-3 font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:border-saffron/50 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-earth/60 uppercase tracking-wider block mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-earth/5 border border-earth/10 rounded-lg px-4 py-3 font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:border-saffron/50 transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-earth/60 uppercase tracking-wider block mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-earth/5 border border-earth/10 rounded-lg px-4 py-3 font-body text-sm text-earth focus:outline-none focus:border-saffron/50 transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option value="Donation Inquiry">Donation Inquiry</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Medical Camp Info">Medical Camp Info</option>
                        <option value="Scholarship Info">Scholarship Info</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs text-earth/60 uppercase tracking-wider block mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-earth/5 border border-earth/10 rounded-lg px-4 py-3 font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:border-saffron/50 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-saffron text-earth px-8 py-3.5 rounded-lg font-body text-sm font-medium hover:bg-terracotta transition-colors"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Location Info */}
            <ScrollReveal delay={150}>
              <div className="space-y-6">
                <div className="glass-light rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-earth mb-2">
                        Our Address
                      </h3>
                      <p className="font-body text-sm text-earth/70 leading-relaxed">
                        {org.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="glass-light rounded-xl overflow-hidden aspect-video sm:aspect-4/3">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15570.5!2d75.0!3d12.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFarangipete!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sevanjali Prathishtana Location"
                    className="w-full h-full"
                  />
                </div>

                <div className="glass-light rounded-xl p-8">
                  <h3 className="font-display text-xl font-bold text-earth mb-4">
                    Quick Connect
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={org.whatsapp}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 bg-green-700/10 border border-green-700/20 text-green-700 px-6 py-3 rounded-lg font-body text-sm font-medium hover:bg-green-700/20 transition-colors"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </Link>
                    <a
                      href={`tel:${org.phone}`}
                      className="inline-flex items-center justify-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron px-6 py-3 rounded-lg font-body text-sm font-medium hover:bg-saffron/20 transition-colors"
                    >
                      <Phone size={18} />
                      Call Us
                    </a>
                    <a
                      href={`mailto:${org.email}`}
                      className="inline-flex items-center justify-center gap-2 bg-earth/5 border border-earth/10 text-earth px-6 py-3 rounded-lg font-body text-sm font-medium hover:bg-earth/10 transition-colors"
                    >
                      <Mail size={18} />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
