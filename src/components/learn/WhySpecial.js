import { useEffect, useRef } from 'react';
import styles from './WhySpecial.module.css';

const stats = [
  {
    value: '6×',
    label: 'More Vitamin C',
    sub: 'than orange juice',
    icon: '🍊',
    color: '#d4943a',
    desc: 'A single serving of Moroheiya tea provides six times more Vitamin C than an equivalent serving of orange juice — essential for immune function and collagen synthesis.',
  },
  {
    value: '4.5g',
    label: 'Prebiotic Fiber',
    sub: 'per 100g dry weight',
    icon: '🌿',
    color: '#46770c',
    desc: 'Rich in mucilaginous polysaccharides — the most bioavailable prebiotic fiber known to nutrition science, with a gel-forming property that coats and protects the gut lining.',
  },
  {
    value: '0mg',
    label: 'Caffeine',
    sub: 'completely caffeine-free',
    icon: '🌙',
    color: '#86c5d6',
    desc: 'Unlike green tea or matcha, Moroheiya contains zero caffeine — making it perfect for evening rituals and those sensitive to stimulants. Calm without the crash.',
  },
  {
    value: '28+',
    label: 'Micronutrients',
    sub: 'vitamins, minerals & antioxidants',
    icon: '✨',
    color: '#b8693a',
    desc: 'Including Vitamins A, B1, B2, B3, C, and E; calcium, magnesium, potassium, iron, zinc, and a full suite of polyphenols and flavonoids.',
  },
];

export default function WhySpecial() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx, active = true;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          gsap.set(`.${styles.header}`, { y: 0, opacity: 1 });
          gsap.set(`.${styles.card}`, { y: 0, opacity: 1 });
          return;
        }
        // Animate Header
        gsap.fromTo(`.${styles.header}`,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' } }
        );
        // Animate Cards
        gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 + (i * 0.1),
              scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play reverse play reverse' }
            }
          );
        });
      }, sectionRef);
    }
    const t = setTimeout(init, 100);
    return () => { active = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Why It's Special · 特別な理由</p>
        <h2 className={`serif ${styles.title}`}>
          The Science of<br /><em>Extraordinary</em>
        </h2>
        <p className={styles.subtitle}>
          Ancient cultures called it the King's Vegetable. Modern nutritional science is beginning to understand why.
        </p>
      </div>

      <div className={styles.grid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.icon}>{s.icon}</span>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.cardBar} style={{ background: s.color }} />
          </div>
        ))}
      </div>
    </section>
  );
}
