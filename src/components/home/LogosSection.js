import { useEffect, useRef } from 'react';
import styles from './LogosSection.module.css';

const logos = ['USDA ORGANIC', 'JAS CERTIFIED', 'INDIA ORGANIC', 'AYUSH PREMIUM', 'VEGAN SOCIETY', 'NON-GMO PROJECT'];

export default function LogosSection() {
  const trackRef = useRef(null);

  useEffect(() => {
    let gsap;
    async function init() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }
    init();
  }, []);

  const doubled = [...logos, ...logos];

  return (
    <section className={styles.logos}>
      <div ref={trackRef} className={styles.track}>
        {doubled.map((l, i) => (
          <div key={i} className={`serif ${styles.item}`}>{l}</div>
        ))}
      </div>
    </section>
  );
}
