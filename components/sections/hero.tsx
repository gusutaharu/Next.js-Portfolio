import { GithubIcon } from '../ui/icons/githubicon';
import { QiitaIcon } from '../ui/icons/qiitaicon';

export const Hero = () => {
  return (
    <section id="hero-section">
      <div className="hero-container">
        <h1 className="top-message">
          gusutaharu&apos;s
          <br />
          portfolio
        </h1>
        <div className="hero-sub">
          <p>今、選ばれるものをつくる。</p>
          <div className="hero-links">
            <GithubIcon />
            <QiitaIcon />
          </div>
        </div>
      </div>
    </section>
  );
};
