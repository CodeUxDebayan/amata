import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './TimelineJourney.module.css';

const steps = [
  {
    num: '01', color: '#46770c', title: 'Cultivation',
    desc: 'We apply centuries-old Japanese shade-growing techniques to Indian soil. Covering the Moroheiya plants before harvest dramatically increases their chlorophyll and L-theanine levels.',
    img: '/images/Cultivation.jpg',
  },
  {
    num: '02', color: '#b8693a', title: 'Harvest',
    desc: 'Hand-picked at dawn by artisanal farmers, we select only the youngest, most tender leaves. This meticulous process ensures the highest nutrient density and a naturally sweet, earthy flavor.',
    img: '/images/Harvest.jpg',
  },
  {
    num: '03', color: '#5194dbff', title: 'Refinement',
    desc: 'The freshly harvested leaves undergo rapid steaming — a critical technique borrowed from Kyoto\'s matcha masters. This halts oxidation instantly, locking in the vibrant emerald green.',
    img: '/images/Refinement.jpg',
  },
  {
    num: '04', color: '#46770c', title: 'Synthesis',
    desc: 'Slowly ground in traditional granite mills, the leaves are transformed into a micro-fine powder. This ensures the infusion suspends beautifully in water.',
    img: '/images/Synthesis.jpg',
  },
];

export default function TimelineJourney() {
  const sectionRef  = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
          gsap.set(progressRef.current, { height: '100%' });
          gsap.set(`.${styles.stepContent}`, { y: 0, opacity: 1 });
          gsap.set(`.${styles.stepMedia}`, { y: 0, opacity: 1 });
          return;
        }

        if (progressRef.current) {
          gsap.fromTo(progressRef.current, 
            { height: '0%' },
            {
              height: '100%', ease: 'none',
              scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'bottom center', scrub: true },
            }
          );
        }

        gsap.utils.toArray(`.${styles.step}`).forEach((step) => {
          const content = step.querySelector(`.${styles.stepContent}`);
          const media   = step.querySelector(`.${styles.stepMedia}`);
          [content, media].filter(Boolean).forEach((el, i) => {
            gsap.fromTo(el, 
              { y: 50, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: i * 0.2,
                scrollTrigger: { trigger: step, start: 'top 75%', toggleActions: 'play reverse play reverse' },
              }
            );
          });
        });

        gsap.utils.toArray(`.${styles.paraImg}`).forEach((img) => {
          gsap.fromTo(img, 
            { y: '-10%' },
            {
              y: '10%', ease: 'none',
              scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
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
    <section ref={sectionRef} className={styles.journey} id="journey">
      <div className={styles.line} />
      <div ref={progressRef} className={styles.progress} />

      {steps.map((s) => (
        <div key={s.num} className={styles.step}>
          <div className={styles.stepContent}>
            <div className={styles.stepNum} style={{ color: s.color }}>{s.num}</div>
            <h2 className={`serif ${styles.stepTitle}`}>{s.title}</h2>
            <p className={styles.body}>{s.desc}</p>
          </div>
          <div className={styles.stepMedia}>
            <Image 
              src={s.img} 
              alt={s.title} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw" 
              className={styles.paraImg}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
