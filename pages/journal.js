import Layout from '../src/components/layout/Layout';
import JournalHero from '../src/components/journal/JournalHero';
import JournalGrid from '../src/components/journal/JournalGrid.jsx';

export default function JournalPage() {
  return (
    <Layout 
      title="Amata | The Journal — Jute Tea, Prebiotic Living & Wellness"
      description="Insights, research, and stories on prebiotic Jute Tea, Ayurvedic wellness ceremonies, and scientific breakthroughs around the gut-brain axis."
      canonical="https://amatajutetea.com/journal"
    >
      <JournalHero />
      <JournalGrid />
    </Layout>
  );
}
