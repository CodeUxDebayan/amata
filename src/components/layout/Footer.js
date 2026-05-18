import { useState } from 'react';
import Link from 'next/link';
import { subscribeEmail } from '../../lib/firestore';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

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
            <h4>Newsletter</h4>
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
            <div className={styles.col}>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/">Shop</Link></li>
                <li><Link href="/learn">Our Story</Link></li>
                <li><Link href="/journal">Journal</Link></li>
              </ul>
            </div>
            <div className={styles.col}>
              <h4>Connect</h4>
              <ul>
                <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.hugeFoooterWrap}>
          <div className={styles.footerWatermark}>अमृत · 不死 · ॐ</div>
          <div className={styles.hugeFooter}>
            <img src="/images/white-logo.png" alt="Amata" />
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
