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
  return (
    <Layout title="Amata | The Art of Moroheiya">
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
