import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';
import CartModal from '../cart/CartModal';
import Cursor from '../ui/Cursor';
import Noise from '../ui/Noise';
import BgmToggle from '../ui/BgmToggle';

export default function Layout({ children, title = 'Amata | The Art of Moroheiya', navTheme, hideFooter }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Amata — premium Moroheiya wellness teas bridging Ayurveda and Japanese tea culture." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cursor />
      <Noise />
      <BgmToggle />
      <Nav theme={navTheme} />
      <CartModal />

      <main>{children}</main>

      {!hideFooter && <Footer />}
    </>
  );
}
