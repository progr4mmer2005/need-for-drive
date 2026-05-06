import { classNames } from '@/shared/lib/classNames';
import * as styles from './BurgerButton.module.scss';

type TBurgerButtonProps = {
  color?: 'light' | 'dark';
  isActive?: boolean;
  mobileOnly?: boolean;
  onClick: () => void;
};

export function BurgerButton({
  color = 'light',
  isActive = false,
  mobileOnly = false,
  onClick,
}: TBurgerButtonProps) {
  return (
    <button
      aria-label={isActive ? 'Закрыть меню' : 'Открыть меню'}
      className={classNames(
        styles.button,
        color === 'dark' && styles.buttonDark,
        mobileOnly && styles.buttonMobileOnly,
        isActive && styles.buttonActive,
      )}
      type="button"
      onClick={onClick}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
}
