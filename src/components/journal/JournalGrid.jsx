import { useState } from 'react';
import ArticleModal from './ArticleModal';
import blogsData from '../../data/blogs';
import styles from './JournalGrid.module.css';

const articles = (blogsData.blogs || []).map((blog, index) => {
  const primaryKeyword = blog.seo_keywords?.primary_keyword || blog.seoKeywords?.[0] || 'Wellness';
  const metaDescription = blog.meta_description || blog.metaDescription || '';
  
  const colors = ['#2d6a4f', '#b8693a', '#3b6ea5', '#6a3d9a', '#46770c'];
  const tagColor = colors[index % colors.length];
  
  const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
  const readTime = Math.max(3, Math.ceil(wordCount / 200)) + ' min';
  const excerpt = metaDescription || (blog.content ? blog.content.slice(0, 150) + '...' : '');

  // Premium botanical/wellness images matching the content index
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
              <img src={featured.img} alt={featured.title} loading="lazy" className={styles.featImgEl} />
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
                <img src={article.img} alt={article.title} loading="lazy" className={styles.cardImgEl} />
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

      {modal && <ArticleModal article={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
