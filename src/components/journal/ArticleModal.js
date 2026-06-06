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

  const renderBody = (content) => {
    if (!content) return null;
    const blocks = content.split(/\n\n+/);
    
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;
      
      // Check if it's a table representation (starts with |)
      if (trimmed.startsWith('|')) {
        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        const rows = lines.map(line => {
          return line.split('|').map(cell => cell.trim()).filter((_, i) => i > 0 && i < line.split('|').length - 1);
        });
        if (rows.length > 0) {
          const headers = rows[0];
          const bodyRows = rows.slice(2); // Skip header separator line (row 1)
          return (
            <div key={idx} className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {headers.map((h, i) => <th key={i}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => <td key={cIdx}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Check if it's a bulleted list block
      if (trimmed.startsWith('*') || trimmed.includes('\n*')) {
        const lines = trimmed.split('\n');
        const listItems = [];
        const introLines = [];
        
        lines.forEach(line => {
          const lineTrimmed = line.trim();
          if (lineTrimmed.startsWith('*')) {
            listItems.push(lineTrimmed.substring(1).trim());
          } else {
            introLines.push(line);
          }
        });
        
        return (
          <div key={idx} className={styles.paragraphBlock}>
            {introLines.length > 0 && (
              <p className={styles.bodyParagraph}>{introLines.join('\n')}</p>
            )}
            <ul className={styles.bulletList}>
              {listItems.map((item, itemIdx) => {
                const colonIndex = item.indexOf(':');
                if (colonIndex !== -1 && colonIndex < 35) {
                  const boldPart = item.substring(0, colonIndex + 1);
                  const restPart = item.substring(colonIndex + 1);
                  return (
                    <li key={itemIdx} className={styles.listItem}>
                      <strong>{boldPart}</strong>{restPart}
                    </li>
                  );
                }
                return <li key={itemIdx} className={styles.listItem}>{item}</li>;
              })}
            </ul>
          </div>
        );
      }
      
      // Check if it's a numbered point (e.g., "1. The Magnesium Sleep Miracle.")
      const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        const num = numberedMatch[1];
        const rest = numberedMatch[2];
        
        const firstDot = rest.indexOf('.');
        if (firstDot !== -1 && firstDot < 45) {
          const heading = rest.substring(0, firstDot);
          const bodyText = rest.substring(firstDot + 1);
          return (
            <div key={idx} className={styles.numberedSection}>
              <h3 className={`serif ${styles.sectionHeading}`}>
                <span className={styles.sectionNumber}>{num}.</span> {heading}
              </h3>
              <p className={styles.bodyParagraph}>{bodyText.trim()}</p>
            </div>
          );
        }
      }
      
      // Check if it's a subheading/title block (short, no dot at end)
      if (trimmed.length < 100 && !trimmed.endsWith('.') && !trimmed.endsWith('?') && !trimmed.includes('\n')) {
        return (
          <h3 key={idx} className={`serif ${styles.sectionHeading}`}>
            {trimmed}
          </h3>
        );
      }
      
      // Default paragraph
      return (
        <p key={idx} className={styles.bodyParagraph}>
          {trimmed}
        </p>
      );
    });
  };

  if (!article) return null;

  return (
    <div ref={modalRef} className={styles.modal} data-lenis-prevent>
      <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
        <span>Close</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className={styles.content}>
        <div className={styles.meta}>Journal Entry</div>
        <h2 className={`serif ${styles.title}`}>{article.title}</h2>
        <img src={article.img} className={styles.img} alt={article.title} />
        <div className={styles.body}>{renderBody(article.body)}</div>
      </div>
    </div>
  );
}
