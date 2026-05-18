import Layout from '../src/components/layout/Layout';
import JournalHero from '../src/components/journal/JournalHero';
import JournalCarousel from '../src/components/journal/JournalCarousel.jsx';

export default function JournalPage() {
  return (
    <Layout title="Amata | Journal">
      <JournalHero />
      <JournalCarousel />
    </Layout>
  );
}
