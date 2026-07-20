import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HomeTeam.module.css';


const members = [
  { 
    img: '/images/team/Mr. Nilay Guha Roy, CEO.jpeg', 
    name: 'Mr. Nilay Guha Roy', 
    role: 'CEO', 
    linkedin: 'https://www.linkedin.com/in/nilay-guha-roy-603817311/' 
  },
  { 
    img: '/images/team/Mr. Roman Nath, CFO.jpeg', 
    name: 'Mr. Roman Nath',     
    role: 'CFO', 
    linkedin: 'https://www.linkedin.com/in/roman-nath-22b459408/' 
  },
  { 
    img: '/images/team/Dr. Abhipriya Chatterjee, CMO, QC, R&D Head.jpeg', 
    name: 'Dr. Abhipriya Chatterjee',     
    role: 'CMO, QC, R&D Head',
    linkedin: null
  },
  { 
    img: '/images/team/Mr. Tapan Nath, COO.jpeg', 
    name: 'Mr. Tapan Nath',     
    role: 'COO',
    linkedin: null
  },
  { 
    img: '/images/team/Mrs. Barnali Nath, CIO.jpeg', 
    name: 'Mrs. Barnali Nath',     
    role: 'CIO',
    linkedin: null
  },
  { 
    img: '/images/team/Ms. Kanika Bose, BDM.jpeg', 
    name: 'Ms. Kanika Bose',     
    role: 'BDM',
    linkedin: null
  }
];

export default function HomeTeam() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    let active = true;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!active || !sectionRef.current) return;

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          gsap.set(`.${styles.card}`, { opacity: 1, y: 0 });
          return;
        }
        gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play reverse play reverse' },
            }
          );
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    const timer = setTimeout(init, 100);

    return () => {
      active = false;
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.team}>
      <h2 className={`serif text-center split-text ${styles.heading}`}>The Steep Founders</h2>
      <div className={styles.grid}>
        {members.map((m) => (
          <div key={m.name} className={styles.card}>
            <div className={styles.imgWrap} style={{ position: 'relative' }}>
              <Image 
                src={m.img} 
                alt={m.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                style={{ objectFit: 'cover' }} 
              />
            </div>
            <div className={styles.name}>
              {m.name}
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink} aria-label={`${m.name} LinkedIn`}>
                  <svg className={styles.linkedinIcon} viewBox="0 0 24 24" width="20" height="20">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
            </div>
            <div className={styles.role}>{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
