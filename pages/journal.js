import Layout from '../src/components/layout/Layout';
import JournalHero from '../src/components/journal/JournalHero';
import JournalGrid from '../src/components/journal/JournalGrid.jsx';

export default function JournalPage() {
  return (
    <Layout 
      title="Amata | The Journal — Prebiotic Living & Vagus Nerve Science"
      description="Read insights and research on prebiotic ingredients, Ayurvedic wellness, micro-rituals, and scientific developments around the gut-brain axis."
      canonical="https://amata.in/journal"
    >
      <JournalHero />
      <JournalGrid />
    </Layout>
  );
}
