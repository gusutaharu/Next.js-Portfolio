import { render, screen } from '@testing-library/react';
import { GithubData } from './github-data';
import { getTopLanguageSkills } from '@/lib/github';

jest.mock('@/lib/github', () => ({
  getTopLanguageSkills: jest.fn(),
}));

jest.mock('@/components/ui/skills/skill-chart', () => ({
  SkillChart: ({ value }: { value: number }) => (
    <div data-testid="chart">{value}%</div>
  ),
}));
jest.mock('@/components/ui/skills/skill-counter', () => ({
  SkillCounter: ({ value }: { value: number }) => (
    <div data-testid="counter">{value}</div>
  ),
}));

const mockGetTopLanguageSkills = getTopLanguageSkills as jest.MockedFunction<
  typeof getTopLanguageSkills
>;

describe('GithubData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('スキルデータが存在する場合、チャートとスキル名が表示されること', async () => {
    mockGetTopLanguageSkills.mockResolvedValueOnce([
      { name: 'TypeScript', ratio: 60 },
      { name: 'React', ratio: 40 },
    ]);

    const resolvedGithubData = await GithubData();
    render(resolvedGithubData);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();

    const charts = screen.getAllByTestId('chart');
    expect(charts).toHaveLength(2);
    expect(charts[0]).toHaveTextContent('60%');
  });

  it('スキルデータが空の場合、フォールバックメッセージが表示されること', async () => {
    mockGetTopLanguageSkills.mockResolvedValueOnce([]);

    const resolvedGithubData = await GithubData();
    render(resolvedGithubData);

    expect(
      screen.getByText('スキルデータを読み込めませんでした。'),
    ).toBeInTheDocument();
  });
});
