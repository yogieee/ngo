import { siteData } from "@/lib/data";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "Free Medical Camps",
  "Educational Scholarships",
  "Blood Donation Drives",
  "Patient Assistance",
  "Free Health Cards",
  "Eye & Dental Treatments",
];

export function Footer() {
  const { org } = siteData;

  return (
    <footer id="contact" className="bg-earth border-t border-cream/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-accent text-2xl font-semibold text-saffron">
                SP
              </span>
              <span className="font-body text-xs text-cream/60 uppercase tracking-[1.5px]">
                Sevanjali<br />Prathishtana
              </span>
            </div>
            <p className="font-body text-sm text-ash leading-relaxed">
              A community-driven NGO serving Farangipete through healthcare,
              education, and social welfare since 1993.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent text-label font-semibold uppercase tracking-[4px] text-saffron mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-ash hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-accent text-label font-semibold uppercase tracking-[4px] text-saffron mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="font-body text-sm text-ash"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-label font-semibold uppercase tracking-[4px] text-saffron mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-saffron mt-0.5 shrink-0" />
                <span className="font-body text-sm text-ash leading-relaxed">
                  {org.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-saffron shrink-0" />
                <a
                  href={`tel:${org.phone}`}
                  className="font-body text-sm text-ash hover:text-cream transition-colors"
                >
                  {org.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-saffron shrink-0" />
                <a
                  href={`mailto:${org.email}`}
                  className="font-body text-sm text-ash hover:text-cream transition-colors"
                >
                  {org.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href={org.whatsapp}
                target="_blank"
                className="inline-flex items-center gap-2 bg-green-700/20 border border-green-700/30 text-green-400 px-4 py-2 rounded-sm font-body text-sm hover:bg-green-700/30 transition-colors"
              >
                WhatsApp Chat
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-cream/5 text-center">
          <p className="font-body text-xs text-ash/60">
            &copy; {new Date().getFullYear()} Sevanjali Prathishtana &mdash; Serving Humanity Since 1993
          </p>
        </div>
      </div>
    </footer>
  );
}
