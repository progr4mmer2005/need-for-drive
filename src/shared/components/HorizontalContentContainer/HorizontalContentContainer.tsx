import * as styles from './HorizontalContentContainer.module.scss';

interface IHorizontalContentContainerProps {
  children: React.ReactNode;
}

export function HorizontalContentContainer({ children }: IHorizontalContentContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
