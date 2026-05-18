import { useEffect, useRef, useState } from 'react';
import ArticleModal from './ArticleModal';
import styles from './JournalCarousel.module.css';

const articles = [
  {
    title: 'The Prebiotic Path to Deep REM Sleep',
    tag: 'Sleep',
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop',
    body: 'Our bodies operate on a circadian rhythm heavily influenced by the flora in our gut. Recent studies have illuminated the profound connection between prebiotic fiber intake and improved sleep architecture. Moroheiya, often referred to as the King\'s Vegetable, is extraordinarily rich in complex polysaccharides that act as high-grade fuel for beneficial gut bacteria, initiating a cascade of restorative physiological responses that guide the mind into deep, uninterrupted slumber.',
  },
  {
    title: 'Mucilage: The Misunderstood Miracle',
    tag: 'Digestion',
    img: 'https://images.unsplash.com/photo-1606149059549-6042addafc52?q=80&w=1500&auto=format&fit=crop',
    body: 'Mucilage has long been dismissed as a strange texture anomaly in Moroheiya. But modern nutritional science is revealing it as one of nature\'s most sophisticated prebiotic delivery systems. This gel-like substance coats the gut lining, reduces inflammation, and feeds the beneficial bacteria that regulate everything from mood to immunity.',
  },
  {
    title: 'L-Theanine meets Prebiotics',
    tag: 'Mental Clarity',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop',
    body: 'The combination of L-Theanine from Moroheiya\'s chlorophyll-rich leaves and its prebiotic polysaccharides creates a synergistic calm that no synthetic supplement can replicate. L-Theanine modulates alpha brain waves, promoting a state of focused relaxation, while the prebiotics stabilise mood through the gut-brain axis.',
  },
  {
    title: 'Carbon Negative Cultivation',
    tag: 'Sustainability',
    img: 'https://images.unsplash.com/photo-1501625902148-5231c518d6e3?q=80&w=1467&auto=format&fit=crop',
    body: 'Moroheiya cultivation, when practiced with regenerative agricultural principles, sequesters more carbon than it emits. Our Bengal Delta farms use zero synthetic inputs, intercrop with nitrogen-fixing plants, and return all organic matter to the soil — creating a closed loop that gives back more than it takes.',
  },
  {
    title: 'The Art of Slow Living',
    tag: 'Lifestyle',
    img: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1470&auto=format&fit=crop',
    body: 'In a world optimised for speed, the Amata ritual is an act of radical deceleration. Brewing tea is not merely preparation — it is the practice itself. The three minutes of steeping become a meditation. The warmth of the cup becomes an anchor to the present moment.',
  },
];

const palette = ['#f7f9f4', '#faf5f2', '#f2f8fa', '#f9f6ef', '#f5f9f5'];

export default function JournalCarousel() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const [modal, setModal]     = useState(null);
  const dragStart  = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        // Section heading reveal
        gsap.fromTo(`.${styles.eyebrow}, .${styles.heading}`, 
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );

        // Cards stagger reveal
        const cards = trackRef.current?.querySelectorAll(`.${styles.card}`);
        if (cards?.length) {
          gsap.fromTo(cards, 
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8,
              stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: trackRef.current, start: 'top 85%' },
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

  // Distinguish drag from click and implement fluid desktop grab-to-scroll
  function handleMouseDown(e) {
    if (!trackRef.current) return;
    isDragging.current = true;
    trackRef.current.classList.add(styles.dragging);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    dragStart.current = { x: e.clientX, y: e.clientY };
  }

  function handleMouseMove(e) {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function handleMouseUpOrLeave() {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.classList.remove(styles.dragging);
    }
  }

  function handleClick(article, e) {
    if (!dragStart.current) return;
    const dx = Math.abs(e.clientX - dragStart.current.x);
    const dy = Math.abs(e.clientY - dragStart.current.y);
    if (dx < 6 && dy < 6) {
      setModal(article);
    }
    dragStart.current = null;
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>Brew Master&rsquo;s Insights · 知識</p>
        <h2 className={`serif ${styles.heading}`}>
          From the<br /><em>Journal</em>
        </h2>
      </div>

      {/* Scrollable card track */}
      <div className={styles.trackWrap}>
        <div 
          ref={trackRef} 
          className={styles.track}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {articles.map((article, i) => (
            <article
              key={i}
              className={styles.card}
              style={{ backgroundColor: palette[i % palette.length] }}
              onClick={(e) => handleClick(article, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setModal(article)}
              aria-label={`Read: ${article.title}`}
            >
              <div className={styles.imgMask}>
                <img
                  src={article.img}
                  alt={article.title}
                  draggable="false"
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.tag}>{article.tag}</span>
                <h3 className={`serif ${styles.title}`}>{article.title}</h3>
                <span className={styles.readMore}>Read Entry →</span>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.scrollHint} aria-hidden="true">
          <span />
          Drag to explore
          <span />
        </div>
      </div>

      {modal && <ArticleModal article={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
