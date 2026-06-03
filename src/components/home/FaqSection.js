import { useState, useEffect } from 'react';
import faqData, { teaBoxMeta } from '../../data/faqData';
import styles from './FaqSection.module.css';

function TeaBag({ item, delay }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.teaBag} ${open ? styles.teaBagOpen : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div className={styles.teaBagTag} />
      <div className={styles.teaBagString} />
      <div className={styles.teaBagShape} onClick={() => setOpen(!open)}>
        <div className={styles.teaBagPerf} />
        <div className={styles.teaBagTexture} />
        <div className={styles.teaBagQuestion}>
          <span>{item.q}</span>
          <span className={`${styles.teaBagToggle}`}>+</span>
        </div>
        <div
          className={styles.teaBagAnswer}
          style={{ maxHeight: open ? '400px' : '0' }}
        >
          <div className={styles.teaBagAnswerInner}>{item.a}</div>
        </div>
      </div>
    </div>
  );
}

function TeaBox({ meta, isActive, onClick }) {
  const boxBg = {
    brewing:     'linear-gradient(160deg, #2d4a3e, #1a3028)',
    health:      'linear-gradient(160deg, #4a6b3a, #2d4422)',
    ingredients: 'linear-gradient(160deg, #6b4a2d, #4a3018)',
    shipping:    'linear-gradient(160deg, #3a4a6b, #222d4a)',
  }[meta.cat];

  const lidBg = {
    brewing:     'linear-gradient(160deg, #3a5c4e, #2d4a3e)',
    health:      'linear-gradient(160deg, #5a7b4a, #4a6b3a)',
    ingredients: 'linear-gradient(160deg, #7b5a3d, #6b4a2d)',
    shipping:    'linear-gradient(160deg, #4a5a7b, #3a4a6b)',
  }[meta.cat];

  const icons = { brewing: '🍵', health: '❤️', ingredients: '🌿', shipping: '📦' };

  return (
    <div
      className={`${styles.teaBox} ${isActive ? styles.teaBoxActive : ''}`}
      data-cat={meta.cat}
      onClick={onClick}
    >
      <div className={styles.teaBoxInner}>
        <div className={styles.teaBoxLid} style={{ background: lidBg }} />
        <div className={styles.teaBoxFace} style={{ background: boxBg }}>
          <div className={styles.teaBoxIcon}>{icons[meta.cat]}</div>
          <div className={`serif ${styles.teaBoxName}`}>{meta.name}</div>
          <div className={styles.teaBoxJp}>{meta.nameJp}</div>
          <div className={styles.teaBoxCount}>{faqData[meta.cat].length} Bags</div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('brewing');

  return (
    <section className={styles.faqPage}>
      <div className={styles.bgKanji} aria-hidden="true">茶問答</div>

      <div className={styles.header}>
        <div className={styles.label}>よくある質問 · सामान्य प्रश्न</div>
        <h2 className={`serif ${styles.sectionTitle} split-text`}>
          <span className="text-terracotta">Questions</span>
          <br />
          <span className="text-terracotta">&amp;</span>{' '}
          <span className="text-matcha">Answers</span>
        </h2>
        <p className={styles.subtitle}>
          Select a tea box to reveal the answers within.
        </p>
      </div>

      {/* Tea Shelf */}
      <div className={styles.teaShelf}>
        {teaBoxMeta.map((meta) => (
          <TeaBox
            key={meta.cat}
            meta={meta}
            isActive={activeCategory === meta.cat}
            onClick={() => setActiveCategory(meta.cat)}
          />
        ))}
      </div>

      {/* Tea Bags */}
      <div className={styles.teaBagsArea}>
        {faqData[activeCategory].map((item, i) => (
          <TeaBag key={`${activeCategory}-${i}`} item={item} delay={`${i * 0.08}s`} />
        ))}
      </div>
    </section>
  );
}
