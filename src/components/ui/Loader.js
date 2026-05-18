import { useEffect, useRef } from 'react';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    let gsap, tl;

    async function init() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;

      const loader = loaderRef.current;
      if (!loader) return;

      tl = gsap.timeline({
        onComplete: () => {
          if (loader) loader.style.display = 'none';
          onComplete?.();
        },
      });

      tl.to(`.${styles.loaderInner}`,    { y: 0,      duration: 0.3, ease: 'power4.out' })
        .to(`.${styles.loaderSubInner}`,  { y: 0, opacity: 1, duration: 0.2, ease: 'power3.out' }, '-=.15')
        .to(`.${styles.loaderInner}`,     { y: '-100%', duration: 0.3, ease: 'power4.in', delay: 0.1 })
        .to(`.${styles.loaderSubInner}`,  { y: '-100%', opacity: 0, duration: 0.2, ease: 'power4.in' }, '<')
        .to(loader,                        { height: 0, duration: 0.2, ease: 'expo.inOut' });
    }

    init();
    return () => { tl?.kill(); };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className={styles.loader} id="loader">
      <div className={styles.loaderText}>
        <span className={styles.loaderInner}>A M A T A</span>
      </div>
      <div className={styles.loaderSub}>
        <span className={styles.loaderSubInner}>不死の緑 · अमृत हरित</span>
      </div>
    </div>
  );
}
