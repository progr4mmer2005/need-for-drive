import * as styles from './SectionTitle.module.scss';

type TSectionTitleProps = {
  text: string;
};

export function SectionTitle({ text }: TSectionTitleProps) {
  return <div className={styles.title}>{text}</div>;
}
