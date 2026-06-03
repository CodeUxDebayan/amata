import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../src/components/layout/Layout';
import { useCart } from '../src/context/CartContext';
import products from '../src/data/products';
import styles from '../src/styles/products.module.css';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx;
    async function init() {
      const { gsap } = await import('gsap');
      ctx = gsap.context(() => {
        gsap.fromTo(cardRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={cardRef} className={styles.card}>
      <Link href={`/product/${product.slug}`} className={styles.imgMask}>
        <Image
          src={product.primaryImage}
          className={styles.imgPrimary}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Image
          src={product.hoverImage}
          className={styles.imgReveal}
          alt={`${product.name} – ritual`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      
      <div className={styles.cardBody}>
        <div className={styles.cardTagRow}>
          <span className={styles.cardTag}>{product.certifications[0]}</span>
          <span className={styles.cardWeight}>{product.weight}</span>
        </div>
        
        <div className={styles.head}>
          <h3 className={`serif ${styles.cardTitle}`}>
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <div className={styles.price}>${product.price}</div>
        </div>
        
        <div className={styles.nameJp}>{product.nameJp}</div>
        <p className={styles.desc}>{product.description}</p>
        
        <div className={styles.actions}>
          <button
            className={`amata-btn amata-btn--sand ${styles.addBtn}`}
            onClick={() => addItem(product)}
          >
            Add to Satchel
          </button>
          <Link href={`/product/${product.slug}`} className={styles.learnLink}>
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx;
    async function init() {
      const { gsap } = await import('gsap');
      ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.header} > *`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
        );
      }, pageRef);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <Layout 
      title="Amata | Prebiotic Moroheiya Infusions Collection"
      description="Browse the full collection of Amata's organic Moroheiya infusions, including Ginger, Elaichi, Mint, and Pure. Formulated for gut health and mental clarity."
      canonical="https://amata.in/products"
    >
      <div ref={pageRef} className={styles.page}>
        <header className={styles.header}>
          <div className={styles.label}>Our Collections · コレクション</div>
          <h1 className="serif split-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Moroheiya Infusions
          </h1>
          <p className={styles.subtitle}>
            Crafted to stimulate prebiotic activity, optimize the <strong>Gut-Brain Axis</strong> naturally, and ground your spirit in tranquility.
          </p>
        </header>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <section className={styles.integritySection}>
          <h2 className="serif">Purity in Every Pour</h2>
          <p>
            No preservatives. No pesticides. Strictly caffeine-free botanical energy formulated with Ayurvedic wisdom and Japanese craftsmanship. Every cup nurtures the symbiotic connection between your mind and your microbiome.
          </p>
          <div className={styles.linksRow}>
            <Link href="/learn" className="amata-btn amata-btn--sand">
              Learn the Science &rarr;
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
