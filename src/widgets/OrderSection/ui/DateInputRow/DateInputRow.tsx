import * as styles from './DateInputRow.module.scss';

type DateInputRowProps = {
  prefix: string;
  value: string;
  placeholder?: string;
  showClear?: boolean;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export function DateInputRow({
  prefix,
  value,
  placeholder,
  showClear = false,
  onChange,
  onClear,
}: DateInputRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.prefix}>{prefix}</span>
      <div className={styles.inputWrap}>
        <input type="date" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
        {showClear && Boolean(value) && (
          <button className={styles.clearBtn} type="button" onClick={onClear}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}
