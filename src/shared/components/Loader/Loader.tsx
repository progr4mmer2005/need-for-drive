import { classNames } from '@/shared/lib/classNames';
import * as styles from './Loader.module.scss';

type TLoaderProps = {
  fullHeight?: boolean;
};

export function Loader({ fullHeight = false }: TLoaderProps) {
  return (
    <div className={classNames(styles.loader, fullHeight && styles.fullHeight)}>
      <div className={styles.spinner} />
    </div>
  );
}
