import { useEffect, useRef } from 'react';
import styles from './ThePlant.module.css';

export default function ThePlant() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx, active = true;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.visual}`,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        );
        gsap.fromTo(`.${styles.textBlock}`,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        );
      }, sectionRef);
    }
    const t = setTimeout(init, 100);
    return () => { active = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="the-plant">
      <div className={styles.inner}>
        {/* Visual column */}
        <div className={styles.visual}>
          <div className={styles.imgFrame}>
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1470&auto=format&fit=crop"
              alt="Moroheiya jute plant leaves"
              className={styles.img}
              loading="lazy"
            />
            <div className={styles.imgLabel}>
              <span>Corchorus olitorius</span>
              <span className={styles.imgLabelJp}>モロヘイヤ</span>
            </div>
          </div>
          {/* Botanical details badge */}
          <div className={styles.badge}>
            <div className={styles.badgeRow}><span>Family</span><strong>Malvaceae</strong></div>
            <div className={styles.badgeRow}><span>Origin</span><strong>Bengal Delta</strong></div>
            <div className={styles.badgeRow}><span>Season</span><strong>Monsoon harvest</strong></div>
            <div className={styles.badgeRow}><span>Alt. name</span><strong>Jute leaf / Saluyot</strong></div>
          </div>
        </div>

        {/* Text column */}
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>The Plant · 植物</p>
          <h2 className={`serif ${styles.title}`}>
            Grown where the<br /><em>Ganges meets</em> the sea
          </h2>
          <p className={styles.body}>
            <em>Corchorus olitorius</em> — known as Moroheiya in Japan, Nalta jute in Bengal — is one of the world's most ancient cultivated plants. Pharaonic Egypt prized it as royal medicine. The fertile Bengal Delta, enriched by mineral deposits from the Himalayas, creates an unparalleled terroir.
          </p>
          <p className={styles.body}>
            Amata sources exclusively from small-scale regenerative farms at the delta's edge, where the leaves are grown under traditional shade-cloth, hand-picked at dawn, and steam-refined the same morning — a process borrowed from Kyoto's matcha masters to lock in every molecule of nutrition.
          </p>
          <div className={styles.tags}>
            <span>Regenerative Farming</span>
            <span>Zero Pesticides</span>
            <span>Carbon Negative</span>
          </div>
        </div>
      </div>
    </section>
  );
}
