import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import styles from './AboutSection.module.css';

const stats = [
  { value: 4800, suffix: '+', label: 'Rituals adopted', sub: 'Across India & Japan' },
  { value: 100,  suffix: '%', label: 'Certified organic', sub: 'USDA · JAS · India Organic' },
  { value: 3,    suffix: '×', label: 'Prebiotic fibre', sub: 'vs. leading green teas' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        // Reveal headline words
        gsap.fromTo('.about-word', 
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.07, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );

        // Reveal body text + link
        gsap.fromTo([`.${styles.body}`, `.${styles.cta}`], 
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          }
        );

        // Stats reveal + count-up
        const statEls = sectionRef.current.querySelectorAll(`.${styles.statBlock}`);
        gsap.fromTo(statEls, 
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: `.${styles.stats}`, start: 'top 80%' },
          }
        );

        statEls.forEach((el) => {
          const numEl  = el.querySelector(`.${styles.numDisplay}`);
          const target = parseInt(el.dataset.target, 10);
          if (!numEl || !target) return;
          const obj = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () =>
              gsap.to(obj, {
                v: target, duration: 2.2, ease: 'expo.out',
                onUpdate: () => {
                  if (numEl) numEl.textContent = Math.round(obj.v).toLocaleString();
                },
              }),
          });
        });

        // Image parallax
        const img = sectionRef.current.querySelector(`.${styles.imgInner}`);
        if (img) {
          gsap.fromTo(img, 
            { y: '-12%' },
            {
              y: '12%', ease: 'none',
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
    <section ref={sectionRef} className={styles.section}>
      {/* Background gradient layer */}
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.inner}>
        {/* LEFT — story copy */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>不死の緑 · Our Story</p>

          <h2 className={`serif ${styles.headline}`}>
            {['Born', 'from', 'two', 'worlds,', 'one', 'leaf.'].map((w) => (
              <span key={w} className={styles.wordWrap}>
                <span className={`about-word ${styles.word}`}>{w}</span>
              </span>
            ))}
          </h2>

          <p className={styles.body}>
            Amata was born at the intersection of Japanese precision and Indian soulfulness —
            two ancient traditions united by a single, extraordinary plant. Moroheiya, known
            for millennia as the &ldquo;immortal herb,&rdquo; forms the heart of every ritual we craft.
            <br /><br />
            Our botanical blends are specifically formulated to nourish prebiotic pathways and <strong>master the gut-brain axis naturally</strong>. By optimizing vagal signaling and microbial diversity, we invite you to experience sustained mental clarity, grounded energy, and physical tranquility.
          </p>

          <Link href="/learn" className={styles.cta}>
            <span>Our full story</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        {/* RIGHT — image */}
        <div className={styles.imgWrap}>
          <div className={styles.imgInner}>
            <Image
              src="/images/morning_harvest.jpg"
              alt="Amata Moroheiya cultivation"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority={false}
              className={styles.img}
            />
          </div>
          <div className={styles.imgTag}>Bengal Delta · Dawn Harvest</div>
        </div>
      </div>

      {/* STATS row */}
      <div className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statBlock} data-target={s.value}>
            <div className={`serif ${styles.statNum}`}>
              <span className={styles.numDisplay}>0</span>
              <span className={styles.statSuffix}>{s.suffix}</span>
            </div>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statSub}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div className={styles.wm} aria-hidden="true">अमृत · 不死</div>
    </section>
  );
}
