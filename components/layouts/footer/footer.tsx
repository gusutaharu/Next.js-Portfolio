import { NAV_ITEMS } from '@/constants/navigations';
import Link from 'next/link';
import { GithubIcon } from '@/components/ui/githubicon';
import { QiitaIcon } from '@/components/ui/qiitaicon';

export const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-nav">
          <div className="footer-links">
            <Link href="/" className="logo-link">
              <span className="logo-text">gusutaharu</span>
            </Link>
            <div className="footer-icons">
              <GithubIcon />
              <QiitaIcon />
            </div>
          </div>
          <nav className="footer-navlist">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="copyright">
          <span>
            &copy; {new Date().getFullYear()} &nbsp;gusutaharu&apos;s portfolio.
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
