import { lazy, Suspense } from 'react';
import type { TemplateConfig } from '../../utils/configType';
import Navbar from '../../components/navbar';
import Header from './_components/header';
import { ConfigContext } from '../../utils/configContext';

// Lazy import
const SupportedBy = lazy(() => import('./_components/supportedBy'));
const Features = lazy(() => import('./_components/features'));
const Flow = lazy(() => import('./_components/flow'));
const Pricing = lazy(() => import('./_components/pricing'));
const Testimonials = lazy(() => import('./_components/testimonials'));
const Faq = lazy(() => import('./_components/faq'));
const Contact = lazy(() => import('./_components/contact'));
const Footer = lazy(() => import('../../components/footer'));

interface Props {
  config: TemplateConfig;
}

function Home({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <main>
        <Navbar />
        <Header />
        <Suspense fallback={null}>
          <SupportedBy />
          <Features />
          <Flow />
          <Pricing />
          <Testimonials />
          <Faq />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </ConfigContext.Provider>
  );
}

export default Home;
