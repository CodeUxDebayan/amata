import Layout from '../../src/components/layout/Layout';

const title = "Terms of Service";
const content = [
  "1. Terms of Service",
  "Welcome to Amata Jute Tea LLP (“Company”, “we”, “us”, “our”).",
  "These Terms of Service (“Terms”) govern your use of our website [amata-lilac.vercel.app] (the “Site”) and purchase of Amata Moroheiya Tea products.",
  "By accessing the Site or placing an order, you agree to be bound by these Terms.",
  "1.1 Eligibility",
  "You must be at least 18 years of age to use our Site or purchase our products.",
  "By agreeing to these Terms, you represent that you are legally capable of entering into binding contracts.",
  "1.2 Account Registration",
  "To place orders, you may be required to create an account. You agree to:",
  "Provide accurate, current, and complete information.",
  "Maintain the security of your login credentials.",
  "Promptly update your account information.",
  "We reserve the right to suspend or terminate accounts that violate these Terms.",
  "1.3 Products & Pricing",
  "Product Descriptions: Our products, including Ginger Moroheiya Infusion and Elaichi Moroheiya Infusion, are described on our Site.",
  "While we strive for accuracy, we do not warrant that product descriptions, images, or other content are error-free.",
  "Pricing: All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes (GST), unless otherwise stated.",
  "Prices are subject to change without notice; however, changes will not affect orders already accepted.",
  "Pesticide-Free & Certification Assurance: Amata products are third-party tested for pesticides and carry FSSAI Central License, HACCP, WHO-GMP, and Organic certifications.",
  "All test reports are available upon request.",
  "1.4 Orders & Acceptance",
  "Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for reasons including:",
  "Product unavailability.",
  "Errors in pricing or product description.",
  "Suspicion of fraudulent or unauthorised transaction.",
  "Order confirmation will be sent via email upon acceptance.",
  "1.5 Payment Terms",
  "We accept payments via Razorpay payment gateway. Payment methods include credit/debit cards, net banking, UPI, and other methods as made available on the checkout page.",
  "By providing payment information, you represent that you are authorised to use the chosen payment method.",
  "All payments are processed through Razorpay’s secure, PCI-DSS compliant gateway.",
  "Razorpay requires KYC documents including PAN, GST, and bank account details for payout settlement.",
  "Transaction limits as per RBI guidelines apply.",
  "You agree to pay all charges incurred by you or any user of your account.",
  "In case of payment failure, no order will be processed.",
  "1.6 Intellectual Property",
  "All content on the Site — including logos, text, graphics, images, the Amata brand name, “不死の緑”, “अमृत हरित”, and product packaging — is the exclusive property of Amata Jute Tea LLP.",
  "You may not reproduce, distribute, modify, or create derivative works without our prior written consent.",
  "1.7 Limitation of Liability",
  "To the maximum extent permitted by law, Amata Jute Tea LLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:",
  "Use or inability to use the Site.",
  "Purchase or use of our products.",
  "Any unauthorised access to or alteration of your data.",
  "Our total liability for any claim arising out of these Terms shall not exceed the amount you paid for the product in the preceding 12 months.",
  "1.8 Indemnification",
  "You agree to indemnify, defend, and hold harmless Amata Jute Tea LLP and its officers, employees, and agents from any claims, damages, or expenses arising from your breach of these Terms or violation of any law.",
  "1.9 Governing Law & Dispute Resolution",
  "These Terms shall be governed by the laws of India.",
  "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.",
  "1.10 Modifications to Terms",
  "We reserve the right to update these Terms at any time. Changes will be effective upon posting on the Site.",
  "Your continued use of the Site after changes constitutes acceptance.",
  "1.11 Contact Us",
  "For any questions regarding these Terms, please contact our global offices:",
  "India HQ: Amata Jute Tea LLP, Arch Square, Block EP & GP, Unit 201, Salt Lake City, Sector-V, Kolkata, West Bengal — 700091, India. Email: contact@amatajutetea.com | Phone: +91 877 739 5787",
  "UK Office: Presidency Limited, 124 City Road, London EC1V 2NX, United Kingdom",
  "Japan Office: MARUNOUCHIBUSSAN CO.LTD, 12-4 Kasuga Ashiya Hyogo, 6590021, Japan | Ph: +81-70-9105-3657 | Email: contact@amatajutetea.com"
];

export default function TermsOfService() {
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
