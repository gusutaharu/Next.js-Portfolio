import { QUALIFICATIONS, SKILL_STACK } from '@/constants/skills';
import { GithubData } from './dal/github-data';
import { getGitHubProfile } from '@/lib/github';

export const Skills = async () => {
  const user = await getGitHubProfile();
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
        <div>
          {user && (
            <div>
              <h3>GitHub Profile</h3>
              <p>Login: {user.login}</p>
            </div>
          )}
          <h3>最近作ったリポジトリ:</h3>
          <ul>
            {user.repositories.nodes.map(
              (repo: { name: string; url: string }) => (
                <li key={repo.name}>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
