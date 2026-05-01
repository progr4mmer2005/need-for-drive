import * as styles from './HorizontalContentContainer.module.scss';

interface HorizontalContentContainerProps {
  children: React.ReactNode;
}

export function HorizontalContentContainer({ children }: HorizontalContentContainerProps) {
  return <div className={styles.container}>
    {children}
  </div>
}