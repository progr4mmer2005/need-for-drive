import * as styles from './RadioOption.module.scss';

type TRadioOptionProps = {
  checked: boolean;
  name: string;
  label: string;
  onChange: () => void;
  disabled?: boolean;
};

export function RadioOption({
  checked,
  name,
  label,
  onChange,
  disabled = false,
}: TRadioOptionProps) {
  return (
    <label
      className={`${styles.radioLabel} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
    >
      <input
        className={styles.radioInput}
        checked={checked}
        name={name}
        type="radio"
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.radioMark} aria-hidden />
      {label}
    </label>
  );
}
