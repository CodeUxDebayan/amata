import { useEffect, useRef } from 'react';
import styles from './Composition.module.css';

const compounds = [
  { icon: '🌿', name: 'L-Theanine',              desc: 'Promotes relaxation without drowsiness, working synergistically to create a calm focus.' },
  { icon: '🧬', name: 'Prebiotic Polysaccharides', desc: 'Nourishes the microbiome, improving gut-brain axis communication and reducing inflammation.' },
  { icon: '✨', name: 'Chlorophyll',              desc: 'High concentration acts as a powerful antioxidant, aiding cellular repair and detox.' },
];

export default function Composition() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
          gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play reverse play reverse' }
            }
          );
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    const timer = setTimeout(init, 100);

    return () => {
      active = false;
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2 className={`serif text-center ${styles.heading}`}>Chemical Composition</h2>
      <div className={styles.grid}>
        {compounds.map((c) => (
          <div key={c.name} className={styles.card}>
            <div className={styles.icon}>{c.icon}</div>
            <h3 className={`serif ${styles.name}`}>{c.name}</h3>
            <p className={styles.body}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
