import Layout from '../src/components/layout/Layout';
import JournalHero from '../src/components/journal/JournalHero';
import JournalGrid from '../src/components/journal/JournalGrid.jsx';

export default function JournalPage() {
  return (
    <Layout title="Amata | Journal — Brew Master's Insights">
      <JournalHero />
      <JournalGrid />
    </Layout>
  );
}
