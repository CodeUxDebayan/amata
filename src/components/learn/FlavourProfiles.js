import { useState, useEffect, useRef } from 'react';
import styles from './FlavourProfiles.module.css';

const blends = [
  {
    id: 'classic',
    name: 'Classic',
    nameJp: 'クラシック',
    tagline: 'The Pure Foundation',
    color: '#46770c',
    bg: '#f4f8ee',
    notes: ['Earthy', 'Silky', 'Mineral', 'Gentle sweetness'],
    wheel: ['🌿 Vegetal', '🌊 Oceanic', '🍃 Fresh grass', '💧 Clean mineral'],
    brew: { temp: '80°C', time: '3–4 min', ratio: '2 tsp / 200ml' },
    desc: 'The purest expression of Moroheiya — our unblended single-origin leaf. Delicate and nuanced, with the characteristic silky mucilaginous texture and a naturally sweet, herbaceous finish that evolves with each steep.',
  },
  {
    id: 'ginger',
    name: 'Ginger',
    nameJp: 'ジンジャー',
    tagline: 'Fire & Earth',
    color: '#d4943a',
    bg: '#fef8f0',
    notes: ['Warming', 'Spiced', 'Bright', 'Zesty citrus'],
    wheel: ['🫚 Root spice', '🍋 Citrus peel', '🌶️ Gentle heat', '🌿 Herbal base'],
    brew: { temp: '85°C', time: '4–5 min', ratio: '2 tsp / 200ml' },
    desc: 'Organic ginger root and a touch of natural citrus peel amplify Moroheiya\'s digestive properties into an invigorating morning ritual. The warmth builds gradually — a conversation between earth and fire.',
  },
  {
    id: 'elaichi',
    name: 'Elaichi',
    nameJp: 'エラチ',
    tagline: 'Aromatic Calm',
    color: '#86c5d6',
    bg: '#f0f8fb',
    notes: ['Floral', 'Aromatic', 'Cooling', 'Bittersweet'],
    wheel: ['🌸 Green cardamom', '🌺 Floral musk', '🍃 Herbal green', '✨ Sweet finish'],
    brew: { temp: '78°C', time: '3–4 min', ratio: '1.5 tsp / 200ml' },
    desc: 'Green Elaichi (cardamom) pods from Kerala\'s Cardamom Hills marry the prebiotic Moroheiya Jute Leaves base with an aromatic complexity that cools the mind and settles the stomach. The perfect evening companion.',
  },
  {
    id: 'honey',
    name: 'Honey',
    nameJp: 'ハニー',
    tagline: 'Sweet Comfort',
    color: '#b38b36',
    bg: '#fdfbf6',
    notes: ['Sweet', 'Smooth', 'Coating', 'Soothing'],
    wheel: ['🍯 Natural nectar', '🌼 Meadow sweet', '🍃 Earthy core', '✨ Golden finish'],
    brew: { temp: '80°C', time: '3–4 min', ratio: '2 tsp / 200ml' },
    desc: 'A naturally sweet, smooth blend combining the earthy depth of Moroheiya Jute Leaves with natural honey granules. A soothing remedy to coat and calm the digestive tract.',
  },
  {
    id: 'citrus',
    name: 'Citrus',
    nameJp: 'シトラス',
    tagline: 'Bright & Zesty',
    color: '#c57e2a',
    bg: '#fef9f2',
    notes: ['Zesty', 'Bright', 'Refreshing', 'Clean'],
    wheel: ['🍋 Lemon peel', '🍊 Orange burst', '🌿 Fresh herb', '✨ Crisp finish'],
    brew: { temp: '80°C', time: '3–4 min', ratio: '2 tsp / 200ml' },
    desc: 'A bright, zesty blend of premium Moroheiya Jute Leaves infused with organic orange peel and lemon peel. Revitalizes your senses and supports daily detoxification.',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    nameJp: 'シナモン',
    tagline: 'Warming Spice',
    color: '#965b3c',
    bg: '#f9f5f3',
    notes: ['Warming', 'Sweet spice', 'Comforting', 'Rich'],
    wheel: ['🪵 Cinnamon bark', '🍂 Autumn spice', '🍃 Deep earth', '✨ Lingering sweet'],
    brew: { temp: '80°C', time: '4 min', ratio: '2 tsp / 200ml' },
    desc: 'A sweet, warming blend of premium Moroheiya Jute Leaves and high-grade organic cinnamon bark. A comforting tea that helps regulate metabolic health and supports digestion.',
  },
  {
    id: 'lemongrass',
    name: 'Lemongrass',
    nameJp: 'レモングラス',
    tagline: 'Cooling Refresh',
    color: '#6b8e23',
    bg: '#f5f8f1',
    notes: ['Citrusy', 'Crisp', 'Cooling', 'Uplifting'],
    wheel: ['🌱 Lemon grass', '🍃 Cool herb', '💧 Fresh dew', '✨ Light finish'],
    brew: { temp: '80°C', time: '3–5 min', ratio: '2 tsp / 200ml' },
    desc: 'A citrusy, refreshing blend of nutrient-dense Moroheiya Jute Leaves and organic cut lemongrass. Perfect for cooling down, boosting immunity, and uplifting your mood.',
  },
];

export default function FlavourProfiles() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx, activeFlag = true;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!activeFlag || !sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.header}`,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' } }
        );
        gsap.fromTo(`.${styles.panel}`,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' } }
        );
      }, sectionRef);
    }
    const t = setTimeout(init, 100);
    return () => { activeFlag = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  const blend = blends[active];

  return (
    <section ref={sectionRef} className={styles.section} style={{ '--blend-color': blend.color, '--blend-bg': blend.bg }}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Flavour Profiles · 風味プロファイル</p>
        <h2 className={`serif ${styles.title}`}>
          Different Blends,<br /><em>One Philosophy</em>
        </h2>
      </div>

      {/* Tab switcher */}
      <div className={styles.tabs}>
        {blends.map((b, i) => (
          <button
            key={b.id}
            className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            style={active === i ? { background: b.color, color: '#fff', borderColor: b.color } : {}}
            onClick={() => setActive(i)}
          >
            {b.name}
            <span className={styles.tabJp}>{b.nameJp}</span>
          </button>
        ))}
      </div>

      {/* Main panel */}
      <div className={styles.panel}>
        <div className={styles.panelLeft}>
          <div className={styles.blendBadge} style={{ background: blend.color }}>
            <span className={styles.blendName}>{blend.name}</span>
            <span className={styles.blendTagline}>{blend.tagline}</span>
          </div>
          <p className={styles.blendDesc}>{blend.desc}</p>

          {/* Tasting notes */}
          <div className={styles.notesGroup}>
            <h4 className={styles.notesTitle}>Tasting Notes</h4>
            <div className={styles.noteChips}>
              {blend.notes.map((n) => (
                <span key={n} className={styles.noteChip} style={{ borderColor: blend.color, color: blend.color }}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.panelRight}>
          {/* Sensory wheel */}
          <div className={styles.wheelGroup}>
            <h4 className={styles.notesTitle}>Sensory Wheel</h4>
            <div className={styles.wheel}>
              {blend.wheel.map((w, i) => (
                <div key={i} className={styles.wheelItem} style={{ '--i': i, '--total': blend.wheel.length, '--c': blend.color }}>
                  <div className={styles.wheelDot} style={{ background: blend.color }} />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brew guide */}
          <div className={styles.brewGuide}>
            <h4 className={styles.notesTitle}>Quick Brew Guide</h4>
            <div className={styles.brewStats}>
              <div className={styles.brewStat}>
                <div className={styles.brewIcon}>🌡️</div>
                <div>
                  <div className={styles.brewVal}>{blend.brew.temp}</div>
                  <div className={styles.brewKey}>Water Temp</div>
                </div>
              </div>
              <div className={styles.brewStat}>
                <div className={styles.brewIcon}>⏱️</div>
                <div>
                  <div className={styles.brewVal}>{blend.brew.time}</div>
                  <div className={styles.brewKey}>Steep Time</div>
                </div>
              </div>
              <div className={styles.brewStat}>
                <div className={styles.brewIcon}>⚖️</div>
                <div>
                  <div className={styles.brewVal}>{blend.brew.ratio}</div>
                  <div className={styles.brewKey}>Ratio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
