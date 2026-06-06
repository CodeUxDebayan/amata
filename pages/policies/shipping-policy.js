import Layout from '../../src/components/layout/Layout';

const title = "Shipping Policy";
const content = [
  "4. Shipping Policy",
  "4.1 Shipping Partners",
  "We partner with DHL Express for international shipments and Delhivery for domestic shipments within India.",
  "Your order’s shipping method will be selected based on your location and package weight.",
  "4.2 Processing Time",
  "Orders are processed within 1–2 business days (excluding weekends and public holidays).",
  "Processing includes quality check, packing, and handing over to the shipping partner.",
  "You will receive a confirmation email with tracking details once shipped.",
  "4.3 Domestic Shipping (India) — Delhivery",
  "Standard Delivery: 3–7 business days.",
  "Express Delivery: 1–3 business days (where available).",
  "Cash on Delivery (COD): Available for select domestic locations.",
  "Delhivery Shipping Notes:",
  "All shipments are on a “SAID TO CONTAIN” basis; Delhivery is not obligated to verify the contents of shipments.",
  "KYC details of the shipper are verified before order creation; incorrect KYC may lead to shipment seizure.",
  "COD orders are subject to additional fees as displayed at checkout.",
  "4.4 International Shipping — DHL Express",
  "We currently ship to select international destinations. Shipping charges and delivery timelines vary by country.",
  "Estimated Delivery: 5–12 business days depending on destination.",
  "Customs Duties & Taxes: International customers are responsible for any customs duties, import taxes, or brokerage fees levied by their country.",
  "Amata is not responsible for delays caused by customs clearance.",
  "DHL Shipping Notes:",
  "All international shipments are subject to 100% X-ray screening to avoid prohibited commodities.",
  "Prohibited items (including counterfeit goods) are not accepted; any shipment found containing prohibited items will be reported to customs.",
  "4.5 Shipping Charges",
  "Domestic: Calculated at checkout based on weight, dimensions, and delivery location.",
  "Free shipping may be offered for orders above a certain value (see Site for current offers).",
  "International: Calculated at checkout based on destination, weight, and service type.",
  "4.6 Order Tracking",
  "Once dispatched, you will receive a tracking link via email/SMS:",
  "Delhivery: Track via https://www.delhivery.com/track/",
  "DHL: Track via https://www.dhl.com/in-en/home/tracking.html",
  "4.7 Delivery Address & Reattempts",
  "Please ensure your shipping address is correct. Amata is not responsible for delays or losses due to incorrect addresses.",
  "If delivery fails due to unavailability of recipient, the courier will make two additional delivery attempts.",
  "After three failed attempts, the package will be returned to us.",
  "In such cases, you will be responsible for re-shipping charges.",
  "4.8 Delayed or Lost Shipments",
  "While we strive for timely deliveries, we are not liable for delays caused by:",
  "Natural disasters, pandemics, strikes, or other force majeure events.",
  "Customs clearance delays (international).",
  "Incorrect address provided by the customer.",
  "If a shipment is confirmed lost by the courier partner, a refund or replacement will be processed after investigation."
];

export default function ShippingPolicy() {
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
