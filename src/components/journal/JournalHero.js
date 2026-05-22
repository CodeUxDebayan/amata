import { useEffect, useRef } from 'react';
import styles from './JournalHero.module.css';

export default function JournalHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx, active = true;
    async function init() {
      const { gsap } = await import('gsap');
      if (!active || !sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.eyebrow}`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
        gsap.fromTo(`.${styles.title}`,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3, ease: 'power4.out', delay: 0.4 }
        );
        gsap.fromTo(`.${styles.sub}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
        );
        gsap.fromTo(`.${styles.jpSub}`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.9 }
        );
      }, sectionRef);
    }
    const t = setTimeout(init, 100);
    return () => { active = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Botanical SVG accents */}
      <svg className={`${styles.accent} ${styles.accent1}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C70 30 90 50 50 100 C10 50 30 30 50 0 Z" fill="var(--c-matcha)" />
      </svg>
      <svg className={`${styles.accent} ${styles.accent2}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C80 10 90 40 50 100 C10 40 20 10 50 0 Z" fill="var(--c-terracotta)" />
      </svg>
      <svg className={`${styles.accent} ${styles.accent3}`} viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0 C65 25 70 70 40 120 C10 70 15 25 40 0 Z" fill="var(--c-sky)" />
      </svg>

      <p className={styles.eyebrow}>Brew Master's Insights · 知識と洞察</p>
      <h1 className={`serif ${styles.title}`}>Journal</h1>
      <p className={styles.sub}>
        Insights, stories, and musings drawn from nature's pharmacy.
        <br />A place for quiet reflection and shared wisdom.
      </p>
      <p className={styles.jpSub}>
        自然の知恵から生まれた物語 · ゆっくりと生きる
      </p>
    </section>
  );
}
