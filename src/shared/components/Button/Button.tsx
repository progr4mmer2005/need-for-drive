import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { classNames } from '@/shared/lib/classNames';
import * as styles from './Button.module.scss';

type TButtonTone = 'primary' | 'darkGreen' | 'cyan' | 'darkRed' | 'purple';
type TButtonSize = 'hero' | 'slider' | 'full';

type TButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidthOnMobile?: boolean;
    squareOnMobile?: boolean;
    size?: TButtonSize;
    tone?: TButtonTone;
    disabled?: boolean;
  }
>;

const TONE_CLASS_NAME: Record<TButtonTone, string> = {
  primary: styles.tonePrimary,
  darkGreen: styles.toneDarkGreen,
  cyan: styles.toneCyan,
  darkRed: styles.toneDarkRed,
  purple: styles.tonePurple,
};

const SIZE_CLASS_NAME: Record<TButtonSize, string> = {
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
}: TButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        TONE_CLASS_NAME[tone],
        SIZE_CLASS_NAME[size],
        fullWidthOnMobile && styles.fullWidthOnMobile,
        squareOnMobile && styles.squareOnMobile,
        disabled && styles.disabled,
        className
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
