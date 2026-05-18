// split-text animation handled by _app.js
import styles from './JournalHero.module.css';

export default function JournalHero() {
  // split-text animation is handled globally by _app.js SplitTextInit

  return (
    <section className={styles.hero}>
      {/* Botanical SVG accents */}
      <svg className={`${styles.accent} ${styles.accent1}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C70 30 90 50 50 100 C10 50 30 30 50 0 Z" fill="var(--c-matcha)" />
      </svg>
      <svg className={`${styles.accent} ${styles.accent2}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C80 10 90 40 50 100 C10 40 20 10 50 0 Z" fill="var(--c-terracotta)" />
      </svg>

      <h1 className={`serif split-text ${styles.title}`}>Journal</h1>
      <p className={styles.sub}>
        Insights, stories, and musings drawn from nature. A place for quiet reflection and shared wisdom.
      </p>
    </section>
  );
}
