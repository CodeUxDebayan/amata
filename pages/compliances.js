import { useState } from 'react';
import Layout from '../src/components/layout/Layout';
import styles from '../src/components/compliances/Compliances.module.css';

const certsData = [
  {
    id: 'bqm-organic',
    title: 'BQM - ORGANIC',
    icon: '/images/icon_cert/BQM.png',
    image: '/images/BQM - ORGANIC.png',
    desc: 'Certified Organic compliance verifying that our cultivation, farming, and processing practices follow strict organic agriculture guidelines without chemical interventions.'
  },
  {
    id: 'bqm-haccp',
    title: 'BQM - HACCP',
    icon: '/images/icon_cert/BQM.png',
    image: '/images/BQM - HACCP.png',
    desc: 'Hazard Analysis Critical Control Point certification assuring the highest standard of food safety controls, monitoring, and quality checkpoints at every production phase.'
  },
  {
    id: 'whogmp',
    title: 'WHOGMP',
    icon: '/images/icon_cert/Screenshot 2026-06-03 220055.png',
    image: '/images/WHOGMP.png',
    desc: 'WHO Good Manufacturing Practices certification validating quality consistency and manufacturing protocols to meet stringent international standards.'
  },
  {
    id: 'fssai',
    title: 'FSSAI',
    icon: '/images/icon_cert/FSSAI.png',
    image: '/images/FSSAI.png',
    desc: 'Food Safety and Standards Authority of India licensing ensuring food purity, hygienic packaging, and adherence to Indian food safety regulations.'
  }
];

export default function CompliancesPage() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <Layout
      title="Amata | Quality Certifications & Compliances"
      description="View our global quality standard certifications, including BQM Organic, HACCP, WHO GMP, and FSSAI, ensuring the highest purity of our Moroheiya tea."
      canonical="https://amata.in/compliances"
    >
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Accreditation & Standards</p>
            <h1 className={`serif ${styles.heading}`}>Quality Certifications</h1>
            <p className={styles.sub}>
              We are committed to absolute purity, food safety, and transparent sourcing. 
              Explore our validated compliances from leading national and global authorities.
            </p>
          </div>

          <div className={styles.grid}>
            {certsData.map((cert) => (
              <div 
                key={cert.id} 
                className={styles.card}
                onClick={() => setActiveCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveCert(cert)}
              >
                <div className={styles.iconWrapper}>
                  <img src={cert.icon} alt={`${cert.title} Icon`} className={styles.iconImg} />
                </div>
                <h2 className={`serif ${styles.certTitle}`}>{cert.title}</h2>
                <p className={styles.certDesc}>{cert.desc}</p>
                <div className={styles.previewContainer}>
                  <img src={cert.image} alt={`${cert.title} Preview`} className={styles.previewImg} />
                </div>
                <span className={styles.viewBtn}>View Full Certificate →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {activeCert && (
        <div 
          className={styles.lightbox} 
          onClick={() => setActiveCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveCert(null)} aria-label="Close modal">
              &times;
            </button>
            <img src={activeCert.image} alt={activeCert.title} className={styles.lightboxImg} />
            <h3 className={`serif ${styles.lightboxTitle}`}>{activeCert.title}</h3>
          </div>
        </div>
      )}
    </Layout>
  );
}
