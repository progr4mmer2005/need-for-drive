import type { ReactNode, SelectHTMLAttributes } from 'react';
import styles from './AdminField.module.scss';

type TAdminSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  children: ReactNode;
};

export function AdminSelect({ hasError, className, children, ...props }: TAdminSelectProps) {
  const isPlaceholder = props.value === '' || props.value === undefined;

  return (
    <select
      className={[
        styles.select,
        isPlaceholder && styles.selectPlaceholder,
        hasError && styles.inputError,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </select>
  );
}
