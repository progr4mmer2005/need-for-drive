import { useState, FC } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import styles from './AdminLayout.module.scss';

const IconCarCard: FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.8213 3.60853C13.0596 3.84683 13.0596 4.23177 12.8213 4.47007L11.7031 5.58825L9.41174 3.2969L10.5299 2.17873C10.7682 1.94042 11.1532 1.94042 11.3915 2.17873L12.8213 3.60853ZM2 13V10.7086L8.75795 3.9507L11.0493 6.24205L4.29135 13H2Z" fill="currentColor" /></svg>
);
const IconCarList: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2 3.5V4.85714H7.33333V3.5H2ZM7.33333 7.57142H2V6.21428H7.33333V7.57142ZM2 10.2857H7.33333V8.92857H2V10.2857ZM2 13H7.33333V11.6429H2V13ZM14 3.5H8.66663V13H14V3.5Z" fill="currentColor" /></svg>
);
const IconOrders: FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7 1H3C2.45 1 2.005 1.45 2.005 2L2 10C2 10.55 2.445 11 2.995 11H9C9.55 11 10 10.55 10 10V4L7 1ZM8 8H6.5V9.5H5.5V8H4V7H5.5V5.5H6.5V7H8V8ZM6.5 1.75V4.5H9.25L6.5 1.75Z" fill="currentColor" /></svg>
);
const IconGrid: FC = () => (
  <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.67647 4.61538H0V0H3.67647V4.61538ZM3.67647 10H0V5.38461H3.67647V10ZM4.41174 10H8.08821V5.38461H4.41174V10ZM12.5 10H8.82349V5.38461H12.5V10ZM4.41174 4.61538H8.08821V0H4.41174V4.61538ZM8.82349 4.61538V0H12.5V4.61538H8.82349Z" fill="currentColor" /></svg>
);
const IconForms: FC = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10.8949 1.5H2.60538C1.99749 1.5 1.50012 2 1.50012 2.61111V4.27778H12.0001V2.61111C12.0001 2 11.5028 1.5 10.8949 1.5ZM10.8947 11.5H9.23682V5.38889H12V10.3889C12 11 11.5026 11.5 10.8947 11.5ZM8.13157 5.4H5.36841V11.5H8.13157V5.4ZM2.60526 11.5C1.99737 11.5 1.5 11 1.5 10.3889V5.38889H4.26316V11.5H2.60526Z" fill="currentColor" /></svg>
);
const IconPerson: FC = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9.375 3.125C9.375 4.85156 7.97656 6.25 6.25 6.25C4.52344 6.25 3.125 4.85156 3.125 3.125C3.125 1.39844 4.52344 0 6.25 0C7.97656 0 9.375 1.39844 9.375 3.125ZM0 10.9375C0 8.85938 4.16406 7.8125 6.25 7.8125C8.33594 7.8125 12.5 8.85938 12.5 10.9375V12.5H0V10.9375Z" fill="currentColor" /></svg>
);
const IconError: FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6.75 1C3.576 1 1 3.576 1 6.75C1 9.924 3.576 12.5 6.75 12.5C9.924 12.5 12.5 9.924 12.5 6.75C12.5 3.576 9.924 1 6.75 1ZM7.32505 9.62501H6.17505V8.47501H7.32505V9.62501ZM6.17505 7.325H7.32505V3.875H6.17505V7.325Z" fill="currentColor" /></svg>
);

const NAV_ITEMS = [
  { to: '/admin/cars/new', label: 'Карточка автомобиля', Icon: IconCarCard },
  { to: '/admin/cars', label: 'Список авто', Icon: IconCarList },
  { to: '/admin/orders', label: 'Заказы', Icon: IconOrders },
  { to: '/admin/menu4', label: 'Menu 4', Icon: IconGrid, disabled: true },
  { to: '/admin/menu5', label: 'Menu 5', Icon: IconForms, disabled: true },
  { to: '/admin/menu6', label: 'Menu 6', Icon: IconPerson, disabled: true },
  { to: '/admin/menu7', label: 'Menu 7', Icon: IconError, disabled: true },
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
        <div className={styles.logo}>
          <svg className={styles.logoIcon} viewBox="0 0 45 45" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 22.25C0 9.96178 9.96198 0 22.2504 0C34.538 0 44.5 9.96178 44.5 22.25C44.5 25.0644 43.9774 27.7567 43.0241 30.2353C41.3767 27.6868 38.5104 26 35.25 26C30.1414 26 26 30.1414 26 35.25C26 38.5104 27.6868 41.3768 30.2354 43.0241C27.7569 43.9775 25.0647 44.5 22.2504 44.5C9.96198 44.5 0 34.5382 0 22.25ZM30.2354 43.0241C31.6801 43.9579 33.4018 44.5 35.25 44.5C40.3586 44.5 44.5 40.3586 44.5 35.25C44.5 33.4017 43.9579 31.6801 43.0241 30.2353C40.7682 36.1002 36.1001 40.7682 30.2354 43.0241Z" fill="#0EC261" />
          </svg>
          <span className={styles.logoText}>Need for car</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ to, label, Icon, disabled }) => (disabled ? (
            <span key={to} className={`${styles.navItem} ${styles.navItemDisabled}`} aria-disabled="true">
              <span className={styles.navIcon}><Icon /></span>
              {label}
            </span>
          ) : (
            <NavLink key={to} to={to} end className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
              <span className={styles.navIcon}><Icon /></span>
              {label}
            </NavLink>
          )))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input className={styles.searchInput} placeholder="Поиск ..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className={styles.headerRight}>
            <button className={styles.bellBtn} type="button" aria-label="Уведомления">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <span className={styles.bellBadge}>2</span>
            </button>
            <div className={styles.userMenu}>
              <button className={styles.userBtn} type="button" onClick={() => setDropdownOpen((v) => !v)}>
                <span className={styles.avatar}>A</span>
                <span className={styles.adminName}>Admin</span>
                <span className={styles.chevron}>?</span>
              </button>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <button className={styles.dropdownItem} type="button" onClick={handleLogout}>Выход</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className={styles.content}><Outlet context={{ search }} /></main>

        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="/" className={styles.footerLink}>Главная страница</a>
            <a href="/#/order" className={styles.footerLink}>Ссылка</a>
          </div>
          <span className={styles.copyright}>Copyright © 2020 Simbirsoft</span>
        </footer>
      </div>
    </div>
  );
}


