import { useState } from 'react';
import ArticleModal from './ArticleModal';
import styles from './JournalGrid.module.css';

const articles = [
  {
    id: 1,
    title: 'The Prebiotic Path to Deep REM Sleep',
    tag: 'Sleep',
    tagColor: '#3b6ea5',
    featured: true,
    excerpt: 'Our bodies operate on a circadian rhythm heavily influenced by the flora in our gut. Recent studies have illuminated the profound connection between prebiotic fiber intake and improved sleep architecture — and Moroheiya sits at the centre of this story.',
    body: 'Our bodies operate on a circadian rhythm heavily influenced by the flora in our gut. Recent studies have illuminated the profound connection between prebiotic fiber intake and improved sleep architecture. Moroheiya, often referred to as the King\'s Vegetable, is extraordinarily rich in complex polysaccharides that act as high-grade fuel for beneficial gut bacteria, initiating a cascade of restorative physiological responses that guide the mind into deep, uninterrupted slumber.',
    readTime: '6 min',
  },
  {
    id: 2,
    title: 'Mucilage: The Misunderstood Miracle',
    tag: 'Digestion',
    tagColor: '#2d6a4f',
    excerpt: 'Mucilage has long been dismissed as a strange texture anomaly. But modern nutritional science is revealing it as one of nature\'s most sophisticated prebiotic delivery systems.',
    body: 'Mucilage has long been dismissed as a strange texture anomaly in Moroheiya. But modern nutritional science is revealing it as one of nature\'s most sophisticated prebiotic delivery systems. This gel-like substance coats the gut lining, reduces inflammation, and feeds the beneficial bacteria that regulate everything from mood to immunity.',
    readTime: '5 min',
  },
  {
    id: 3,
    title: 'L-Theanine meets Prebiotics',
    tag: 'Mental Clarity',
    tagColor: '#6a3d9a',
    excerpt: 'The combination of L-Theanine from Moroheiya\'s chlorophyll-rich leaves and its prebiotic polysaccharides creates a synergistic calm that no synthetic supplement can replicate.',
    body: 'The combination of L-Theanine from Moroheiya\'s chlorophyll-rich leaves and its prebiotic polysaccharides creates a synergistic calm that no synthetic supplement can replicate. L-Theanine modulates alpha brain waves, promoting a state of focused relaxation, while the prebiotics stabilise mood through the gut-brain axis.',
    readTime: '4 min',
  },
  {
    id: 4,
    title: 'Carbon Negative Cultivation',
    tag: 'Sustainability',
    tagColor: '#46770c',
    excerpt: 'Moroheiya cultivation, when practiced with regenerative agricultural principles, sequesters more carbon than it emits — a rare and beautiful alchemy between plant and planet.',
    body: 'Moroheiya cultivation, when practiced with regenerative agricultural principles, sequesters more carbon than it emits. Our Bengal Delta farms use zero synthetic inputs, intercrop with nitrogen-fixing plants, and return all organic matter to the soil — creating a closed loop that gives back more than it takes.',
    readTime: '4 min',
  },
  {
    id: 5,
    title: 'The Art of Slow Living',
    tag: 'Lifestyle',
    tagColor: '#b8693a',
    excerpt: 'In a world optimised for speed, the Amata ritual is an act of radical deceleration. Brewing tea is not merely preparation — it is the practice itself.',
    body: 'In a world optimised for speed, the Amata ritual is an act of radical deceleration. Brewing tea is not merely preparation — it is the practice itself. The three minutes of steeping become a meditation. The warmth of the cup becomes an anchor to the present moment.',
    readTime: '3 min',
  },
];

// Brand-safe placeholder image (green botanical / matcha texture)
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1400&auto=format&fit=crop';
const FEATURED_IMG = 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1600&auto=format&fit=crop';

export default function JournalGrid() {
  const [modal, setModal] = useState(null);

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Featured article */}
        {featured && (
          <article
            className={styles.featured}
            onClick={() => setModal(featured)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setModal(featured)}
            aria-label={`Read: ${featured.title}`}
          >
            <div className={styles.featImg}>
              <img src={FEATURED_IMG} alt={featured.title} loading="lazy" className={styles.featImgEl} />
              <div className={styles.featOverlay} />
              <div className={styles.featContent}>
                <span className={styles.tag} style={{ background: featured.tagColor }}>{featured.tag}</span>
                <h2 className={`serif ${styles.featTitle}`}>{featured.title}</h2>
                <p className={styles.featExcerpt}>{featured.excerpt}</p>
                <div className={styles.featMeta}>
                  <span className={styles.readMore}>Read Entry →</span>
                  <span className={styles.readTime}>{featured.readTime} read</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Grid of smaller cards */}
        <div className={styles.grid}>
          {rest.map((article) => (
            <article
              key={article.id}
              className={styles.card}
              onClick={() => setModal(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setModal(article)}
              aria-label={`Read: ${article.title}`}
            >
              <div className={styles.cardImg}>
                <img src={PLACEHOLDER_IMG} alt={article.title} loading="lazy" className={styles.cardImgEl} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.tag} style={{ background: article.tagColor }}>{article.tag}</span>
                <h3 className={`serif ${styles.cardTitle}`}>{article.title}</h3>
                <p className={styles.cardExcerpt}>{article.excerpt}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.readMore}>Read Entry →</span>
                  <span className={styles.readTime}>{article.readTime} read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modal && <ArticleModal article={{ ...modal, img: modal.featured ? FEATURED_IMG : PLACEHOLDER_IMG }} onClose={() => setModal(null)} />}
    </section>
  );
}
