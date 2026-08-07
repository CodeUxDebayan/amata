import React from 'react';
import styles from './AboutAmata.module.css';

export default function AboutAmata() {
  return (
    <section id="about-amata" className={styles.section}>
      <span className={styles.eyebrow}>About AMATA</span>
      <h2 className={`serif ${styles.headline}`}>
        &quot;Master the Gut-Brain Axis Naturally&quot;
      </h2>

      <div className={styles.intro}>
        <p>
          Derived from the ancient word for <span className={styles.italic}>&quot;Immortal,&quot;</span> AMATA was founded on the belief that true <span className={styles.italic}>immortality is not about living forever, but about fostering a disease-free life and preserving a pure, thriving environment.</span>
        </p>
        <br />
        <p>
          We are a conscious lifestyle brand born from a profound respect for the earth and a relentless commitment to human well-being. <span className={styles.italic}>We believe that true luxury lies in purity, and that the choices we make daily should elevate our lives without leaving a scar on the planet.</span> Guided by a &quot;Farm to Cup&quot; ideology, we craft premium experiences rooted in nature, mindfulness, and uncompromising quality.
        </p>
      </div>

      <h3 className={`serif ${styles.pillarsTitle}`}>Our Core Pillars</h3>
      <p className={styles.pillarsSubtitle} style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: '1.6', color: 'rgba(10,45,51,0.8)' }}>
        Our foundation rests on three interconnected promises that guide every decision we make, every seed we sow, and every product we share with the world:
      </p>
      <div className={styles.pillars}>
        <div className={styles.pillar}>
          <h4><span className={styles.italic}>Sustainable Agriculture &amp; Conscious Living</span></h4>
          <p>We believe that the health of the individual is deeply connected to the health of the soil. AMATA is a movement toward a more mindful, chemical-free existence, fostering a harmonious relationship between what we consume and how we live.</p>
        </div>
        <div className={styles.pillar}>
          <h4><span className={styles.italic}>The &quot;Farm to Cup&quot; Ecosystem</span></h4>
          <p>We don&apos;t just source; we create. To guarantee absolute purity, we manage our entire ecosystem completely in-house. This seamless vertical integration spans from pesticide-free cultivation and ethical processing to upcycled packaging. By holding the reins at every stage, we ensure that our footprint remains small while our integrity remains absolute.</p>
        </div>
        <div className={styles.pillar}>
          <h4><span className={styles.italic}>Zero-Waste Philosophy</span></h4>
          <p>At AMATA, we operate under a simple, undeniable truth: <span className={styles.italic}>&quot;There is nothing called &apos;away.&apos;&quot;</span> When we throw things away, they must go somewhere. Recognizing this, we focus on a circular, <span className={styles.italic}>zero-waste</span> model, utilizing upcycled packaging and ensuring that our dedication to <span className={styles.italic}>good health never comes at the cost of the environment.</span></p>
        </div>
      </div>

      <div className={styles.standard}>
        <h3 className="serif"><span className={styles.italic}>One Standard for Humanity</span></h3>
        <p><span className={styles.italic}>We do not believe in dual standards.</span> Whether a product is destined for international export across the globe or for domestic consumption right here at home, it originates from the exact same pristine source and meets the same rigorous quality benchmarks.</p>
        <p><span className={styles.italic}>We refuse to compromise, because to us, every living soul deserves the best.</span></p>
      </div>

      <p className={styles.conclusion}>
        AMATA is more than a brand; it is a commitment to a healthier gut, a clearer mind, and a thriving planet. Step into a lifestyle where wellness meets conscience.
      </p>
    </section>
  );
}
