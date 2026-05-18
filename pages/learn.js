import Layout from '../src/components/layout/Layout';
import LearnHero from '../src/components/learn/LearnHero';
import Composition from '../src/components/learn/Composition';
import TimelineJourney from '../src/components/learn/TimelineJourney';
import Glossary from '../src/components/learn/Glossary';
import LabSection from '../src/components/learn/LabSection';
import BrewMasters from '../src/components/learn/BrewMasters';
import styles from '../src/styles/learn.module.css';

const certifications = ['USDA Organic', 'JAS Certified', 'India Organic'];
const testimonials = [
  { quote: '"Amata transformed my morning ritual. It\'s grounded, pure, and deeply calming."', author: 'Sarah Jenkins' },
  { quote: '"The matcha notes blended with the herbal earthiness is unlike anything I\'ve tasted."', author: 'David Chen' },
];

export default function LearnPage() {
  return (
    <Layout title="Amata | The Living Cycle">
      <LearnHero />

      <Composition />

      <TimelineJourney />

      <Glossary />

      <LabSection />

      <BrewMasters />

      {/* Certifications */}
      <section className={styles.certSection}>
        <h2 className="serif text-center" style={{ marginBottom: '3rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Certified Purity
        </h2>
        <div className={styles.certLogos}>
          {certifications.map((c) => (
            <span key={c} className="serif">{c}</span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2 className="serif text-center" style={{ marginBottom: '4rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Customer Insights
        </h2>
        <div className={styles.testGrid}>
          {testimonials.map((t) => (
            <div key={t.author} className={styles.testItem}>
              <blockquote className="serif">{t.quote}</blockquote>
              <div className={styles.testAuthor}>— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Podcast placeholder */}
      <section className={styles.podcastSection}>
        <div className={styles.podcastCard}>
          <div className={styles.podImg}>
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1374&auto=format&fit=crop"
              loading="lazy"
              alt="Podcast"
            />
          </div>
          <div className={styles.podContent}>
            <div className={styles.podLabel}>Listen Now</div>
            <h3 className="serif" style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>The Roots of Wellness</h3>
            <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
              Join us as we discuss the gut-brain axis, mindfulness, and the origins of Moroheiya.
            </p>
            <button className={styles.playBtn}>▶ Play Episode</button>
          </div>
        </div>
      </section>

      {/* Ritual video */}
      <section className={styles.ritualSection}>
        <h2 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem' }}>The Ritual</h2>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '2rem' }}>
          A vibrant, earthy infusion that bridges two ancient worlds. A moment of zen in your daily routine.
        </p>
        <div className={styles.vidMask}>
          <img
            src="https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=1470&auto=format&fit=crop"
            loading="lazy"
            alt="Tea ritual"
          />
          <div className={`serif ${styles.playTxt}`}>Play Film</div>
        </div>
      </section>

    </Layout>
  );
}
