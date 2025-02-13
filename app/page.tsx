import Section from '@/components/shared/Section';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Projects from './components/Projects';

const page = () => {
  return (
    <main>
      <Section className="home" section={0}>
        <Home />
      </Section>
      <Section className="projects" section={1}>
        <Projects />
      </Section>
      <Section className="about" section={2}>
        <About />
      </Section>
      <Section className="contact" section={3}>
        <Contact />
      </Section>
    </main>
  );
};

export default page;
