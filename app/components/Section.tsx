'use client';

import { InViewContext } from '@/context';
import { useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useContext, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  section: 0 | 1 | 2 | 3;
  id: string;
};

const Section = ({ children, section, id }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const { scrollYProgress: scrollYProgressStart } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  });

  const { setInView } = useContext(InViewContext);

  useEffect(() => {
    setInView((prevState) => {
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          ref,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgressStart, 'change', (current) => {
    setInView((prevState) => {
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          isInView,
          scrollProgress: current > 0.5 ? 1 : current,
        },
      };
    });
  });
  useMotionValueEvent(scrollYProgressEnd, 'change', (current) => {
    setInView((prevState) => {
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          isInView,
          scrollProgress: 1 - current > 0.5 ? 1 : 1 - current,
        },
      };
    });
  });

  return (
    <section ref={ref} className={`section ${id}`}>
      {children}
    </section>
  );
};

export default Section;
