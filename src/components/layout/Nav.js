import Link from 'next/link';
import { ShoppingBag } from '@phosphor-icons/react';
import { useCart } from '../../context/CartContext';
import styles from './Nav.module.css';

export default function Nav({ theme = 'auto' }) {
  const { count, setIsOpen } = useCart();

  return (
    <nav className={`${styles.nav} ${styles[theme] || ''}`}>
      <Link href="/" className={`${styles.logo}`}>
        Amata
      </Link>

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
    </nav>
  );
}
