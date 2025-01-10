import Section from '@components/Section';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Projects from './components/Projects';

const page = () => {
  return (
    <main>
      <Section id="home" section={0}>
        <Home />
      </Section>
      <Section id="projects" section={1}>
        <Projects />
      </Section>
      <Section id="about" section={2}>
        <About />
      </Section>
      <Section id="contact" section={3}>
        <Contact />
      </Section>
    </main>
  );
};

export default page;
