// split-text animation handled by _app.js
import styles from './LearnHero.module.css';

export default function LearnHero() {
  // split-text animation is handled globally by _app.js SplitTextInit

  return (
    <section className={styles.hero}>
      <h1 className={`serif split-text ${styles.title}`}>The Living Cycle</h1>
      <p className={styles.sub}>
        From the mineral-rich soils of the Indian subcontinent to the refined artistry of Kyoto.
        Witness the genesis of a new wellness category.
      </p>
    </section>
  );
}
