import { classNames } from '@/shared/lib/classNames';
import * as styles from './LanguageToggle.module.scss';

type TLanguageToggleProps = {
  compact?: boolean;
  label: string;
  onClick: () => void;
};

export function LanguageToggle({ compact = false, label, onClick }: TLanguageToggleProps) {
  return (
    <button className={classNames(styles.button, compact && styles.buttonCompact)} type="button" onClick={onClick}>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
