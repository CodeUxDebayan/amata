import { useEffect, useRef } from 'react';
import styles from './Journey.module.css';

const steps = [
  { id: 'step01', num: '01', text: 'Cultivation', sub: 'Bengal Deltas',        jp: '栽培 · कृषि', image: '/images/journey_icons/cultivation.png' },
  { id: 'step02', num: '02', text: 'Harvest',     sub: 'Hand-picked at dawn',  jp: '収穫 · लवन', image: '/images/journey_icons/harvest.png' },
  { id: 'step03', num: '03', text: 'Refinement',  sub: 'Japanese Steaming',    jp: '精製 · संस्कार', image: '/images/journey_icons/refinement.png' },
  { id: 'step04', num: '04', text: 'The Ritual',  sub: 'In your cup',          jp: '茶道 · यज्ञ', image: '/images/journey_icons/ritual.png' },
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

      const icons = Array.from(document.querySelectorAll(`.${styles.step} .${styles.iconImg}`));

      const initTimeline = () => {
        if (!active) return;
        ctx = gsap.context(() => {
          const isMobile = window.innerWidth <= 768;

          // 1. Animate line drawing from top to bottom
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

          // 2. Animate step dot active states & icon fades in sync with the line
          icons.forEach((icon, idx) => {
            let startTrigger = sectionRef.current;
            let startAlign = isMobile ? 'top 80%' : 'top center';

            if (idx > 0) {
              startTrigger = icons[idx - 1].closest(`.${styles.step}`);
              startAlign = isMobile ? 'top 80%' : 'center center';
            }

            const currentStep = icon.closest(`.${styles.step}`);
            const endAlign = isMobile ? 'top 80%' : 'center center';

            gsap.fromTo(icon,
              { opacity: 0 },
              {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: startTrigger,
                  start: startAlign,
                  endTrigger: currentStep,
                  end: endAlign,
                  scrub: 0.15,
                  invalidateOnRefresh: true,
                }
              }
            );

            // Activate step indicator as the line reaches each card
            if (currentStep) {
              ScrollTrigger.create({
                trigger: currentStep,
                start: isMobile ? 'top 80%' : 'center center+=100',
                onEnter:     () => currentStep.classList.add(styles.active),
                onLeaveBack: () => currentStep.classList.remove(styles.active),
              });
            }
          });
        }, sectionRef);

        ScrollTrigger.refresh();
      };

      // Since images don't require the same metadata loading, initialize timeline immediately
      initTimeline();
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

          {steps.map((s, idx) => {
            const isEven = idx % 2 !== 0;

            const textBlock = (
              <div className={styles.textContainer}>
                <div className={styles.num}>{s.num}</div>
                <div className={`serif ${styles.text}`}>{s.text}</div>
                <div className={styles.sub}>{s.sub}</div>
                <div className={styles.jp}>{s.jp}</div>
              </div>
            );

            const imageBlock = (
              <div className={styles.iconContainer}>
                <img
                  src={s.image}
                  className={styles.iconImg}
                  alt={s.text}
                />
              </div>
            );

            return (
              <div key={s.id} className={styles.step} id={s.id}>
                {/* Left Col */}
                <div className={styles.leftSide}>
                  {isEven ? imageBlock : textBlock}
                </div>

                {/* Middle Col (Timeline dot anchor) */}
                <div className={styles.middleCol}>
                  <div className={styles.dot} />
                </div>

                {/* Right Col */}
                <div className={styles.rightSide}>
                  {isEven ? textBlock : imageBlock}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
