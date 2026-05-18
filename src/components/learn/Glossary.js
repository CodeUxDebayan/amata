import { useEffect, useRef } from 'react';
import styles from './Glossary.module.css';

const GLOSSARY_ITEMS = [
  {
    term: "Herbal",
    sanskrit: "वानस्पतिक",
    sanskritTrans: "Vānaspatika",
    japanese: "生薬",
    japaneseTrans: "Shōyaku",
    desc: "100% pure botanical integrity. Sourced directly from sustainably managed heritage farms and prepared without synthetic intervention."
  },
  {
    term: "Gut Centric",
    sanskrit: "कोष्ठक हितकारी",
    sanskritTrans: "Koṣṭhaka Hitakāri",
    japanese: "腸活",
    japaneseTrans: "Chōkatsu",
    desc: "Nourishing the microbiome to optimize the gut-brain axis. Packed with natural prebiotic polysaccharides that support healthy gut flora."
  },
  {
    term: "Ayurvedic",
    sanskrit: "आयुर्वेदिक",
    sanskritTrans: "Āyurvedika",
    japanese: "アーユルヴェーダ",
    japaneseTrans: "Āyuruvēda",
    desc: "Rooted in the timeless Indian science of life, longevity, and constitutional balance, aligning your physical elements with nature's rhythm."
  },
  {
    term: "Preventive",
    sanskrit: "रोगनिरोधक",
    sanskritTrans: "Roganirodhaka",
    japanese: "予防医学",
    japaneseTrans: "Yobō Igaku",
    desc: "Strengthening the physical body and baseline immunity before disease or constitutional imbalance occurs. Prevention as a daily ceremony."
  },
  {
    term: "Healing",
    sanskrit: "उपचारात्मक",
    sanskritTrans: "Upacārātmaka",
    japanese: "治癒",
    japaneseTrans: "Chiyu",
    desc: "Restoring physiological balance, accelerating cell recovery, and nurturing deep inner harmony from within the digestive tract."
  },
  {
    term: "Tannin",
    sanskrit: "कषाय",
    sanskritTrans: "Kaṣāya",
    japanese: "タンニン",
    japaneseTrans: "Tannin",
    desc: "Exceptionally low in astringency. A smooth, non-bitter infusion that protects delicate stomach linings from acidic distress."
  },
  {
    term: "Caffeine Free Energy",
    sanskrit: "अमद ऊर्जा",
    sanskritTrans: "Amada Ūrjā",
    japanese: "ノンカフェインの活力",
    japaneseTrans: "Nonkafein no Katsuryoku",
    desc: "Sustained daytime clarity and focused awareness without caffeine jitters, crashes, or adrenal exhaustion."
  },
  {
    term: "Sustainable",
    sanskrit: "संवहनीय",
    sanskritTrans: "Saṁvahanīya",
    japanese: "持続可能",
    japaneseTrans: "Jizoku Kanō",
    desc: "Ethically shade-grown and hand-harvested, maintaining deep ecological stewardship and carbon-negative carbon footprints."
  },
  {
    term: "Deep Rest",
    sanskrit: "गहन विश्राम",
    sanskritTrans: "Gahana Viśrāma",
    japanese: "深い休息",
    japaneseTrans: "Fukai Kyūshoku",
    desc: "Soothes the sympathetic nervous system to naturally initiate deep REM sleep states and complete physical rejuvenation."
  }
];

export default function Glossary() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !containerRef.current) return;

      ctx = gsap.context(() => {
        gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
          gsap.fromTo(card,
            { y: 35, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              }
            }
          );
        });
      }, containerRef);

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
    <section ref={containerRef} className={styles.section} id="glossary">
      <div className={styles.header}>
        <div className={styles.label}>Purity Glossary · 語彙目録</div>
        <h2 className={`serif ${styles.title}`}>The Elements of Moroheiya</h2>
        <p className={styles.subtitle}>
          Bridging the language of Ayurvedic healing and Japanese wabi-sabi. Understanding our baseline philosophy.
        </p>
      </div>

      <div className={styles.grid}>
        {GLOSSARY_ITEMS.map((item) => (
          <div key={item.term} className={styles.card}>
            <div className={styles.termRow}>
              <h3 className={`serif ${styles.termName}`}>{item.term}</h3>
              <span className={styles.dots} />
            </div>

            <div className={styles.langRow}>
              <div className={styles.langCol}>
                <span className={styles.langLabel}>Sanskrit</span>
                <span className={`serif ${styles.nativeText}`}>{item.sanskrit}</span>
                <span className={styles.transText}>({item.sanskritTrans})</span>
              </div>
              <div className={styles.verticalRule} />
              <div className={styles.langCol}>
                <span className={styles.langLabel}>Japanese</span>
                <span className={`${styles.nativeText} jp`}>{item.japanese}</span>
                <span className={styles.transText}>({item.japaneseTrans})</span>
              </div>
            </div>

            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
