import Layout from '../../src/components/layout/Layout';

const title = "Cancellation & Refund Policy";
const content = [
  "3. Cancellation & Refund Policy",
  "3.1 Order Cancellation by Customer",
  "Before Shipment: You may cancel an order free of charge before it has been dispatched.",
  "To cancel, please contact us via email at contact@amatajutetea.com with your order number.",
  "After Shipment: Once the order has been handed over to our shipping partner (DHL or Delhivery), cancellations are no longer possible.",
  "In such cases, please refer to our Return Policy below.",
  "3.2 Order Cancellation by Amata",
  "We reserve the right to cancel an order for reasons including:",
  "Product unavailability.",
  "Payment verification failure.",
  "Pricing error on the Site.",
  "Suspected fraudulent activity.",
  "In such cases, a full refund will be processed within 7-10 business days to the original payment method.",
  "3.3 Return Policy (Damaged / Defective Products)",
  "Eligibility: Since Amata products are consumable food items, returns are only accepted in the following cases:",
  "Damaged packaging or product received.",
  "Defective product (e.g., incorrect flavour, foreign matter).",
  "Expired product received (manufacturing defect).",
  "Time Limit: Return requests must be made within a day of delivery.",
  "Process:",
  "Take a clear photograph of the damaged/defective product and packaging.",
  "Email the images along with your order number to contact@amatajutetea.com.",
  "Our customer support team will review and approve the return.",
  "Once approved, we will arrange a reverse pickup (where serviceable).",
  "If reverse pickup is not available, you may ship the product back to us; shipping charges will be reimbursed.",
  "Non-Returnable Items:",
  "Products opened or used (except where defect is visible without opening).",
  "Products returned without original packaging.",
  "Products purchased more than a day ago.",
  "Refunds: Upon receiving and inspecting the returned product, a refund will be processed within 7-10 business days to the original payment method.",
  "Refunds will be for the full purchase amount, including original shipping charges, as mandated under the Consumer Protection Act, 2019.",
  "3.4 Refund Process for Failed / Cancelled Orders via Razorpay",
  "For orders cancelled by Amata or failed due to payment gateway issues, refunds are automatically initiated to the original payment source.",
  "UPI refunds may take 3-5 business days, credit/debit cards and net banking may take 5-7 business days.",
  "For status updates, please contact Razorpay support with your payment ID.",
  "3.5 Exchanges",
  "We do not offer exchanges. If you receive a damaged/defective product, please initiate a return as per Section 3.3 and place a fresh order for the desired product."
];

export default function CancellationAndRefundPolicy() {
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
