import { NavLink } from 'react-router';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
              Продукты
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-product" className={({ isActive }) => (isActive ? 'active' : '')}>
              Добавить продукт
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
