import Layout from '../src/components/layout/Layout';
import LearnHero from '../src/components/learn/LearnHero';
import ThePlant from '../src/components/learn/ThePlant';
import WhySpecial from '../src/components/learn/WhySpecial';
import FlavourProfiles from '../src/components/learn/FlavourProfiles';
import GutBrain from '../src/components/learn/GutBrain';
import TimelineJourney from '../src/components/learn/TimelineJourney';
import HowToBrew from '../src/components/learn/HowToBrew';
import Glossary from '../src/components/learn/Glossary';
import styles from '../src/styles/learn.module.css';

const certifications = ['USDA Organic', 'JAS Certified', 'India Organic'];

export default function LearnPage() {
  return (
    <Layout title="Amata | The Living Cycle — Moroheiya Education">
      {/* 1. Cinematic hero: What is Moroheiya? */}
      <LearnHero />

      {/* 2. The Plant — botanical story */}
      <ThePlant />

      {/* 3. Why it's special — animated stat cards */}
      <WhySpecial />

      {/* 4. Flavour Profiles — tabbed blend explorer */}
      <FlavourProfiles />

      {/* 5. The Gut-Brain Story — infographic pathway */}
      <GutBrain />

      {/* 6. From Field to Cup — timeline */}
      <TimelineJourney />

      {/* 7. How to Brew — step-by-step visual guide */}
      <HowToBrew />

      {/* 8. Certifications */}
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

      {/* 9. Glossary — existing component (kept, audited for mobile) */}
      <Glossary />

    </Layout>
  );
}
