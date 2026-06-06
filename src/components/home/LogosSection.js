import Link from 'next/link';
import Image from 'next/image';
import styles from './LogosSection.module.css';

const compliances = [
  { name: 'BQM- ORGANIC', icon: '/images/icon_cert/BQM.png' },
  { name: 'BQM- HACCP', icon: '/images/icon_cert/BQM.png' },
  { name: 'WHOGMP', icon: '/images/icon_cert/Screenshot 2026-06-03 220055.png' },
  { name: 'FSSAI', icon: '/images/icon_cert/FSSAI.png' },
];

export default function LogosSection() {
  return (
    <section className={styles.logos}>
      {/* Interactive compliances grid */}
      <div className={styles.compliancesContainer}>
        <h3 className={styles.compliancesTitle}>Accreditations & Quality Standards</h3>
        <div className={styles.compliancesGrid}>
          {compliances.map((c, idx) => (
            <Link key={idx} href="/compliances" className={styles.complianceItem}>
              <div className={styles.complianceIconWrapper}>
                <Image src={c.icon} alt={`${c.name} Icon`} width={120} height={120} className={styles.complianceIcon} />
              </div>
              <span className={styles.complianceName}>{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
