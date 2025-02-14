import * as motion from 'motion/react-client';
import Image from 'next/image';
import { ExternalLinkIcon } from '../shared/Icons';
import ScrollButton from '../shared/ScrollButton';
import TextResizer from '../shared/TextResizer';
import Vr from '../shared/Vr';
import ScrollDownButton from './ScrollDownButton';
import styles from './styles.module.css';
import { heroImageVariants, heroVariants, textVariants, wrapperVariants } from './variants';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div variants={wrapperVariants} initial="initial" animate="animate" className={styles.wrapper}>
      {children}
    </motion.div>
  );
};

const Title = () => {
  return (
    <motion.div variants={textVariants} className={styles.title}>
      <TextResizer as="h1" mode="oneline">
        SCOTT
        <br />
        DULLER
      </TextResizer>
    </motion.div>
  );
};

const SectionNumber = () => {
  return (
    <motion.div variants={textVariants} className={styles.sectionNumber}>
      <TextResizer as="h2" mode="oneline">
        00
      </TextResizer>
    </motion.div>
  );
};

const Text = () => {
  return (
    <motion.p variants={textVariants} className={styles.text}>
      Crafting seamless web experiences with dynamic designs and robust
      solutions, I build user-focused applications that bring ideas to life.
    </motion.p>
  );
};

const SectionText = () => {
  return (
    <div className={styles.sectionText}>
      <SectionNumber />
      <Text />
    </div>
  );
};

const SocialLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
      {title}
      <ExternalLinkIcon className={styles.icon} />
    </motion.a>
  );
};

const SocialLinks = () => {
  return (
    <div className={styles.socialLinks}>
      <SocialLink href="mailto:s.o.duller@gmail.com" title="Email" />
      <SocialLink href="https://github.com/scottduller" title="GitHub" />
      <SocialLink href="https://www.linkedin.com/in/scottduller/" title="LinkedIn" />
    </div>
  );
};

const Hero = () => {
  return (
    <motion.div variants={heroVariants} initial="initial" animate="animate" className={styles.hero}>
      <motion.div variants={heroImageVariants} className={styles.image}>
        <Image
          src="/me.png"
          alt="Scott Duller"
          width={1152}
          height={1536}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

const ContactLink = () => {
  return (
    <ScrollButton className={styles.contactLink} whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }} section={3}>
      <span>Let's Connect</span>
      <span>03</span>
    </ScrollButton>
  );
};

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <ContactLink />
      <ScrollDownButton />
    </div>
  );
};

const Home = () => {
  return (
    <Wrapper>
      <SocialLinks />
      <Title />
      <Buttons />
      <SectionText />
      <hr className={styles.hr} />
      <Hero />
      <Vr className={`${styles.vr} ${styles.left}`} />
      <Vr className={`${styles.vr} ${styles.right}`} />
    </Wrapper>
  );
};

export default Home;
