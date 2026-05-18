import { useEffect, useRef } from 'react';
import styles from './ArticleModal.module.css';

export default function ArticleModal({ article, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap');
      gsap.fromTo(modalRef.current, { y: '100%' }, { y: 0, duration: 1, ease: 'expo.out' });
    }
    init();

    function handleKey(e) {
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []);

  async function handleClose() {
    const { gsap } = await import('gsap');
    gsap.to(modalRef.current, {
      y: '100%', duration: 0.8, ease: 'expo.in',
      onComplete: onClose,
    });
  }

  if (!article) return null;

  return (
    <div ref={modalRef} className={styles.modal}>
      <button className={styles.closeBtn} onClick={handleClose}>Close</button>
      <div className={styles.content}>
        <div className={styles.meta}>Journal Entry</div>
        <h2 className={`serif ${styles.title}`}>{article.title}</h2>
        <img src={article.img} className={styles.img} alt={article.title} />
        <p className={styles.body}>{article.body}</p>
      </div>
    </div>
  );
}
