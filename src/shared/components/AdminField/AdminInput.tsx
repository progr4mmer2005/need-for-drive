import type { InputHTMLAttributes } from 'react';
import styles from './AdminField.module.scss';

type TAdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function AdminInput({ hasError, className, ...props }: TAdminInputProps) {
  return (
    <input
      className={[styles.input, hasError && styles.inputError, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
