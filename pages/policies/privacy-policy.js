import Layout from '../../src/components/layout/Layout';

const title = "Privacy Policy";
const content = [
  "2. Privacy Policy",
  "Amata Jute Tea LLP (“we”, “us”, “our”) respects your privacy.",
  "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.",
  "2.1 Information We Collect",
  "Personal Data: We collect personally identifiable information such as:",
  "Name, email address, phone number, shipping/billing address.",
  "Payment information (processed securely by Razorpay; we do not store full card details).",
  "Account login credentials.",
  "Usage Data: Automatically collected information such as IP address, browser type, device information, pages visited, and time spent on our Site.",
  "Cookies and Tracking: We use cookies to improve your browsing experience, analyse Site traffic, and personalise content.",
  "You may disable cookies via your browser settings.",
  "2.2 How We Use Your Information",
  "We use collected information to:",
  "Process and fulfil your orders.",
  "Communicate order status and delivery updates.",
  "Improve our products and customer service.",
  "Send promotional emails (with opt-out option).",
  "Prevent fraudulent transactions.",
  "Comply with legal obligations.",
  "2.3 Sharing Your Information",
  "We do not sell or rent your personal information to third parties. However, we may share information with:",
  "Service Providers: Razorpay (payment processing), DHL and Delhivery (shipping logistics) — only as necessary for order fulfilment.",
  "Legal Authorities: When required by law or to protect our rights.",
  "2.4 Data Security",
  "We implement industry-standard security measures to protect your personal information. Razorpay complies with PCI-DSS standards.",
  "However, no method of transmission over the Internet is 100% secure; we cannot guarantee absolute security.",
  "2.5 Your Rights",
  "Under the Digital Personal Data Protection (DPDP) Act, 2023 and other applicable laws, you have the right to:",
  "Access, correct, or delete your personal data.",
  "Withdraw consent for data processing.",
  "Lodge a complaint with the Data Protection Board of India.",
  "To exercise these rights, contact us at contact@amatajutetea.com.",
  "2.6 Retention of Data",
  "We retain personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.",
  "2.7 Grievance Officer",
  "In compliance with the Consumer Protection (E-Commerce) Rules, 2020, we have appointed a Grievance Officer:",
  "Abhipriya Chatterjee | Email: contact@amatajutetea.com | Phone: +91 83370 40641",
  "Complaints shall be acknowledged within 48 hours and resolved within one month.",
  "2.8 Children’s Privacy",
  "Our Site is not intended for children under 18. We do not knowingly collect personal information from minors.",
  "2.9 Changes to Privacy Policy",
  "We may update this Privacy Policy from time to time. The “Last Updated” date will be revised accordingly."
];

export default function PrivacyPolicy() {
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
