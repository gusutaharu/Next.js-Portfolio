const PROJECTS = [
  {
    name: 'Sampleサイト',
    description: 'Sampleサイトについての説明です。',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Vercel',
      'Jest',
      'playwright',
      'GitHubActions',
      'supabase',
      'Figma',
    ],
    video: '/',
  },
];

export const Projects = () => {
  return (
    <section id="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-container">
        <ul>
          {PROJECTS.map((project) => (
            <li key={project.name} className="project-item">
              <div className="project-text">
                <p className="project-name">sample</p>
                <p className="project-description">
                  sample description myproject app
                </p>
                <ul>
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
