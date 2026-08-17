import { useEffect, useRef } from 'react';
import styles from './LearnHero.module.css';

export default function LearnHero() {
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
        gsap.fromTo(`.${styles.eyebrow}`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
        );
        gsap.fromTo(`.${styles.title}`,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
        );
        gsap.fromTo(`.${styles.subtitle}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
        );
        gsap.fromTo(`.${styles.scrollCta}`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
        );
        gsap.fromTo(`.${styles.floatLeaf}`,
          { y: 0 },
          { y: -40, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } }
        );
      }, sectionRef);
    }

    const t = setTimeout(init, 100);
    return () => { active = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background layers */}
      <div className={styles.bg} />
      <div className={styles.bgOverlay} />

      {/* Floating botanical accents */}
      <svg className={`${styles.floatLeaf} ${styles.leaf1}`} viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 0 C100 50 110 120 60 200 C10 120 20 50 60 0 Z" fill="rgba(70,119,12,0.12)" />
        <path d="M60 40 C80 80 85 130 60 180 C35 130 40 80 60 40 Z" fill="rgba(70,119,12,0.08)" />
      </svg>
      <svg className={`${styles.floatLeaf} ${styles.leaf2}`} viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C85 40 90 110 50 160 C10 110 15 40 50 0 Z" fill="rgba(184,105,58,0.1)" />
      </svg>

      <div className={styles.content}>
        <p className={styles.eyebrow}>モロヘイヤ · Corchorus olitorius</p>
        <h1 className={`${styles.title}`}>
          What is <em>Moroheiya (jute leaf)?</em>
        </h1>
        <p className={styles.subtitle}>
          The King's Vegetable — grown in the Bengal Delta, refined in the spirit of Kyoto.<br />
          <span>जूट की पत्तियों की कहानी · ジュートの葉の物語</span>
        </p>
        <a href="#the-plant" className={styles.scrollCta}>
          <span className={styles.scrollLine} />
          Discover the Story
        </a>
      </div>

    </section>
  );
}
