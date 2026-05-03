import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { classNames } from '../../lib/classNames';
import * as styles from './Button.module.scss';

type ButtonTone = 'primary' | 'darkGreen' | 'cyan' | 'darkRed' | 'purple';
type ButtonSize = 'hero' | 'slider' | 'full';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidthOnMobile?: boolean;
    squareOnMobile?: boolean;
    size?: ButtonSize;
    tone?: ButtonTone;
    disabled?: boolean;
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
  full: styles.sizeFull,
};

export function Button({
  children,
  className,
  fullWidthOnMobile = false,
  squareOnMobile = false,
  size = 'hero',
  tone = 'primary',
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        toneClassName[tone],
        sizeClassName[size],
        fullWidthOnMobile && styles.fullWidthOnMobile,
        squareOnMobile && styles.squareOnMobile,
        disabled && styles.disabled,
        className,
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}