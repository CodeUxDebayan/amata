import styles from './MarqueeStrip.module.css';

const DEFAULT_ITEMS = [
  '茶道 · Chado', 'मोरोहेया · Moroheiya', '自然 · Nature', 'प्राण · Prana',
  '森林 · Forest', 'पवित्र · Sacred', '癒し · Healing', 'अमृत · Amrita',
];

export default function MarqueeStrip({ items = DEFAULT_ITEMS, dark = false, reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div
      className={[
        'amata-marquee-strip',
        styles.strip,
        dark    ? 'dark'    : '',
        reverse ? 'rev'     : '',
      ].join(' ')}
    >
      <div className={`amata-marquee-track ${styles.track}`}>
        {doubled.map((item, i) => (
          <span key={i} className={`amata-marquee-item ${styles.item}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
