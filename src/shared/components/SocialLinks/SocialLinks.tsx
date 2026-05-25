import type { ComponentType, SVGProps } from 'react';
import { FacebookIcon, InstagramIcon, TelegramIcon } from '@/shared/icons';
import * as styles from './SocialLinks.module.scss';

type SocialLink = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const LINKS: SocialLink[] = [
  { href: 'https://t.me', label: 'Telegram', Icon: TelegramIcon },
  { href: 'https://facebook.com', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://instagram.com', label: 'Instagram', Icon: InstagramIcon },
];

export function SocialLinks() {
  return (
    <ul className={styles.list}>
      {LINKS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a className={styles.link} href={href} rel="noreferrer" target="_blank">
            <Icon aria-hidden="true" className={styles.icon} />
            <span className={styles.visuallyHidden}>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

