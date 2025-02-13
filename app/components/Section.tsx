'use client';

import { NAVITEM_WIDTH_THRESHOLD_MAX, NAVITEM_WIDTH_THRESHOLD_MIN } from '@/constants/constants';
import { SectionSettingsContext } from '@/context';
import { useMotionValueEvent, useScroll } from 'motion/react';
import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = {
  children: React.ReactNode;
  section: 0 | 1 | 2 | 3;
  className: string;
};

const normalize = (value: number, valueMin: number, valueMax: number, targetMin: number, targetMax: number) => {
  return targetMin + (value - valueMin) * (targetMax - targetMin) / (valueMax - valueMin);
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

  const [isActive, setIsActive] = useState(false);
  const [isActiveDebounced] = useDebounce(isActive, 300);

  useEffect(() => {
    setSectionSettings((prevState) => {
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

  const SCROLL_PROGRESS_THRESHOLD = 0.7;

  useMotionValueEvent(scrollYProgressStart, 'change', (current) => {
    const percentVisable = current >= SCROLL_PROGRESS_THRESHOLD ? 1 : current <= 1 - SCROLL_PROGRESS_THRESHOLD ? 0 : current;
    const normalizedPercentVisable = normalize(percentVisable * 100, 0, 100, NAVITEM_WIDTH_THRESHOLD_MIN, NAVITEM_WIDTH_THRESHOLD_MAX);
    const isActive = percentVisable >= SCROLL_PROGRESS_THRESHOLD ? true : percentVisable <= 1 - SCROLL_PROGRESS_THRESHOLD ? false : null;

    if (isActive !== null) {
      setIsActive(isActive);
    }

    setSectionSettings((prevState) => {
      return { ...prevState, [section]: { ...prevState[section], percentVisable: normalizedPercentVisable } };
    });
  });

  useMotionValueEvent(scrollYProgressEnd, 'change', (current) => {
    const percentVisable = 1 - current <= 1 - SCROLL_PROGRESS_THRESHOLD ? 0 : 1 - current >= SCROLL_PROGRESS_THRESHOLD ? 1 : 1 - current;
    const normalizedPercentVisable = normalize(percentVisable * 100, 0, 100, NAVITEM_WIDTH_THRESHOLD_MIN, NAVITEM_WIDTH_THRESHOLD_MAX);
    const isActive = percentVisable >= SCROLL_PROGRESS_THRESHOLD ? true : percentVisable <= 1 - SCROLL_PROGRESS_THRESHOLD ? false : null;

    if (isActive !== null) {
      setIsActive(isActive);
    }

    setSectionSettings((prevState) => {
      return { ...prevState, [section]: { ...prevState[section], percentVisable: normalizedPercentVisable } };
    });
  });

  useEffect(() => {
    setSectionSettings((prevState) => {
      return { ...prevState, [section]: { ...prevState[section], active: isActiveDebounced } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveDebounced]);

  return (
    <section ref={ref} className={`section ${className}`}>
      {children}
    </section>
  );
};

export default Section;
