import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { classNames } from '../../lib/classNames';
import * as styles from './Button.module.scss';

type ButtonTone = 'primary' | 'darkGreen' | 'cyan' | 'darkRed' | 'purple';
type ButtonSize = 'hero' | 'slider';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidthOnMobile?: boolean;
    size?: ButtonSize;
    tone?: ButtonTone;
  }
>;

const toneClassName: Record<ButtonTone, string> = {
  primary: styles.tonePrimary,
  darkGreen: styles.toneDarkGreen,
  cyan: styles.toneCyan,
  darkRed: styles.toneDarkRed,
  purple: styles.tonePurple,
};

const sizeClassName: Record<ButtonSize, string> = {
  hero: styles.sizeHero,
  slider: styles.sizeSlider,
};

export function Button({
  children,
  className,
  fullWidthOnMobile = false,
  size = 'hero',
  tone = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        toneClassName[tone],
        sizeClassName[size],
        fullWidthOnMobile && styles.fullWidthOnMobile,
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
