import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Philosophy.module.css';

function PhiloMandala({ elementRef }) {
  return (
    <svg ref={elementRef} className={styles.mandala} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="145" fill="none" stroke="#b8693a" strokeWidth="1" />
      <circle cx="150" cy="150" r="112" fill="none" stroke="#b8693a" strokeWidth=".5" />
      <circle cx="150" cy="150" r="79"  fill="none" stroke="#b8693a" strokeWidth=".5" />
      <circle cx="150" cy="150" r="46"  fill="none" stroke="#b8693a" strokeWidth=".5" />
      <g transform="translate(150,150)">
        <line x1="0" y1="-145" x2="0"    y2="145"  stroke="#b8693a" strokeWidth=".3" opacity=".4" />
        <line x1="-145" y1="0" x2="145"  y2="0"    stroke="#b8693a" strokeWidth=".3" opacity=".4" />
        <line x1="-102" y1="-102" x2="102" y2="102" stroke="#b8693a" strokeWidth=".3" opacity=".4" />
        <line x1="102" y1="-102" x2="-102" y2="102" stroke="#b8693a" strokeWidth=".3" opacity=".4" />
      </g>
    </svg>
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const kanjiRef   = useRef(null);
  const mandalaRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        // Animate background Kanji character
        gsap.fromTo(kanjiRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1, opacity: 0.04, duration: 2, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );

        // Animate Mandala SVG (Fade-in + rotation loop on scroll)
        gsap.fromTo(mandalaRef.current,
          { opacity: 0, scale: 0.7, rotation: -45 },
          {
            opacity: 1, scale: 1, rotation: 45, duration: 2.2, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%', end: 'bottom 20%',
              scrub: 1,
            }
          }
        );

        // Animate Left column (Label, ruler, hint text, CTA)
        gsap.fromTo(leftRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );

        // Animate Right column (Japanese quotes, Blockquote, Author)
        gsap.fromTo(rightRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 68%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
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
    <section ref={sectionRef} className={styles.philosophy} id="philosophy">
      <div ref={kanjiRef} className={styles.bgChar}>間</div>

      <div ref={leftRef} className={styles.left}>
        <div className={styles.label}>Our Philosophy · 哲学</div>
        <div className={styles.rule} />
        <p className={styles.hint}>
          Where the <span className="text-sky">stillness</span> of Zen meets the{' '}
          <span className="text-sky">warmth</span> of Ayurveda.
        </p>
        <p className={styles.axisCopy}>
          Harmonizing the <strong>Gut-Brain Axis</strong> through the ritualistic consumption of organic, nutrient-dense botanicals.
        </p>
        <div style={{ marginTop: '2.5rem' }}>
          <Link href="/learn" className="amata-btn amata-btn--sand">
            Know Our Journey →
          </Link>
        </div>
      </div>

      <div ref={rightRef} className={styles.right}>
        <div className={styles.jpQuote}>一期一会 · क्षणैकदर्शनम्</div>
        <div className={styles.jpQuoteSub}>"One moment, one vision"</div>
        <blockquote className={`serif ${styles.quote}`}>
          "One time, one meeting.<br />
          Treasure each cup<br />
          as if it will never<br />
          come again."
        </blockquote>
        <div className={styles.attr}>— The Way of Tea · 茶道 · Chado</div>
      </div>

      <PhiloMandala elementRef={mandalaRef} />
    </section>
  );
}
