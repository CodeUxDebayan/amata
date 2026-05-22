import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import styles from './Nav.module.css';

export default function Nav({ theme = 'auto' }) {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change / resize
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${styles[theme] || ''}`}>
        <Link href="/" className={styles.logo}>
          Amata
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          <Link href="/learn" className={styles.link}>Learn</Link>
          <Link href="/journal" className={styles.link}>Journal</Link>
          <button
            className={`${styles.link} ${styles.cartBtn}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
          >
            <span
              className={styles.cartIcon}
              style={{
                WebkitMask: "url('/images/cart-icon.png') no-repeat center / contain",
                mask: "url('/images/cart-icon.png') no-repeat center / contain",
              }}
            />
            <span>Satchel</span>
            {count > 0 && <span className={styles.cartCount}>{count}</span>}
          </button>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} aria-hidden={!menuOpen}>
        <nav className={styles.drawerNav}>
          <Link href="/" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/learn" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Learn</Link>
          <Link href="/journal" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Journal</Link>
          <button
            className={`${styles.drawerLink} ${styles.drawerCartBtn}`}
            onClick={() => { setMenuOpen(false); setIsOpen(true); }}
          >
            Satchel {count > 0 && <span className={styles.drawerCartCount}>{count}</span>}
          </button>
        </nav>
        <div className={styles.drawerTagline}>
          <span>जूट चाय · ジュートティー</span>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
