import { Link } from 'react-router-dom';
import * as styles from './Logo.module.scss';

export function Logo() {
  return (
    <Link className={styles.logo} to="/">
      Need for drive
    </Link>
  );
}
