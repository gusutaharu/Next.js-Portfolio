import Image from 'next/image';

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
    video: '/ecsite.gif',
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
                <ul className="project-technologies">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span>{tech} /</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="video-wrapper">
                <Image
                  className="project-video"
                  src={project.video}
                  alt={project.name}
                  fill
                  unoptimized
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
