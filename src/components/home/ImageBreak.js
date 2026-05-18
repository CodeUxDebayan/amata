import { useEffect, useRef, useState } from 'react';
import { SpeakerSimpleHigh, SpeakerSimpleSlash } from '@phosphor-icons/react';
import styles from './ImageBreak.module.css';

export default function ImageBreak() {
  const videoRef   = useRef(null);
  const sectionRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  }

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        if (videoRef.current) {
          gsap.fromTo(videoRef.current,
            { y: '-20%' },
            {
              y: '20%', ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom', end: 'bottom top', scrub: true,
              },
            }
          );
        }
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
    <section ref={sectionRef} className={styles.imgBreak}>
      <video
        ref={videoRef}
        src="/videos/showreel.webm"
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={`serif ${styles.text}`}>Purity in Process</div>
      <button className={styles.soundToggle} onClick={toggleSound} aria-label="Toggle sound">
        {muted
          ? <SpeakerSimpleSlash size={20} />
          : <SpeakerSimpleHigh  size={20} />
        }
        <span>{muted ? 'Sound Off' : 'Sound On'}</span>
      </button>
    </section>
  );
}
