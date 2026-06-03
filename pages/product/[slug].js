import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '../../src/components/layout/Layout';
import { useCart } from '../../src/context/CartContext';
import products, { getProductBySlug } from '../../src/data/products';
import styles from '../../src/styles/product.module.css';

export default function ProductPage({ product }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx;
    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(`.${styles.productInfo} > *`, { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      }, heroRef);
    }
    init();
    return () => ctx?.revert();
  }, []);

  if (!product) return null;

  const images = [product.primaryImage, product.hoverImage];

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [
      product.primaryImage.startsWith('http') ? product.primaryImage : `https://amata.in${product.primaryImage}`,
      product.hoverImage.startsWith('http') ? product.hoverImage : `https://amata.in${product.hoverImage}`
    ],
    "description": product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": `https://amata.in/product/${product.slug}`,
      "priceCurrency": product.currency || "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <Layout 
      title={`Amata | ${product.name}`}
      description={product.description}
      ogImage={product.primaryImage}
      ogType="product"
      canonical={`https://amata.in/product/${product.slug}`}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <div ref={heroRef} className={styles.hero}>
        {/* Images */}
        <div className={styles.imageCol}>
          <div className={styles.mainImgWrap}>
            <Image src={images[activeImg]} alt={product.name} className={styles.mainImg} fill sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
          <div className={styles.thumbRow}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <Image src={img} alt={`View ${i + 1}`} width={80} height={80} style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.productInfo}>
          <div className={styles.tag}>{product.certifications[0]}</div>
          <h1 className={`serif ${styles.title}`}>{product.name}</h1>
          <div className={styles.nameJp}>{product.nameJp}</div>
          <div className={styles.price}>${product.price}</div>
          <p className={styles.desc}>{product.longDescription}</p>

          <div className={styles.ctaRow}>
            <button
              className={`amata-btn amata-btn--sand ${styles.addBtn}`}
              onClick={() => addItem(product)}
            >
              Add to Satchel
            </button>
          </div>

          {/* Details accordion */}
          <div className={styles.details}>
            <DetailBlock title="Ingredients" items={product.ingredients} />
            <DetailBlock title="Benefits" items={product.benefits} />
            <DetailBlock title="Brewing Guide" text={product.brewing} />
            <DetailBlock title="Weight / Servings" text={`${product.weight} · ${product.servings} servings`} />
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className={styles.recommendedSection}>
        <h2 className={`serif ${styles.recommendedTitle}`}>Complementary Moroheiya Rituals</h2>
        <p className={styles.recommendedSubtitle}>
          Complete your prebiotic wellness ceremony with these premium blends optimized for the <strong>Gut-Brain Axis</strong>.
        </p>
        <div className={styles.recommendedGrid}>
          {products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className={styles.recommendCard}>
              <div className={styles.recommendImgWrap}>
                <Image src={p.primaryImage} alt={p.name} className={styles.recommendImg} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <h3 className={`serif ${styles.recommendName}`}>{p.name}</h3>
              <div className={styles.recommendPrice}>${p.price}</div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link href="/products" className="amata-btn amata-btn--sand">
            Explore All Collections &rarr;
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function DetailBlock({ title, items, text }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.detailBlock}>
      <button className={styles.detailHead} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={styles.detailIcon} style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div className={styles.detailBody} style={{ maxHeight: open ? '400px' : '0px' }}>
        {items ? (
          <ul className={styles.detailList}>
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
}

export function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}
