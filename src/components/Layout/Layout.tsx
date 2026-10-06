import { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router';
import { ScrollTrigger } from '../../lib/gsap';
import { useParallax } from '../../hooks/useParallax';
import CursorGlow from '../CursorGlow/CursorGlow';
import Footer from '../Footer/Footer';
import Intro from '../Intro/Intro';
import Navbar from '../Navbar/Navbar';
import ScrollManager from '../ScrollManager';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

/** Estrutura comum a todas as rotas. */
export default function Layout() {
  const { pathname } = useLocation();
  // A intro só toca quando o site é aberto pela home.
  const [showIntro] = useState(() => pathname === '/');
  const onProductPage = useMatch('/produtos/:slug') !== null;

  useEffect(() => {
    // Recalcula posições quando fontes e imagens terminam de carregar.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  useParallax(pathname);

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollManager />
      {showIntro && <Intro />}
      <Navbar />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      {/* Na página do produto, a barra fixa com "Tenho interesse" substitui o botão no mobile. */}
      <WhatsAppButton hideOnMobile={onProductPage} />
      <CursorGlow />
    </>
  );
}
