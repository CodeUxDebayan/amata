import styles from './LabSection.module.css';

export default function LabSection() {
  return (
    <section className={styles.lab}>
      <div className={styles.content}>
        <h2 className={`serif ${styles.heading}`}>The Laboratory Process</h2>
        <p className={styles.body}>
          Every batch undergoes rigorous multi-stage testing in our Kyoto-certified facilities.
          From microbial analysis to polyphenol extraction, we ensure absolute purity. Our
          educational testing process emphasises transparency, bringing you along on the journey
          from soil to cup.
        </p>
      </div>
      <div className={styles.media}>
        <img
          src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=1470&auto=format&fit=crop"
          loading="lazy"
          alt="Laboratory testing"
          className={styles.img}
        />
      </div>
    </section>
  );
}
