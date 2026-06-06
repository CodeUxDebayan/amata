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
                <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
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
