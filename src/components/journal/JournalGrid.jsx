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

  // Map tag to image filename in /images/blog_images/
  const tagNormalized = primaryKeyword.trim().toLowerCase();
  
  let img = blog.image || '';
  
  if (!img) {
    if (tagNormalized.includes('jute leaf tea vs green tea')) {
      img = '/images/blog_images/superleaf_infusion.jpeg';
    } else if (tagNormalized.includes('japanese moroheiya tea ceremony')) {
      img = '/images/blog_images/japanese_moroheiya_tea_ceremony.jpeg';
    } else if (tagNormalized.includes('gut-brain')) {
      img = '/images/blog_images/gut-brain.png';
    } else if (tagNormalized.includes('best amata flavours')) {
      img = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop';
    } else if (tagNormalized.includes('exotic jute tea blends')) {
      img = '/images/blog_images/amata_jute_tea_blends.jpeg';
    } else if (tagNormalized.includes('amata jute tea benefits')) {
      img = '/images/blog_images/amata_jute_tea_benefits.jpeg';
    } else if (tagNormalized.includes('functional wellness tea')) {
      img = '/images/blog_images/functional_wellness_tea.jpeg';
    } else if (tagNormalized.includes('science-backed health benefits')) {
      img = '/images/blog_images/science_backed_health_benefits_of_jute_leaf_tea.jpeg';
    } else if (tagNormalized.includes('sustainability') || tagNormalized.includes('farmer impact')) {
      img = '/images/blog_images/amata_sustainbility.jpeg';
    } else {
      img = '/images/blog_images/amata_jute_tea.jpeg';
    }
  }

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
  return (
    <section className={styles.section}>
      <div className={styles.comingSoon}>
        <svg className={styles.comingSoonLeaf} viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 0 C100 50 110 120 60 200 C10 120 20 50 60 0 Z" fill="var(--c-deep, #0a2d33)" />
          <path d="M60 40 C80 80 85 130 60 180 C35 130 40 80 60 40 Z" fill="var(--c-sand, #ead39d)" />
        </svg>
        <h2 className={`serif ${styles.comingSoonTitle}`}>Coming Soon!</h2>
        <p className={styles.comingSoonSubtitle}>
          The tea masters are currently compiling insights, research, and stories on prebiotic wellness, the gut-brain axis, and the art of Corchorus olitorius.
        </p>
        <p className={styles.comingSoonJp}>
          近日公開 · 記事が作成中ですので、しばらくお待ちください
        </p>
      </div>
    </section>
  );
}
