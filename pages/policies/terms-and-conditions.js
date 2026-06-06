import Layout from '../../src/components/layout/Layout';

const title = "Terms & Conditions";
const content = [
  "5. Terms & Conditions",
  "5.1 Legal Agreement",
  "This document (together with the documents referred to herein) constitutes the entire agreement between you and Amata Jute Tea LLP regarding your use of our website and purchase of our products.",
  "5.2 FSSAI License & Food Safety Compliance",
  "Amata Jute Tea LLP holds an FSSAI Central License (Number: 12826999000241) for the manufacturing of proprietary food under the category “Roasted Jute Leaves”【FSSAI License File】.",
  "Our products are manufactured in compliance with:",
  "Food Safety and Standards Act, 2006.",
  "FSSAI Licensing & Registration Regulations.",
  "Schedule 4 — Sanitary and hygienic requirements for food businesses.",
  "All food handlers in our supply chain are trained under FoSTaC (Food Safety Training and Certification) as mandated by FSSAI.",
  "5.3 Product Liability & Disclaimers",
  "Health Claims: Our Moroheiya tea products are intended as a dietary supplement and part of a healthy lifestyle.",
  "The information on our website regarding gut-brain axis benefits is based on traditional knowledge and preliminary scientific studies.",
  "These statements have not been evaluated by the Drug Controller General of India (DCGI).",
  "Our products are not intended to diagnose, treat, cure, or prevent any disease.",
  "Allergen Information: Our products are manufactured in a facility that processes only Moroheiya leaves, ginger, and cardamom.",
  "However, please review ingredient lists on packaging for any potential allergens.",
  "Pesticide-Free Assurance: Amata products are tested for over 180 pesticides by NABL-accredited laboratories (Eureka Analytical Services).",
  "All results are BLQ (Below Limit of Quantification) and comply with Japan Food Chemical Research Foundation standards.",
  "5.4 Electronic Communication",
  "By using our Site, you consent to receive electronic communications from us (emails, SMS).",
  "You agree that all agreements, notices, and disclosures provided electronically satisfy any legal requirement for written communication.",
  "5.5 Prohibited Conduct",
  "You agree NOT to:",
  "Use the Site for any unlawful purpose.",
  "Interfere with the Site’s security or performance.",
  "Attempt to reverse-engineer any part of the Site.",
  "Scrape, crawl, or use automated scripts to collect data.",
  "Post false, misleading, or fraudulent information.",
  "5.6 Force Majeure",
  "Amata shall not be liable for any delay or failure in performance resulting from causes beyond our reasonable control, including:",
  "Natural disasters (earthquakes, floods, fires).",
  "War, terrorism, civil unrest.",
  "Governmental actions, strikes, lockouts.",
  "Pandemics or epidemics.",
  "5.7 Severability",
  "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
  "5.8 Waiver",
  "Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.",
  "5.9 Third-Party Links",
  "Our Site may contain links to third-party websites (e.g., Razorpay, DHL, Delhivery).",
  "We are not responsible for the content, privacy policies, or practices of any third-party websites.",
  "5.10 Grievance Redressal Mechanism",
  "In compliance with the Consumer Protection (E-Commerce) Rules, 2020:",
  "Grievance Officer: Abhipriya Chatterjee",
  "Contact: contact@amatajutetea.com | +91 83370 40641",
  "Response Time: Complaints shall be acknowledged within 48 hours and resolved within one month from receipt.",
  "5.11 Governing Law & Jurisdiction",
  "These Terms shall be governed by and construed in accordance with the laws of India.",
  "Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts at Kolkata, West Bengal.",
  "5.12 Entire Agreement",
  "These Terms, together with our Privacy Policy, Cancellation & Refund Policy, and Shipping Policy, constitute the entire agreement between you and Amata Jute Tea LLP."
];

export default function TermsAndConditions() {
  return (
    <Layout title={`${title} | Amata`} navTheme="dark">
      <div style={{ padding: '150px 5vw 100px', maxWidth: '800px', margin: '0 auto', color: 'var(--c-deep)' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }} className="serif">{title}</h1>
        {content.map((paragraph, idx) => {
          if (/^\d+\./.test(paragraph)) {
            return <h2 key={idx} style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }} className="serif">{paragraph}</h2>;
          }
          return <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{paragraph}</p>;
        })}
      </div>
    </Layout>
  );
}
