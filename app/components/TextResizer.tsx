'use client';

import { AutoTextSize } from 'auto-text-size';

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: string | number | symbol | React.ComponentType<any>;
  mode?: 'oneline' | 'multiline' | 'box' | 'boxoneline';
  minFontSizePx?: number;
  maxFontSizePx?: number;
};

const TextResizer = ({ children, ...rest }: Props) => {
  return <AutoTextSize {...rest}>{children}</AutoTextSize>;
};

export default TextResizer;
