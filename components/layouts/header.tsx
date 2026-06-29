'use client';

import { NAV_ITEMS } from '@/constants/navigations';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const variantTop = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 9 },
  };
  const variantCenter = {
    closed: { opacity: 1 },
    opened: { opacity: 0, x: 20 },
  };
  const variantBottom = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -9 },
  };
  return (
    <header>
      <div className="header-container">
        <Link href="/" className="logo">
          Portfolio
        </Link>
        <nav className="nav-desktop" aria-label="Desktop navigation">
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
          <motion.span
            className="btn-bar"
            variants={variantTop}
            animate={isOpen ? 'opened' : 'closed'}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          ></motion.span>
          <motion.span
            className="btn-bar"
            variants={variantCenter}
            animate={isOpen ? 'opened' : 'closed'}
            transition={{ duration: 0.2 }}
          ></motion.span>
          <motion.span
            className="btn-bar"
            variants={variantBottom}
            animate={isOpen ? 'opened' : 'closed'}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          ></motion.span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            className="nav-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
