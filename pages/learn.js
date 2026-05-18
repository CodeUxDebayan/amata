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
        <div className={styles.certContainer}>
          <div className={styles.certHeader}>
            <span className={styles.eyebrow}>Our Standards</span>
            <h2 className="serif">Certified Purity</h2>
          </div>
          <div className={styles.certLogos}>
            {certifications.map((c) => (
              <div key={c} className={styles.certItem}>
                <div className={styles.certDot}></div>
                <span className="serif">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.testContainer}>
          <div className={styles.testHeader}>
            <span className={styles.eyebrow}>Insights</span>
            <h2 className="serif">Voices of Amata</h2>
          </div>
          <div className={styles.testGrid}>
            {testimonials.map((t) => (
              <div key={t.author} className={styles.testItem}>
                <div className={styles.quoteMark}>"</div>
                <blockquote className="serif">{t.quote.replace(/"/g, '')}</blockquote>
                <div className={styles.testAuthorLine}>
                  <div className={styles.authorLine}></div>
                  <div className={styles.testAuthor}>{t.author}</div>
                </div>
              </div>
            ))}
          </div>
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
            <div className={styles.podMeta}>
              <span className={styles.podLabel}>Audio Series</span>
              <span className={styles.podDuration}>45 Min</span>
            </div>
            <h3 className="serif">The Roots of Wellness</h3>
            <p>
              Join us as we discuss the gut-brain axis, mindfulness, and the origins of Moroheiya in this exclusive interview.
            </p>
            <button className={styles.playBtn}>
              <span className={styles.playIcon}>▶</span> Listen Episode
            </button>
          </div>
        </div>
      </section>

      {/* Ritual video */}
      <section className={styles.ritualSection}>
        <div className={styles.ritualHeader}>
          <span className={styles.eyebrow}>Experience</span>
          <h2 className="serif">The Daily Ritual</h2>
          <p>
            A vibrant, earthy infusion that bridges two ancient worlds. A moment of zen in your daily routine.
          </p>
        </div>
        <div className={styles.vidMask}>
          <img
            src="https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=1470&auto=format&fit=crop"
            loading="lazy"
            alt="Tea ritual"
          />
          <div className={styles.playOverlay}>
            <div className={`serif ${styles.playTxt}`}>Play Film</div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
