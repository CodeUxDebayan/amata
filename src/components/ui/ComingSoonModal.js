import { useEffect } from 'react';
import { X, ArrowSquareOut, ShoppingCart, LockKey } from '@phosphor-icons/react';
import styles from './ComingSoonModal.module.css';

export default function ComingSoonModal({ isOpen, onClose, title = "Direct Checkout Coming Soon", type = "checkout" }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className={styles.badgeRow}>
          <span className={styles.badge}>
            {type === 'login' ? <LockKey size={14} /> : <ShoppingCart size={14} />}
            DEVELOPMENT IN PROGRESS
          </span>
        </div>

        <h2 className={`serif ${styles.title}`}>{title}</h2>

        <p className={styles.message}>
          {type === 'login'
            ? 'User authentication & customer accounts are currently under process. You can explore our organic Moroheiya infusions directly.'
            : 'Payment gateway integration and shipping infrastructure are currently under active development. Direct web checkout will be online shortly.'}
        </p>

        <div className={styles.amazonCard}>
          <div className={styles.amazonCardHeader}>
            <span className={styles.amazonCardTag}>RECOMMENDED ORDER METHOD</span>
            <h3 className={`serif ${styles.amazonCardTitle}`}>Shop Amata on Amazon</h3>
            <p className={styles.amazonCardSub}>
              Enjoy fast delivery, secure checkout, and full customer protection on Amazon.
            </p>
          </div>

          <a
            href="https://amazon.in/AMATA-Jute-Leaf-Tea-ANTIOXIDANT/dp/B0FC6TVHFC"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.amazonBtn}
          >
            <img src="/images/amazon-icon.svg" alt="Amazon" className={styles.amazonIcon} />
            <span>Buy on Amazon</span>
            <ArrowSquareOut size={18} />
          </a>
        </div>

        <div className={styles.actions}>
          <button className={styles.continueBtn} onClick={onClose}>
            Continue Browsing Website
          </button>
        </div>
      </div>
    </>
  );
}
