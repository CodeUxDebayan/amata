import Image from 'next/image';
import styles from './BrewMasters.module.css';

const masters = [
  {
    img: '/images/team/niloy.jpg',
    name: 'Niloy',
    role: 'Head of Cultivation',
    quote: '"The soil tells a story. When we introduced Japanese shading techniques to the Indian delta, the Moroheiya responded with an unprecedented depth of flavor."',
  },
  {
    img: '/images/team/roman.jpg',
    name: 'Roman',
    role: 'Lead Alchemist',
    quote: '"Blending ancient Ayurvedic principles with modern extraction allows us to preserve the delicate prebiotics without compromising the sensory experience."',
  },
];

export default function BrewMasters() {
  return (
    <section className={styles.section}>
      <h2 className={`serif text-center ${styles.heading}`}>Brew Master&apos;s Insights</h2>
      <div className={styles.grid}>
        {masters.map((m) => (
          <div key={m.name} className={styles.card}>
            <Image 
              src={m.img} 
              alt={m.name} 
              width={250} 
              height={300} 
              className={styles.img} 
              style={{ objectFit: 'cover' }}
            />
            <h3 className={`serif ${styles.name}`}>{m.name}</h3>
            <div className={styles.role}>{m.role}</div>
            <p className={styles.quote}>{m.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
