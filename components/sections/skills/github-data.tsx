import { SkillChart } from '@/components/ui/skills/skill-chart';
import { SkillCounter } from '@/components/ui/skills/skill-counter';
import { getTopLanguageSkills } from '@/lib/github';

export async function GithubData() {
  const skills = await getTopLanguageSkills();

  if (skills.length === 0) {
    return <p>スキルデータを読み込めませんでした。</p>;
  }
  return (
    <>
      {skills.map(({ name, ratio }) => (
        <div className="chart-item" key={name}>
          <SkillChart value={ratio} />
          <SkillCounter value={ratio} />
          <span>{name}</span>
        </div>
      ))}
    </>
  );
}
