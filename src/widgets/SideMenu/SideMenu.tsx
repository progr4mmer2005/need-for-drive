import { LanguageToggle } from '@/shared/components/LanguageToggle';
import { SocialLinks } from '@/shared/components/SocialLinks';
import * as styles from './SideMenu.module.scss';

const menuItems = ['Парковка', 'Страховка', 'Бензин', 'Обслуживание'];

type SideMenuProps = {
  activeItem: string;
  isOpen: boolean;
  language: string;
  onClose: () => void;
  onLanguageToggle: () => void;
};

export function SideMenu({
  activeItem, isOpen, language, onClose, onLanguageToggle,
}: SideMenuProps) {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
      <div className={styles.content}>
        <button aria-label="Закрыть меню" className={styles.closeButton} type="button" onClick={onClose}>
          ×
        </button>

        <div className={styles.main}>
          <nav>
            <ul className={styles.links}>
              {menuItems.map((item) => (
                <li key={item}>
                  <a className={`${styles.link} ${item === activeItem ? styles.linkActive : ''}`} href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className={styles.bottom}>
          <LanguageToggle compact label={language} onClick={onLanguageToggle} />
        </div>
      </div>
    </div>
  );
}
