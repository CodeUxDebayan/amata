import { useEffect, useRef } from 'react';
import styles from './HomeTeam.module.css';

const members = [
  { img: '/images/niloy.jpg', name: 'Niloy Guha Roy', role: 'Co-Founder · Visionary' },
  { img: '/images/roman.jpg', name: 'Roman Nath',     role: 'Co-Founder · Alchemist' },
];

export default function HomeTeam() {
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
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play reverse play reverse' },
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
    <section ref={sectionRef} className={styles.team}>
      <h2 className={`serif text-center split-text ${styles.heading}`}>The Brew Masters</h2>
      <div className={styles.grid}>
        {members.map((m) => (
          <div key={m.name} className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={m.img} alt={m.name} loading="lazy" />
            </div>
            <div className={styles.name}>{m.name}</div>
            <div className={styles.role}>{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
