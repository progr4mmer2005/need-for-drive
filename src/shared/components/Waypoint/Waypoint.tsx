import { WaypointPinIcon } from '@/shared/icons';
import * as styles from './Waypoint.module.scss';

type TWaypointProps = {
  city: string;
};

export function Waypoint({ city }: TWaypointProps) {
  return (
    <a className={styles.waypoint} href="#">
      <WaypointPinIcon className={styles.icon} />
      <span className={styles.text}>{city}</span>
    </a>
  );
}

