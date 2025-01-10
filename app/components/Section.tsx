'use client';

import { InViewContext } from '@/context';
import { useInView } from 'framer-motion';
import React, { useContext, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  section: 0 | 1 | 2 | 3;
  id: string;
};

const Section = ({ children, section, id }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const { setInView } = useContext(InViewContext);

  useEffect(() => {
    if (section === 0) {
      setInView((prevState) => ({ ...prevState, home: isInView }));
    } else if (section === 1) {
      setInView((prevState) => ({ ...prevState, projects: isInView }));
    } else if (section === 2) {
      setInView((prevState) => ({ ...prevState, about: isInView }));
    } else if (section === 3) {
      setInView((prevState) => ({ ...prevState, contact: isInView }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // TODO: Add scroll progress to the section and add to context

  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  );
};

export default Section;
