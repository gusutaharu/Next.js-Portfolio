import { QUALIFICATIONS, SKILL_STACK } from '@/constants/skills';
import { GithubData } from './github-data';

export const Skills = async () => {
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
      <div className="skills-container">
        <div className="skills-stack">
          <h3 className="section-subtitle">技術スタック</h3>
          <ul className="skills-list">
            {SKILL_STACK.map((skill) => (
              <li className="skill-item" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="qualifications">
          <h3 className="section-subtitle">保有資格</h3>
          <ul className="qualifications-list">
            {QUALIFICATIONS.map((item) => (
              <li className="qualification-item" key={item.name}>
                <p>{item.name}</p>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
