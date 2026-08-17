import { useState, useEffect } from 'react';
import styles from './LabSection.module.css';

export default function LabSection() {
  const images = [
    '/images/Lab/susa3.jpg',
    '/images/Lab/susa16.jpg',
    '/images/Lab/WhatsApp Image 2026-08-17 at 8.34.14 PM.jpeg'
  ];
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

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

      <div className={styles.media} style={{ position: 'relative' }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Lab testing ${idx + 1}`}
            className={styles.img}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: activeImg === idx ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ))}
      </div>
    </section>
  );
}
