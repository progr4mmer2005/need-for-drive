import * as styles from './CheckboxOption.module.scss';

type CheckboxOptionProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
  disabled?: boolean;
};

export function CheckboxOption({ checked, label, onChange, disabled = false }: CheckboxOptionProps) {
  return (
    <label className={`${styles.checkboxLabel} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
      <input checked={checked} type="checkbox" onChange={onChange} disabled={disabled} />
      {label}
    </label>
  );
}
