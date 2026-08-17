import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../src/components/layout/Layout';
import LearnHero from '../src/components/learn/LearnHero';
import ThePlant from '../src/components/learn/ThePlant';
import AboutAmata from '../src/components/learn/AboutAmata';
import WhySpecial from '../src/components/learn/WhySpecial';
import FlavourProfiles from '../src/components/learn/FlavourProfiles';
import GutBrain from '../src/components/learn/GutBrain';
import TimelineJourney from '../src/components/learn/TimelineJourney';
import HowToBrew from '../src/components/learn/HowToBrew';
import Glossary from '../src/components/learn/Glossary';
import LabSection from '../src/components/learn/LabSection';
import styles from '../src/styles/learn.module.css';

const compliances = [
  { name: 'BQM- ORGANIC', icon: '/images/icon_cert/BQM.png' },
  { name: 'BQM- HACCP', icon: '/images/icon_cert/BQM.png' },
  { name: 'WHOGMP', icon: '/images/icon_cert/Screenshot 2026-06-03 220055.png' },
  { name: 'FSSAI', icon: '/images/icon_cert/FSSAI.png' },
];

export default function LearnPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !pageRef.current) return;

      ctx = gsap.context(() => {
        // Global scroll reveal removed to prevent conflicts with internal section triggers
        // and scroll height calculation issues.
      }, pageRef);

      // Force refresh of ScrollTrigger and Lenis at intervals as page content loads
      for (const delay of [200, 600, 1200, 2000, 4000]) {
        setTimeout(() => {
          if (!active) return;
          ScrollTrigger.refresh();
          window.lenis?.resize();
        }, delay);
      }
    }

    const timer = setTimeout(init, 200);

    return () => {
      active = false;
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={pageRef}>
      <Layout 
        title="Amata | The Science of Moroheiya Jute Tea & Gut-Brain Axis"
        description="Discover the science behind Moroheiya Jute Tea. Learn how our organic prebiotic Jute Leaf infusions support the gut-brain axis, vagus nerve, and microbiome."
        canonical="https://amatajutetea.com/learn"
      >
        {/* 1. Cinematic hero: What is Moroheiya? */}
        <LearnHero />

        {/* About Amata Section */}
        <AboutAmata />

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
              {compliances.map((c, idx) => (
                <Link key={idx} href="/compliances" className={styles.certItem}>
                  <div className={styles.certIconWrapper}>
                    <img src={c.icon} alt={`${c.name} Icon`} className={styles.certIcon} />
                  </div>
                  <span className={styles.certName}>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Testing Section */}
        <LabSection />

        {/* 9. Glossary — existing component (kept, audited for mobile) */}
        <Glossary />

      </Layout>
    </div>
  );
}
