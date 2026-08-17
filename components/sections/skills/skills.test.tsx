import { render, screen } from '@testing-library/react';
import { Skills } from './skills';
import { QUALIFICATIONS, SKILL_STACK } from '@/constants/skills';

jest.mock('./github-data', () => ({
  GithubData: () => (
    <div data-testid="mocked-github-data">Github Data Loaded</div>
  ),
}));

jest.mock('@/components/ui/skeletons', () => ({
  ChartsSkeleton: () => <div data-testid="mocked-skeleton">Loading...</div>,
}));

jest.mock('./SkillsWrapper', () => ({
  SkillsWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-skills-wrapper">{children}</div>
  ),
}));

describe('Skills Section', () => {
  it('タイトル、技術スタック、保有資格が正しく表示されること', async () => {
    const resolvedSkills = await Skills();
    render(resolvedSkills);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Skills' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: '技術スタック' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: '保有資格' }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('mocked-github-data')).toBeInTheDocument();

    SKILL_STACK.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });

    QUALIFICATIONS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.date)).toBeInTheDocument();
    });
  });
});
