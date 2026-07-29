import { render, screen, within } from '@testing-library/react';
import { Projects } from './projects';
import { PROJECTS } from '@/constants/projects';

jest.mock('./ProjectVideoZoom', () => ({
  ProjectVideoZoom: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
describe('Projects Section', () => {
  it('プロジェクト一覧のテキストと技術スタックが正しく表示されること', () => {
    render(<Projects />);

    const projectItems = screen
      .getAllByRole('listitem')
      .filter((item) => item.classList.contains('project-item'));

    PROJECTS.forEach((project, index) => {
      const item = projectItems[index];

      expect(within(item).getByText(project.name)).toBeInTheDocument();
      expect(within(item).getByText(project.description)).toBeInTheDocument();

      project.technologies.forEach((tech) => {
        expect(within(item).getByText(new RegExp(tech))).toBeInTheDocument();
      });
    });
  });
});
