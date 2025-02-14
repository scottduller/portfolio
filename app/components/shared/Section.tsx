'use client';

import { NAVITEM_WIDTH_THRESHOLD_MAX, NAVITEM_WIDTH_THRESHOLD_MIN } from '@/constants/constants';
import { SectionSettingsContext } from '@/context';
import { normalize } from '@/utils/math';
import { useScroll } from 'motion/react';
import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = {
  children: React.ReactNode;
  section: 0 | 1 | 2 | 3;
  className: string;
};

const Section = ({ children, section, className }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollYProgressStart } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  });

  const { setSectionSettings } = useContext(SectionSettingsContext);

  const [active, setActive] = useState(false);
  const [activeDebounced] = useDebounce(active, 350);

  useEffect(() => {
    setSectionSettings((prevState) => {
      const newState = [...prevState];
      newState[section] = {
        ...newState[section],
        ref,
      };
      return newState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SCROLL_PROGRESS_THRESHOLD = 0.7;

  useEffect(() => {
    const handleScroll = (current: number, isStart: boolean) => {
      let percentVisable = 1;

      if (isStart) {
        percentVisable = current >= SCROLL_PROGRESS_THRESHOLD ? 1 : current <= 1 - SCROLL_PROGRESS_THRESHOLD ? 0 : current;
      } else {
        percentVisable = 1 - current <= 1 - SCROLL_PROGRESS_THRESHOLD ? 0 : 1 - current >= SCROLL_PROGRESS_THRESHOLD ? 1 : 1 - current;
      }

      const active = percentVisable >= SCROLL_PROGRESS_THRESHOLD ? true : percentVisable <= 1 - SCROLL_PROGRESS_THRESHOLD ? false : null;

      if (active !== null) {
        setActive(active);
      }

      const normalizedPercentVisable = normalize(percentVisable * 100, 0, 100, NAVITEM_WIDTH_THRESHOLD_MIN, NAVITEM_WIDTH_THRESHOLD_MAX);

      setSectionSettings((prevState) => {
        const newState = [...prevState];
        newState[section] = { ...newState[section], percentVisable: normalizedPercentVisable };
        return newState;
      });
    };

    const unsubscribeStart = scrollYProgressStart.on('change', (current) => handleScroll(current, true));
    const unsubscribeEnd = scrollYProgressEnd.on('change', (current) => handleScroll(current, false));

    return () => {
      unsubscribeStart();
      unsubscribeEnd();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgressStart, scrollYProgressEnd, section]);

  useEffect(() => {
    setSectionSettings((prevState) => {
      const newState = [...prevState];
      newState[section] = { ...newState[section], active: activeDebounced };
      return newState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDebounced]);

  return (
    <section ref={ref} className={`section ${className}`}>
      {children}
    </section>
  );
};

export default Section;
