import Link from 'next/link';
import styles from './Ritual.module.css';

const ritualGroups = [
  {
    time: '朝 · प्रातः · Morning · 05:30',
    words: [
      { text: 'Awakening.',  italic: false },
      { text: 'Clarity.',    italic: false },
      { text: 'Intention.',  italic: true  },
    ],
  },
  {
    time: '昼 · मध्याह्न · Midday · 12:00',
    words: [
      { text: 'Balance.',   italic: false, delay: '0.2s' },
      { text: 'Flow.',      italic: false, delay: '0.7s' },
      { text: 'Presence.',  italic: true,  delay: '1.2s' },
    ],
  },
  {
    time: '夜 · सायं · Evening · 21:00',
    words: [
      { text: 'Release.',   italic: false, delay: '0.4s' },
      { text: 'Surrender.', italic: false, delay: '0.9s' },
      { text: 'Rest.',      italic: true,  delay: '1.4s' },
    ],
  },
];

export default function Ritual() {
  return (
    <section className={styles.ritual}>
      {/* Breathing rings */}
      <div className={styles.rings} aria-hidden="true">
        {[1,2,3,4,5].map((i) => <div key={i} className={styles.ring} />)}
      </div>
      <div className={styles.bgKanji} aria-hidden="true">茶</div>

      <div className={styles.label}>Daily Ritual · 毎日の儀式</div>

      {ritualGroups.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && (
            <div className={styles.divider} aria-hidden="true">· · ·</div>
          )}
          <div className={styles.group}>
            <div className={styles.time}>{group.time}</div>
            <div className={styles.words}>
              {group.words.map((w, wi) => (
                <Link
                  key={wi}
                  href="/journal"
                  className={`serif ${styles.word}`}
                  style={{
                    animationDelay: w.delay || '0s',
                    fontStyle: w.italic ? 'italic' : 'normal',
                  }}
                >
                  {w.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
