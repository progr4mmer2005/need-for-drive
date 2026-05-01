import * as styles from './RadioOption.module.scss';

type RadioOptionProps = {
  checked: boolean;
  name: string;
  label: string;
  onChange: () => void;
  disabled?: boolean;
};

export function RadioOption({ checked, name, label, onChange, disabled = false }: RadioOptionProps) {
  return (
    <label className={`${styles.radioLabel} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
      <input checked={checked} name={name} type="radio" onChange={onChange} disabled={disabled} />
      {label}
    </label>
  );
}
