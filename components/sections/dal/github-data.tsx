import { SkillChart } from '@/components/ui/skills/skill-chart';
import { SkillCounter } from '@/components/ui/skills/skill-counter';

export const GithubData = () => {
  const SAMPLE_DATA = [
    { name: 'JavaScript', ratio: 0.8 },
    { name: 'TypeScript', ratio: 0.7 },
    { name: 'React', ratio: 0.75 },
    { name: 'Next.js', ratio: 0.65 },
    { name: 'Node.js', ratio: 0.6 },
  ];
  return (
    <>
      {SAMPLE_DATA.map(({ name, ratio }) => (
        <div className="chart-item" key={name}>
          <SkillChart value={ratio} />
          <SkillCounter value={ratio} />
          <span>{name}</span>
        </div>
      ))}
    </>
  );
};
