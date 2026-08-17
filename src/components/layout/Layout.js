import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';
import CartModal from '../cart/CartModal';
import Noise from '../ui/Noise';
import BgmToggle from '../ui/BgmToggle';
import WhatsAppButton from '../ui/WhatsAppButton';
import FaqBot from '../ui/FaqBot';

export default function Layout({ 
  children, 
  title = 'Amata | The Art of Moroheiya', 
  description = 'Amata — premium Moroheiya wellness teas bridging Ayurveda and Japanese tea culture.', 
  navTheme, 
  hideFooter,
  ogImage = '/images/white-logo.png',
  ogType = 'website',
  canonical
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Moroheiya, Moroheiya tea, Moroheiya infusion, jute leaf tea, prebiotic tea, gut-brain axis, organic jute tea, Amata tea, caffeine free tea, gut health, vagus nerve, Ayurvedic tea, Japanese steamed tea, Egyptian spinach tea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Amata" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        {canonical && <meta property="og:url" content={canonical} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {canonical && <link rel="canonical" href={canonical} />}
      </Head>

      <Noise />
      <BgmToggle />
      <Nav theme={navTheme} />
      <CartModal />
      <WhatsAppButton />
      <FaqBot />

      <main>{children}</main>

      {!hideFooter && <Footer />}
    </>
  );
}
