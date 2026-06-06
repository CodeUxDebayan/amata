import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    stars: 5,
    quote: 'Amata has completely transformed my morning ritual. The clarity and gut harmony are unlike any other tea I\'ve tried.',
    author: 'Sarah J.',
    title: 'Wellness Architect',
  },
  {
    stars: 5,
    quote: 'A masterpiece of flavor and function. The Japanese–Indian fusion is felt in every sip — refined, grounding, alive.',
    author: 'Dr. Arjun Mehta',
    title: 'Ayurveda Specialist',
  },
  {
    stars: 5,
    quote: 'I replaced my matcha three months ago. My digestion has never been better, and the calm energy lasts all day.',
    author: 'Keiko Tanaka',
    title: 'Kyoto, Japan',
  },
  {
    stars: 5,
    quote: 'We serve Amata at our spa. Guests describe it as drinking liquid calm — it sets the tone for the entire experience.',
    author: 'Maya Lin',
    title: 'Spa Director, Aman Tokyo',
  },
  {
    stars: 5,
    quote: 'My gut microbiome results after 6 weeks on Amata were remarkable. Lactobacillus colonies increased by 40%.',
    author: 'Dr. Riku Sato',
    title: 'Microbiome Researcher',
  },
  {
    stars: 5,
    quote: 'Not tea — a philosophy in a cup. Amata is what happens when centuries-old wisdom meets modern intentionality.',
    author: 'Ananya Roy',
    title: 'Food Journalist',
  },
];

function Stars({ count }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;
    // Per-card float parameters — alternating phase so they never all move together
    const floatParams = [
      { y: -10, duration: 5.2, delay: 0 },
      { y:   8, duration: 6.0, delay: 0.8 },
      { y: -12, duration: 4.8, delay: 0.4 },
      { y:   9, duration: 5.6, delay: 1.1 },
      { y: -8,  duration: 6.4, delay: 0.2 },
      { y:  11, duration: 5.0, delay: 0.7 },
    ];

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
          gsap.set([`.${styles.label}`, `.${styles.heading}`], { y: 0, opacity: 1 });
          gsap.set(`.${styles.card}`, { y: 0, opacity: 1 });
          return;
        }

        // ── Label + heading scroll entrance ──
        gsap.fromTo(`.${styles.label}`,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 0.8, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play reverse play reverse' },
          }
        );
        gsap.fromTo(`.${styles.heading}`,
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play reverse play reverse' },
          }
        );

        // ── Staggered card entrance + continuous float chained on complete ──
        gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
          const fp = floatParams[i] || floatParams[0];

          gsap.fromTo(card,
            { y: 55, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              delay: (i % 3) * 0.12,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play reverse play reverse',
              },
              onComplete: () => {
                if (!active) return;
                // Begin gentle continuous float after entrance settles
                gsap.to(card, {
                  y: fp.y,
                  duration: fp.duration,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  delay: fp.delay,
                });
              },
            }
          );
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    const timer = setTimeout(init, 120);
    return () => {
      active = false;
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);


  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background decorative glyphs */}
      <span className={styles.bgGlyph1} aria-hidden="true">證</span>
      <span className={styles.bgGlyph2} aria-hidden="true">सत्यम्</span>

      <div className={styles.header}>
        <div className={styles.label}>Reviews · 口コミ</div>
        <h2 className={`serif ${styles.heading}`}>What People Are Saying</h2>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t, i) => (
          <article key={i} className={styles.card}>
            <Stars count={t.stars} />
            <blockquote className={`serif ${styles.quote}`}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer className={styles.footer}>
              <span className={styles.author}>{t.author}</span>
              <span className={styles.dividerDot}>·</span>
              <span className={styles.authorTitle}>{t.title}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
