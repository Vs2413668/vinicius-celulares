import { useSeo } from '../hooks/useSeo';
import { homeSeo } from '../lib/pageSeo';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Hero from '../components/Hero/Hero';
import Products from '../components/Products/Products';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import Services from '../components/Services/Services';
import WhyUs from '../components/WhyUs/WhyUs';

export default function HomePage() {
  useSeo(homeSeo());
  return (
    <>
      <Hero />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Products />
      <SectionDivider />
      <WhyUs />
      <SectionDivider />
      <Contact />
    </>
  );
}
