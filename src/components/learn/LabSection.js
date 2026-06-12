import styles from './LabSection.module.css';

export default function LabSection() {
  return (
    <section className={styles.lab}>
      <div className={styles.content}>
        <h2 className={`serif ${styles.heading}`}>Government Research & Botanical Purity</h2>
        <p className={styles.body}>
          Extensive research by agricultural bodies, including the Indian Government's Jute Research institutions, has highlighted the extraordinary nutritional and medicinal potential of Moroheiya (Jute Leaves). Studies confirm that these leaves are a prebiotic powerhouse—rich in vitamins, minerals, and antioxidants—that strongly support gut health, immune function, and the gut-brain axis.
        </p>
        <p className={styles.body} style={{ marginTop: '1rem' }}>
          While widely celebrated for its health benefits, per FSSAI regulations, true "tea" is exclusively derived from the <em>Camellia sinensis</em> plant. Therefore, we proudly present Amata as a pure, caffeine-free <strong>herbal infusion</strong>. Every batch undergoes rigorous multi-stage testing in our certified facilities to ensure absolute purity and compliance, bringing you a scientifically-backed wellness ritual from soil to cup.
        </p>
      </div>
    </section>
  );
}
