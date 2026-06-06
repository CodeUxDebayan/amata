import { useEffect, useRef } from 'react';
import styles from './Journey.module.css';

const steps = [
  { id: 'step01', num: '01', text: 'Cultivation', sub: 'Bengal Deltas',        jp: '栽培 · कृषि', video: '/videos/cultivation_icon.mp4' },
  { id: 'step02', num: '02', text: 'Harvest',     sub: 'Hand-picked at dawn',  jp: '収穫 · लवन', video: '/videos/harvest_icon.mp4' },
  { id: 'step03', num: '03', text: 'Refinement',  sub: 'Japanese Steaming',    jp: '精製 · संस्कार', video: '/videos/refinement_icon.mp4' },
  { id: 'step04', num: '04', text: 'The Ritual',  sub: 'In your cup',          jp: '茶道 · यज्ञ', video: '/videos/ritual_icon.mp4' },
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
    let fallback;

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

      const videos = Array.from(document.querySelectorAll(`.${styles.step} video`));

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

          // 2. Animate step dot active states & video playbacks in sync with the line
          videos.forEach((video, idx) => {
            // Force browser play permission attributes
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.pause();

            // The first video starts scrubbing when the whole section enters view,
            // giving it more space and time to register. Subsequent videos start
            // when the line passes the previous step.
            let startTrigger = sectionRef.current;
            let startAlign = isMobile ? 'top 80%' : 'top center';

            if (idx > 0) {
              startTrigger = videos[idx - 1].closest(`.${styles.step}`);
              startAlign = isMobile ? 'top 80%' : 'center center';
            }

            const currentStep = video.closest(`.${styles.step}`);
            const endAlign = isMobile ? 'top 80%' : 'center center';

            gsap.fromTo(video,
              { currentTime: 0 },
              {
                currentTime: video.duration || 1,
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

      // Wait for all video durations to load to ensure frame-accurate scrubbing
      let loadedCount = 0;
      if (videos.length === 0) {
        initTimeline();
      } else {
        videos.forEach(v => {
          if (v.readyState >= 1) {
            loadedCount++;
            if (loadedCount === videos.length) initTimeline();
          } else {
            v.addEventListener('loadedmetadata', () => {
              loadedCount++;
              if (loadedCount === videos.length) initTimeline();
            });
          }
        });

        // Safe fallback in case browser delays loadedmetadata event
        fallback = setTimeout(() => {
          if (loadedCount < videos.length) {
            initTimeline();
          }
        }, 800);
      }
    }

    const timer = setTimeout(init, 100);

    return () => {
      active = false;
      clearTimeout(timer);
      clearTimeout(fallback);
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

            const videoBlock = (
              <div className={styles.videoContainer}>
                <video
                  src={s.video}
                  className={styles.iconVideo}
                  muted
                  playsInline
                  preload="auto"
                  controls={false}
                />
              </div>
            );

            return (
              <div key={s.id} className={styles.step} id={s.id}>
                {/* Left Col */}
                <div className={styles.leftSide}>
                  {isEven ? videoBlock : textBlock}
                </div>

                {/* Middle Col (Timeline dot anchor) */}
                <div className={styles.middleCol}>
                  <div className={styles.dot} />
                </div>

                {/* Right Col */}
                <div className={styles.rightSide}>
                  {isEven ? textBlock : videoBlock}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
