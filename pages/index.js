import Layout from '../src/components/layout/Layout';
import Loader from '../src/components/ui/Loader';
import MarqueeStrip from '../src/components/ui/MarqueeStrip';
import Hero from '../src/components/home/Hero';
import Products from '../src/components/home/Products';
import Philosophy from '../src/components/home/Philosophy';
import ImageBreak from '../src/components/home/ImageBreak';
import Ritual from '../src/components/home/Ritual';
import Journey from '../src/components/home/Journey';
import FaqSection from '../src/components/home/FaqSection';
import AboutSection from '../src/components/home/AboutSection.jsx';
import HomeTeam from '../src/components/home/HomeTeam';
import Testimonials from '../src/components/home/Testimonials';
import LogosSection from '../src/components/home/LogosSection';
import Head from 'next/head';
import products from '../src/data/products';

const MARQUEE_ITEMS_1 = [
  '静寂 · मौनम् · Serenity', '無常 · अनित्यम् · Impermanence', '間 · शून्यम् · Space', 'शांति · Peace',
  '侘び寂び · सहजम् · Wabi-Sabi', 'आयुर्वेद · Ayurveda', '茶道 · पेय विधान · Chado', 'ॐ · Wholeness',
];
const MARQUEE_ITEMS_2 = [
  '自然 · Nature', 'प्राण · Prana', '森林 · Forest', 'पवित्र · Sacred',
  '癒し · Healing', 'अमृत · Amrita', '草 · Herb', 'जड़ी-बूटी · Botanicals',
];

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Amata",
    "url": "https://amata.in",
    "logo": "https://amata.in/images/white-logo.png",
    "description": "Amata is a premium organic prebiotic Moroheiya wellness tea brand. We optimize the gut-brain axis with Ayurvedic ingredients and Japanese tea culture.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-0000000000",
      "contactType": "customer service"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I brew Amata Moroheiya tea?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Steep 1-2 teaspoons of Amata Moroheiya leaves in 200ml of water heated to 80°C (176°F). Let it steep for 3-5 minutes. The longer you steep, the richer the mucilaginous texture becomes — a hallmark of authentic Moroheiya."
        }
      },
      {
        "@type": "Question",
        "name": "What are the gut health benefits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Moroheiya is rich in prebiotic polysaccharides that feed beneficial gut bacteria. This supports microbiome diversity, reduces bloating, enhances nutrient absorption, and strengthens the gut-brain axis via the vagus nerve."
        }
      },
      {
        "@type": "Question",
        "name": "Are your products organic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All Amata products are BMQ Organic certified, JAS (Japan), and India Organic standards. We use zero pesticides, zero synthetic fertilisers, and practice regenerative agriculture."
        }
      }
    ]
  };

  return (
    <Layout 
      title="Amata | Moroheiya Infusion"
      description="Experience the science of the gut-brain axis with Amata's premium organic Moroheiya wellness teas. Bridging Japanese heritage and Ayurvedic wisdom."
      canonical="https://amata.in"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Loader />

      <Hero />

      <MarqueeStrip items={MARQUEE_ITEMS_1} />

      <Products products={products} />

      <MarqueeStrip items={MARQUEE_ITEMS_2} dark reverse />

      <Philosophy />

      <ImageBreak />

      <Ritual />

      <Journey />

      <FaqSection />

      <AboutSection />

      <HomeTeam />

      <Testimonials />

      <LogosSection />
    </Layout>
  );
}
