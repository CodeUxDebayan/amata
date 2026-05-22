import { useState, useEffect, useRef } from 'react';
import styles from './HowToBrew.module.css';

const methods = {
  hot: [
    { step: '01', icon: '💧', title: 'Heat the Water', detail: 'Heat filtered water to 80°C (176°F). Avoid boiling — temperatures above 85°C can degrade the delicate mucilaginous compounds.' },
    { step: '02', icon: '🫖', title: 'Measure your Leaf', detail: 'Place 1–2 teaspoons (2–4g) of Amata Moroheiya into your favourite ceramic teapot or strainer. Quality over quantity.' },
    { step: '03', icon: '⏱️', title: 'Steep & Observe', detail: 'Pour the water over the leaves. Steep for 3–5 minutes. Watch as the liquid slowly takes on a golden-green hue and the mucilage begins to bloom.' },
    { step: '04', icon: '🍵', title: 'Strain & Savour', detail: 'Strain into a warmed cup. Note the silky texture — this is the mucilage at work. Breathe in before the first sip. This is your ritual moment.' },
  ],
  cold: [
    { step: '01', icon: '🧊', title: 'Prepare Cold Water', detail: 'Use 500ml of cold, filtered water. The lower temperature extracts prebiotic compounds slowly, producing a smoother, lighter-bodied brew.' },
    { step: '02', icon: '🫙', title: 'Add Leaves to Jar', detail: 'Add 2 teaspoons (4g) of Amata Moroheiya to a clean glass jar or cold brew vessel. A French press works beautifully.' },
    { step: '03', icon: '🌙', title: 'Refrigerate Overnight', detail: 'Seal and refrigerate for 8–12 hours. The slow extraction honours the leaf — no bitterness, no astringency, only pure botanical goodness.' },
    { step: '04', icon: '🫗', title: 'Strain & Chill', detail: 'Strain into a glass over ice. The cold brew concentrate keeps for up to 48 hours in the refrigerator. Mix 1:1 with water to taste.' },
  ],
};

export default function HowToBrew() {
  const [method, setMethod] = useState('hot');
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx, active = true;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!active || !sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.header}`,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
        );
      }, sectionRef);
    }
    const t = setTimeout(init, 100);
    return () => { active = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  const steps = methods[method];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Brew Guide · 淹れ方</p>
        <h2 className={`serif ${styles.title}`}>
          How to Brew<br /><em>Amata</em>
        </h2>
        <p className={styles.subtitle}>
          Two methods. Both rituals. Choose your pace.
        </p>
      </div>

      {/* Method toggle */}
      <div className={styles.toggle}>
        <button
          className={`${styles.toggleBtn} ${method === 'hot' ? styles.toggleActive : ''}`}
          onClick={() => setMethod('hot')}
        >
          ☕ Hot Brew
        </button>
        <button
          className={`${styles.toggleBtn} ${method === 'cold' ? styles.toggleActive : ''}`}
          onClick={() => setMethod('cold')}
        >
          🧊 Cold Brew
        </button>
      </div>

      {/* Steps */}
      <div className={styles.steps} key={method}>
        {steps.map((s, i) => (
          <div key={s.step} className={styles.stepCard} style={{ '--delay': `${i * 0.08}s` }}>
            <div className={styles.stepIcon}>{s.icon}</div>
            <div className={styles.stepNum}>{s.step}</div>
            <h3 className={`serif ${styles.stepTitle}`}>{s.title}</h3>
            <p className={styles.stepDetail}>{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Pro tip */}
      <div className={styles.tip}>
        <span className={styles.tipIcon}>💡</span>
        <p>
          <strong>Pro tip:</strong> Re-steep the leaves 2–3 times. The second steep at 85°C for 4 minutes often reveals a different, more complex flavour profile as the polysaccharides continue to hydrate.
        </p>
      </div>
    </section>
  );
}
