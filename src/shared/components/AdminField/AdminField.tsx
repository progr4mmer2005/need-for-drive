import type { ReactNode } from 'react';
import styles from './AdminField.module.scss';

type TAdminFieldProps = {
  label?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
};

export function AdminField({ label, error, htmlFor, children }: TAdminFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      {label && (
        <label className={styles.fieldLabel} htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.errMsg}>{error}</span>}
    </div>
  );
}
