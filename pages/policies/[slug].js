import Layout from '../../src/components/layout/Layout';
import policies from '../../Amata_Combined_Policies.json';

export default function Policy({ title, content }) {
  if (!content) return null;

  return (
    <Layout title={`${title} | Amata`} navTheme="dark">
      <div style={{ padding: '150px 5vw 100px', maxWidth: '800px', margin: '0 auto', color: 'var(--c-deep)' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }} className="serif">{title}</h1>
        {content.map((paragraph, idx) => {
          // If it looks like a section heading
          if (/^\d+\./.test(paragraph)) {
            return <h2 key={idx} style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }} className="serif">{paragraph}</h2>;
          }
          return <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{paragraph}</p>;
        })}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(policies).map(key => ({
    params: { slug: key.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const key = Object.keys(policies).find(k => k.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug);
  return {
    props: {
      title: key,
      content: policies[key]
    }
  };
}
