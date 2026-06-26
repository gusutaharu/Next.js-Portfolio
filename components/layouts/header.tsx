import { NAV_ITEMS } from '@/constants/navigations';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link href="/" className="logo">
          Portfolio
        </Link>
        <nav className="nav-desktop">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className="hamburger-btn" aria-label="Toggle navigation">
          <span className="btn-bar"></span>
          <span className="btn-bar"></span>
          <span className="btn-bar"></span>
        </button>
      </div>
    </header>
  );
};
