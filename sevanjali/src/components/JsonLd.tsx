export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Sevanjali Prathishtana",
    alternateName: "Sevanjali Prathishtana Farangipete",
    url: "https://www.sevanjaliprathishtana.com",
    logo: "https://www.sevanjaliprathishtana.com/images/og-image.jpg",
    description:
      "Community-driven NGO from Farangipete, Karnataka, serving through healthcare, education, and social welfare since 1993. 344+ free medical camps and 10,000+ lives impacted.",
    foundingDate: "1993",
    founder: {
      "@type": "Person",
      name: "Sri Krishna Kumar Punja",
      jobTitle: "Management Trustee",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Farangipet Post, Bantwal Taluk",
      addressLocality: "Farangipete",
      addressRegion: "Karnataka",
      postalCode: "574143",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-94485-02319",
      contactType: "general",
      email: "sevanjali.farangipete@gmail.com",
      availableLanguage: ["English", "Kannada"],
    },
    areaServed: {
      "@type": "Place",
      name: "Dakshina Kannada, Karnataka, India",
    },
    knowsAbout: [
      "Free Medical Camps",
      "Educational Scholarships",
      "Blood Donation Drives",
      "Community Welfare",
      "Patient Assistance",
      "Ganeshotsava",
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function DonatePageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Donate to Sevanjali Prathishtana",
    description:
      "Support free medical camps, educational scholarships, and community welfare programmes in Farangipete, Karnataka.",
    recipient: {
      "@type": "NGO",
      name: "Sevanjali Prathishtana",
      url: "https://www.sevanjaliprathishtana.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
