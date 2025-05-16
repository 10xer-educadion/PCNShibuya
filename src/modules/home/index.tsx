import type { TemplateConfig } from "../../utils/configType";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Contact from "./_components/contact";
import { ConfigContext } from "../../utils/configContext";
import Header from "./_components/header";
import Features from "./_components/features";
import SupportedBy from "./_components/supportedBy";
import Faq from "./_components/faq";
import Flow from "./_components/flow";
import Pricing from "./_components/pricing";
import Testimonials from "./_components/testimonials";

interface Props {
  config: TemplateConfig;
}

function Home({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <main>
        <Navbar />
        <Header />
        <SupportedBy />
        <Features />
        <Flow />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </ConfigContext.Provider>
  );
}

export default Home;
