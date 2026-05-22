import { useEffect, useRef } from 'react';
import styles from './GutBrain.module.css';

const steps = [
  {
    num: '01',
    organ: 'Gut',
    emoji: '🫄',
    color: '#46770c',
    title: 'Prebiotic Arrival',
    desc: 'Moroheiya\'s mucilaginous polysaccharides arrive in the large intestine intact, resisting digestion in the small intestine. Here, they become premium fuel for Bifidobacterium and Lactobacillus.',
  },
  {
    num: '02',
    organ: 'Microbiome',
    emoji: '🦠',
    color: '#d4943a',
    title: 'Microbial Fermentation',
    desc: 'Beneficial bacteria ferment the polysaccharides, producing short-chain fatty acids (SCFAs) — particularly butyrate, propionate, and acetate — the primary signaling molecules of the gut-brain axis.',
  },
  {
    num: '03',
    organ: 'Vagus Nerve',
    emoji: '⚡',
    color: '#86c5d6',
    title: 'Neural Transmission',
    desc: 'SCFAs activate enteroendocrine cells lining the gut, triggering the vagus nerve — the body\'s information superhighway connecting the digestive system directly to the brainstem and limbic system.',
  },
  {
    num: '04',
    organ: 'Brain',
    emoji: '🧠',
    color: '#b8693a',
    title: 'Neuromodulation',
    desc: 'Vagal signals modulate serotonin, GABA, and dopamine production — calming the stress response, enhancing deep sleep architecture, and improving cognitive clarity. This is the gut-brain axis in action.',
  },
];

export default function GutBrain() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx, active = true;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!active || !sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray(`.${styles.step}`).forEach((el, i) => {
          gsap.fromTo(el,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 80%' } }
          );
        });
        // Animate connector lines
        gsap.utils.toArray(`.${styles.connector}`).forEach((el) => {
          gsap.fromTo(el,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%' } }
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
        <p className={styles.eyebrow}>The Science · 腸脳軸</p>
        <h2 className={`serif ${styles.title}`}>
          From Gut to<br /><em>Brain</em>
        </h2>
        <p className={styles.subtitle}>
          How prebiotic polysaccharides travel 1.5 metres of intestine, up the vagus nerve, and into your neural chemistry.
        </p>
      </div>

      <div className={styles.pathway}>
        {steps.map((s, i) => (
          <div key={s.num} className={styles.stepWrap}>
            <div className={`${styles.step} ${i % 2 !== 0 ? styles.stepRight : ''}`}>
              <div className={styles.stepOrb} style={{ background: s.color }}>
                <span className={styles.stepEmoji}>{s.emoji}</span>
                <span className={styles.stepNum}>{s.num}</span>
              </div>
              <div className={styles.stepContent}>
                <div className={styles.organTag} style={{ color: s.color, borderColor: s.color }}>
                  {s.organ}
                </div>
                <h3 className={`serif ${styles.stepTitle}`}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className={styles.connector} style={{ '--c': s.color }}>
                <div className={styles.connectorLine} />
                <div className={styles.connectorArrow} style={{ borderTopColor: steps[i + 1].color }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
