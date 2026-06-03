import { useEffect, useRef, useState } from 'react';
import ArticleModal from './ArticleModal';
import blogsData from '../../../BlogsData.json';
import styles from './JournalCarousel.module.css';

const articles = (blogsData.blogs || []).map((blog, index) => {
  const primaryKeyword = blog.seo_keywords?.primary_keyword || blog.seoKeywords?.[0] || 'Wellness';
  const metaDescription = blog.meta_description || blog.metaDescription || '';
  
  const colors = ['#2d6a4f', '#b8693a', '#3b6ea5', '#6a3d9a', '#46770c'];
  const tagColor = colors[index % colors.length];
  
  const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
  const readTime = Math.max(3, Math.ceil(wordCount / 200)) + ' min';
  const excerpt = metaDescription || (blog.content ? blog.content.slice(0, 150) + '...' : '');

  const img = `https://images.unsplash.com/photo-${[
    '1522075469751-3a6694fb2f61',
    '1606149059549-6042addafc52',
    '1544367567-0f2fcb009e0b',
    '1501625902148-5231c518d6e3',
    '1490730141103-6cac27aaab94',
    '1556679343-c7306c1976bc',
    '1563911302283-d2bc129e7570',
    '1518118014377-cecb6c6218f2',
    '1564890369478-c89ca6d9cde9',
    '1620860882101-1b29fc438b45'
  ][index % 10]}?q=80&w=1200&auto=format&fit=crop`;

  return {
    id: blog.id || `blog-${index}`,
    title: blog.title,
    tag: primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1),
    tagColor,
    featured: index === 0,
    excerpt,
    body: blog.content,
    readTime,
    img,
  };
});

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
