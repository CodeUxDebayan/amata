import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { subscribeEmail } from '../../lib/firestore';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [openSections, setOpenSections] = useState({
    explore: false,
    policies: false,
    connect: false,
    offices: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeEmail(email);
      setJoined(true);
    } catch (_) {
      setJoined(true); // Still show success — don't expose errors
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.overlapGrid}>
        <div className={styles.top}>
          <div className={styles.col}>
            <h4 style={{ color: 'var(--c-sand)' }}>Newsletter</h4>
            {joined ? (
              <p className={styles.joinedMsg}>Thank you for joining the circle.</p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.emailForm}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.joinBtn}>Join</button>
              </form>
            )}
          </div>

          <div className={styles.fLinks}>
            <div className={`${styles.col} ${openSections.explore ? styles.open : ''}`}>
              <h4 onClick={() => toggleSection('explore')} className={styles.dropdownHeader}>
                Explore
                <span className={styles.arrow}></span>
              </h4>
              <ul className={styles.dropdownContent}>
                <li><Link href="/">Shop</Link></li>
                <li><Link href="/learn">Our Story</Link></li>
                <li><Link href="/journal">Journal</Link></li>
              </ul>
            </div>
            <div className={`${styles.col} ${openSections.policies ? styles.open : ''}`}>
              <h4 onClick={() => toggleSection('policies')} className={styles.dropdownHeader}>
                Policies
                <span className={styles.arrow}></span>
              </h4>
              <ul className={styles.dropdownContent}>
                <li><Link href="/policies/cancellation-and-refund-policy">Cancellation & Refund</Link></li>
                <li><Link href="/policies/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/policies/shipping-policy">Shipping Policy</Link></li>
                <li><Link href="/policies/terms-and-conditions">Terms & Conditions</Link></li>
                <li><Link href="/policies/terms-of-service">Terms of Service</Link></li>
              </ul>
            </div>
            <div className={`${styles.col} ${openSections.connect ? styles.open : ''}`}>
              <h4 onClick={() => toggleSection('connect')} className={styles.dropdownHeader}>
                Connect
                <span className={styles.arrow}></span>
              </h4>
              <ul className={styles.dropdownContent}>
                <li><a href="https://www.instagram.com/amata_moroheiya_brew/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="http://facebook.com/profile.php?id=61567325225798" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li>
                  <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91877395787'}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp: +{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91877395787'}
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@amatajutetea.com" target="_blank" rel="noopener noreferrer">
                    Email: contact@amatajutetea.com
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${styles.col} ${styles.officesCol} ${openSections.offices ? styles.open : ''}`}>
              <h4 onClick={() => toggleSection('offices')} className={styles.dropdownHeader}>
                Global Offices
                <span className={styles.arrow}></span>
              </h4>
              <div className={styles.dropdownContent}>
                <div className={styles.officeBlock}>
                  <h5 className={styles.officeCountry}>UK Office</h5>
                  <p className={styles.officeName}>Presidency Limited</p>
                  <p className={styles.officeAddr}>124 City Road, London EC1V 2NX, United Kingdom</p>
                </div>
                <div className={styles.officeBlock}>
                  <h5 className={styles.officeCountry}>Japan Office</h5>
                  <p className={styles.officeName}>MARUNOUCHIBUSSAN CO.LTD</p>
                  <p className={styles.officeAddr}>12-4 Kasuga Ashiya Hyogo, 6590021, Japan</p>
                  <p className={styles.officeContact}>Ph: <a href="tel:+817091053657">+81-70-9105-3657</a></p>
                  <p className={styles.officeContact}>Email: <a href="mailto:contact@amatajutetea.com">contact@amatajutetea.com</a></p>
                </div>
                <div className={styles.officeBlock}>
                  <h5 className={styles.officeCountry}>India HQ</h5>
                  <p className={styles.officeName}>Amata Jute Tea LLP</p>
                  <p className={styles.officeAddr}>Arch Square, Block EP & GP, Unit 201, Salt Lake City, Sector-V, Kolkata — 700091</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>&copy; 2026 Amata Brew</div>
        <div>Regenerative Wellness · 再生の健康</div>
      </div>
    </footer>
  );
}
