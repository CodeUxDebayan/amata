import { useEffect, useRef } from 'react';
import styles from './Journey.module.css';

const steps = [
  { id: 'step01', num: '01', text: 'Cultivation', sub: 'Bengal Deltas',        jp: '栽培 · कृषि' },
  { id: 'step02', num: '02', text: 'Harvest',     sub: 'Hand-picked at dawn',  jp: '収穫 · लवन' },
  { id: 'step03', num: '03', text: 'Refinement',  sub: 'Japanese Steaming',    jp: '精製 · संस्कार' },
  { id: 'step04', num: '04', text: 'The Ritual',  sub: 'In your cup',          jp: '茶道 · यज्ञ' },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const svgRef     = useRef(null);
  const bgPathRef  = useRef(null);
  const fillPathRef= useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active) return;

      // Build brush SVG path
      const wrapper = wrapperRef.current;
      const svg     = svgRef.current;
      const bgPath  = bgPathRef.current;
      const fillPath= fillPathRef.current;
      if (!wrapper || !svg || !bgPath || !fillPath) return;

      const h = wrapper.offsetHeight;
      svg.setAttribute('viewBox', `0 0 20 ${h}`);

      let d = 'M 10 0';
      const stepsCount = 24;
      for (let i = 1; i <= stepsCount; i++) {
        const y  = (h / stepsCount) * i;
        const wx = Math.sin(i * 1.4) * 2.5;
        d += ` L ${10 + wx} ${y}`;
      }
      bgPath.setAttribute('d', d);
      fillPath.setAttribute('d', d);

      const len = fillPath.getTotalLength ? fillPath.getTotalLength() : h;
      bgPath.style.strokeDasharray  = len;
      bgPath.style.strokeDashoffset = 0;
      fillPath.style.strokeDasharray  = len;
      fillPath.style.strokeDashoffset = len;

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 768;

        gsap.to(fillPath, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: isMobile ? 'top 80%' : 'top center',
            end: isMobile ? 'bottom 80%' : 'bottom center',
            scrub: true,
          },
        });

        document.querySelectorAll(`.${styles.step}`).forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: isMobile ? 'top 80%' : 'center center+=100',
            onEnter:     () => step.classList.add(styles.active),
            onLeaveBack: () => step.classList.remove(styles.active),
          });
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
    <section ref={sectionRef} className={styles.journey} id="journeySection">
      <div className={styles.content}>
        <h2 className={`serif split-text ${styles.title}`}>Farm to Cup</h2>

        <div ref={wrapperRef} className={styles.lineWrapper} id="journeyWrapper">
          <svg
            ref={svgRef}
            className={styles.brushSvg}
            id="jSvg"
            preserveAspectRatio="none"
          >
            <path
              ref={bgPathRef}
              className={styles.brushBg}
              id="jBg"
              d=""
              fill="none"
              stroke="var(--c-deep)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.15"
            />
            <path
              ref={fillPathRef}
              className={styles.brushFill}
              id="jFill"
              d=""
              fill="none"
              stroke="var(--c-deep)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {steps.map((s) => (
            <div key={s.id} className={styles.step} id={s.id}>
              <div className={styles.dot} />
              <div>
                <div className={styles.num}>{s.num}</div>
                <div className={`serif ${styles.text}`}>{s.text}</div>
                <div className={styles.sub}>{s.sub}</div>
                <div className={styles.jp}>{s.jp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
