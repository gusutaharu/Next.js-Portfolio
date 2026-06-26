'use client';

import { NAV_ITEMS } from '@/constants/navigations';
import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        <button
          className="hamburger-btn"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="btn-bar"></span>
          <span className="btn-bar"></span>
          <span className="btn-bar"></span>
        </button>
      </div>
      {isOpen && (
        <nav className="nav-mobile">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
