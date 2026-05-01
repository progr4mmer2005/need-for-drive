import * as styles from './SectionTitle.module.scss';

type SectionTitleProps = {
  text: string;
};

export function SectionTitle({ text }: SectionTitleProps) {
  return <div className={styles.title}>{text}</div>;
}
