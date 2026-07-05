import { GithubData } from './dal/github-data';

export const Skills = () => {
  return (
    <section id="skills-section">
      <h2 className="section-title">Skills</h2>
      <div>
        <h3 className="section-subtitle">GitHub data</h3>
        <div className="charts-container">
          <GithubData />
        </div>
        <p className="charts-description">
          ※自身のGithubアカウントのオープンリポジトリの使用言語率を元に算出。
        </p>
      </div>
      <div>
        <div>
          <h3 className="section-subtitle">技術スタック</h3>
          <div></div>
        </div>
        <div>
          <h3 className="section-subtitle">保有資格</h3>
        </div>
      </div>
    </section>
  );
};
