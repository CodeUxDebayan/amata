import { useState, useRef, useEffect } from 'react';
import faqData, { teaBoxMeta } from '../../data/faqData';
import styles from './FaqBot.module.css';

// Flatten all FAQ items into a quick-access list with category info
const allQuestions = teaBoxMeta.flatMap((meta) =>
  (faqData[meta.cat] || []).map((item) => ({
    ...item,
    cat: meta.name,
    catColor: meta.color,
  }))
);

// Typewriter hook
function useTypewriter(text, active, speed = 22) {
  const [displayed, setDisplayed] = useState('');
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active || !text) { setDisplayed(''); return; }
    setDisplayed('');
    let i = 0;
    const next = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        rafRef.current = setTimeout(next, speed);
      }
    };
    rafRef.current = setTimeout(next, speed);
    return () => clearTimeout(rafRef.current);
  }, [text, active, speed]);

  return displayed;
}

function BotMessage({ text }) {
  const [started, setStarted] = useState(false);
  const [typing, setTyping] = useState(true);
  const typed = useTypewriter(text, started);

  useEffect(() => {
    const t = setTimeout(() => {
      setStarted(true);
      // Hide typing indicator shortly after starting
      setTimeout(() => setTyping(false), 800);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.botMsg}>
      <div className={styles.avatar} aria-hidden="true">A</div>
      <div className={styles.bubble}>
        {typing && !started && (
          <span className={styles.typingDots} aria-label="typing">
            <span /><span /><span />
          </span>
        )}
        {started && <span>{typed}</span>}
      </div>
    </div>
  );
}

export default function FaqBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const scrollRef = useRef(null);

  // Welcome message on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { type: 'bot', text: 'Namaste 🙏 I\'m Amata\'s tea guide. What would you like to know?' },
      ]);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleQuestion(q) {
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: q.q },
      { type: 'bot', text: q.a },
    ]);
    setSelectedCat(null);
  }

  function handleCategorySelect(cat) {
    setSelectedCat((prev) => (prev === cat ? null : cat));
  }

  function resetChat() {
    setMessages([
      { type: 'bot', text: 'Of course! What else can I help you with?' },
    ]);
    setSelectedCat(null);
  }

  const catQuestions = selectedCat
    ? allQuestions.filter((q) => q.cat === selectedCat)
    : null;

  return (
    <>
      {/* FAB trigger button */}
      <button
        id="faq-bot-btn"
        className={`${styles.fab} ${open ? styles.fabActive : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close FAQ assistant' : 'Open FAQ assistant'}
        aria-expanded={open}
      >
        <span className={styles.fabRing} aria-hidden="true" />
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={styles.fabIcon} aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.fabIcon} aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.007L2.07 21.6a.5.5 0 00.626.628l4.653-1.24A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 5a1 1 0 110 2 1 1 0 010-2zm1 4v5a1 1 0 11-2 0v-5a1 1 0 112 0z" />
          </svg>
        )}
        {!open && <span className={styles.fabBadge} aria-hidden="true">{allQuestions.length}</span>}
      </button>

      {/* Panel */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`} role="dialog" aria-label="Amata FAQ Assistant" aria-hidden={!open}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerAvatar}>A</div>
          <div>
            <div className={styles.headerName}>Amata Guide</div>
            <div className={styles.headerStatus}>
              <span className={styles.statusDot} />
              Online · 茶の案内
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages} ref={scrollRef}>
          {messages.map((msg, i) => (
            msg.type === 'bot'
              ? <BotMessage key={i} text={msg.text} />
              : (
                <div key={i} className={styles.userMsg}>
                  <div className={styles.userBubble}>{msg.text}</div>
                </div>
              )
          ))}
        </div>

        {/* Quick-select categories */}
        <div className={styles.categories}>
          <p className={styles.catLabel}>Browse topics:</p>
          <div className={styles.catChips}>
            {teaBoxMeta.map((meta) => (
              <button
                key={meta.cat}
                className={`${styles.catChip} ${selectedCat === meta.name ? styles.catChipActive : ''}`}
                style={selectedCat === meta.name ? { background: meta.color, color: '#fff' } : {}}
                onClick={() => handleCategorySelect(meta.name)}
              >
                {meta.name}
                <span className={styles.catJp}>{meta.nameJp}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Questions list */}
        {catQuestions && (
          <div className={styles.questionsList}>
            {catQuestions.map((q, i) => (
              <button
                key={i}
                className={styles.questionItem}
                onClick={() => handleQuestion(q)}
              >
                <span className={styles.questionArrow}>›</span>
                {q.q}
              </button>
            ))}
          </div>
        )}

        {/* Reset */}
        <div className={styles.footer}>
          <a
            className={styles.resetBtn}
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}?text=${encodeURIComponent("Hello! I'd like to ask our Tea masters a question about Amata Moroheiya tea.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            💬 Ask our Tea masters
          </a>
          <span className={styles.footerTag}>Powered by Amata · アマタ</span>
        </div>
      </div>
    </>
  );
}
