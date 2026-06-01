import { useState, type ComponentType, type SVGProps } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import {
  AdminCarCardIcon,
  AdminCarListIcon,
  AdminErrorIcon,
  AdminFormsIcon,
  AdminGridIcon,
  AdminNotificationIcon,
  AdminOrdersIcon,
  AdminPersonIcon,
  AdminSearchIcon,
  NeedForDriveLogoIcon,
} from '@/shared/icons';
import styles from './AdminLayout.module.scss';

type NavItem = {
  to: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { to: '/admin/cars/new', label: 'Карточка автомобиля', Icon: AdminCarCardIcon },
  { to: '/admin/cars', label: 'Список авто', Icon: AdminCarListIcon },
  { to: '/admin/orders', label: 'Заказы', Icon: AdminOrdersIcon },
  { to: '/admin/cities', label: 'Города', Icon: AdminGridIcon },
  { to: '/admin/categories', label: 'Категории', Icon: AdminFormsIcon },
  { to: '/admin/users', label: 'Пользователи', Icon: AdminPersonIcon },
  { to: '/admin/points', label: 'Пункты выдачи', Icon: AdminGridIcon },
  { to: '/admin/rates', label: 'Тарифы', Icon: AdminErrorIcon },
  { to: '/admin/rate-types', label: 'Типы тарифов', Icon: AdminCarListIcon },
  { to: '/admin/order-statuses', label: 'Статусы заказов', Icon: AdminOrdersIcon },
];

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <NavLink to="/admin" className={styles.logo}>
          <NeedForDriveLogoIcon className={styles.logoIcon} />
          <span className={styles.logoText}>Need for car</span>
        </NavLink>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ to, label, Icon, disabled }) =>
            disabled ? (
              <span
                key={to}
                className={`${styles.navItem} ${styles.navItemDisabled}`}
                aria-disabled="true"
              >
                <span className={styles.navIcon}>
                  <Icon />
                </span>
                {label}
              </span>
            ) : (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
              >
                <span className={styles.navIcon}>
                  <Icon />
                </span>
                {label}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.searchWrap}>
            <AdminSearchIcon className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Поиск ..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className={styles.headerRight}>
            <button className={styles.bellBtn} type="button" aria-label="Уведомления">
              <AdminNotificationIcon />
              <span className={styles.bellBadge}>2</span>
            </button>
            <div className={styles.userMenu}>
              <button
                className={styles.userBtn}
                type="button"
                onClick={() => setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen)}
              >
                <span className={styles.avatar}>A</span>
                <span className={styles.adminName}>Admin</span>
                <span className={styles.chevron}>▾</span>
              </button>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <button className={styles.dropdownItem} type="button" onClick={handleLogout}>
                    Выход
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet context={{ search }} />
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link to="/" className={styles.footerLink}>
              Главная страница
            </Link>
            <Link to="/order" className={styles.footerLink}>
              Ссылка
            </Link>
          </div>
          <span className={styles.copyright}>Copyright © 2020 Simbirsoft</span>
        </footer>
      </div>
    </div>
  );
}
